import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

interface RegistrationRecord {
  ticketCode: string;
  fullName: string;
  telegramUsername: string;
  rpName: string;
  characterArchetype: string;
  referralSource: string;
  createdAt: string;
  sentViaApi: boolean;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json');

function loadRegistrations(): Record<string, RegistrationRecord> {
  try {
    if (fs.existsSync(REGISTRATIONS_FILE)) {
      const raw = fs.readFileSync(REGISTRATIONS_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {
    // Ignore read errors
  }
  return {};
}

function saveRegistration(record: RegistrationRecord) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const existing = loadRegistrations();
    existing[record.ticketCode] = record;
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(existing, null, 2), 'utf-8');
  } catch {
    // Ignore write errors in read-only environments
  }
}

// In-memory store synced with disk
const registrationStore: Record<string, RegistrationRecord> = loadRegistrations();
let lastDetectedChatId: string | null = null;
let lastDetectedChatTitle: string | null = null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Check Telegram Bot API status (never exposes secret token to client)
  app.get('/api/telegram/status', async (_req, res) => {
    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const envChatId = process.env.TELEGRAM_CHAT_ID?.trim();
    const activeChatId = envChatId || lastDetectedChatId || '';
    const fallbackBotUsername = (process.env.TELEGRAM_BOT_USERNAME || 'BearWithUsBot').replace(/^@/, '').trim();
    const groupUrl = process.env.TELEGRAM_GROUP_URL || 'https://t.me/BearWithUsCommunity';
    const totalRegistrations = Object.keys(registrationStore).length;

    if (!token) {
      return res.json({
        configured: false,
        hasToken: false,
        hasChatId: Boolean(activeChatId),
        detectedChatId: lastDetectedChatId,
        detectedChatTitle: lastDetectedChatTitle,
        mode: 'deeplink',
        botUsername: fallbackBotUsername,
        groupUrl,
        totalRegistrations,
        message: 'Sistem Web & Deep Link sudah jalan. Tambahkan TELEGRAM_BOT_TOKEN jika ingin bot mengirim pesan otomatis.',
      });
    }

    try {
      const tgRes = await fetch(`https://api.telegram.org/bot${token}/getMe`);
      const tgData = (await tgRes.json()) as {
        ok: boolean;
        result?: { username?: string; first_name?: string };
      };

      if (tgData.ok && tgData.result) {
        return res.json({
          configured: Boolean(token && activeChatId),
          hasToken: true,
          hasChatId: Boolean(activeChatId),
          detectedChatId: lastDetectedChatId,
          detectedChatTitle: lastDetectedChatTitle,
          mode: token && activeChatId ? 'bot_api' : 'partial_token',
          botUsername: tgData.result.username || fallbackBotUsername,
          botName: tgData.result.first_name || 'Bear With Us Bot',
          groupUrl,
          totalRegistrations,
          message: activeChatId
            ? `Terhubung penuh ke bot @${tgData.result.username}. Siap mengirim dan membalas tiket otomatis!`
            : `Bot @${tgData.result.username} sudah aktif! Kirim pesan "/id" ke bot atau grup agar sistem mendeteksi Chat ID secara otomatis.`,
        });
      }

      return res.json({
        configured: false,
        hasToken: true,
        hasChatId: Boolean(activeChatId),
        mode: 'invalid_token',
        botUsername: fallbackBotUsername,
        groupUrl,
        totalRegistrations,
        message: 'TELEGRAM_BOT_TOKEN tidak valid atau ditolak oleh Telegram.',
      });
    } catch {
      return res.json({
        configured: false,
        hasToken: true,
        hasChatId: Boolean(activeChatId),
        mode: 'network_error',
        botUsername: fallbackBotUsername,
        groupUrl,
        totalRegistrations,
        message: 'Gagal menghubungi server api.telegram.org.',
      });
    }
  });

  // Test endpoint to send a live test notification to Telegram
  app.post('/api/telegram/test', async (_req, res) => {
    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim() || lastDetectedChatId;

    if (!token) {
      return res.status(400).json({
        ok: false,
        error: 'TELEGRAM_BOT_TOKEN belum diatur di Environment Variables / Secrets.',
      });
    }

    if (!chatId) {
      return res.status(400).json({
        ok: false,
        error: 'TELEGRAM_CHAT_ID belum diatur. Ketik /id di grup/bot Telegram kamu atau isi TELEGRAM_CHAT_ID di Secrets.',
      });
    }

    try {
      const sendRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: [
            `✅ <b>TES KONEKSI BERHASIL — BEAR WITH US</b>`,
            ``,
            `Sistem website pendaftaran resmi sudah terhubung dengan Bot Telegram ini.`,
            `Setiap calon anggota yang mengisi formulir di website akan otomatis muncul di sini! 🐾`,
          ].join('\n'),
          parse_mode: 'HTML',
        }),
      });

      const sendData = (await sendRes.json()) as { ok: boolean; description?: string };
      if (sendData.ok) {
        return res.json({
          ok: true,
          message: `Pesan tes berhasil dikirim ke Telegram (Chat ID: ${chatId})! Silakan cek aplikasi Telegram kamu.`,
        });
      }
      return res.status(400).json({
        ok: false,
        error: sendData.description || 'Gagal mengirim pesan tes ke Telegram.',
      });
    } catch {
      return res.status(500).json({
        ok: false,
        error: 'Gagal menghubungi api.telegram.org saat mengirim pesan tes.',
      });
    }
  });

  // Webhook setup helper endpoint (used when deployed to Vercel)
  app.get('/api/telegram/webhook', async (req, res) => {
    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    if (!token) {
      return res.status(400).json({
        ok: false,
        error: 'TELEGRAM_BOT_TOKEN belum diatur di Environment Variables.',
      });
    }
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
    if (String(host).includes('localhost') || String(host).includes('127.0.0.1')) {
      return res.json({
        ok: true,
        webhookUrl: `http://${host}/api/telegram/webhook`,
        description: 'Di localhost (VS Code), Bot Poller otomatis sudah berjalan tanpa perlu setWebhook. Tombol ini digunakan setelah deploy ke Vercel!',
      });
    }
    const webhookUrl = `https://${host}/api/telegram/webhook`;
    try {
      const tgRes = await fetch(
        `https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`
      );
      const tgData = (await tgRes.json()) as { ok: boolean; description?: string };
      return res.json({
        ok: tgData.ok,
        webhookUrl,
        description: tgData.description || 'Webhook berhasil didaftarkan ke Telegram!',
      });
    } catch {
      return res.status(500).json({
        ok: false,
        error: 'Gagal mendaftarkan webhook ke Telegram.',
      });
    }
  });

  // Handle member registration & forward to Telegram Bot API if configured
  app.post('/api/telegram/register', async (req, res) => {
    const { fullName, telegramUsername, rpName, characterArchetype, referralSource } = req.body || {};

    if (!fullName || !telegramUsername || !rpName) {
      return res.status(400).json({
        ok: false,
        error: 'Nama panggilan, username Telegram, dan nama karakter wajib diisi.',
      });
    }

    const cleanUsername = String(telegramUsername).startsWith('@')
      ? String(telegramUsername).trim()
      : `@${String(telegramUsername).trim()}`;

    const ticketCode = `BWU-${Math.floor(1000 + Math.random() * 9000)}`;
    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim() || lastDetectedChatId;
    let botUsername = (process.env.TELEGRAM_BOT_USERNAME || 'BearWithUsBot').replace(/^@/, '').trim();
    const groupUrl = process.env.TELEGRAM_GROUP_URL || 'https://t.me/BearWithUsCommunity';

    // If token is available, try fetching actual bot username so Deep Link always points to the right bot
    if (token) {
      try {
        const meRes = await fetch(`https://api.telegram.org/bot${token}/getMe`);
        const meData = (await meRes.json()) as { ok: boolean; result?: { username?: string } };
        if (meData.ok && meData.result?.username) {
          botUsername = meData.result.username;
        }
      } catch {
        // Keep fallback botUsername
      }
    }

    // Encode compact start parameter for Telegram Deep Link (?start=...)
    const safeRpSlug = String(rpName)
      .replace(/[^a-zA-Z0-9]/g, '_')
      .slice(0, 24);
    const deepLinkPayload = `reg_${ticketCode}_${safeRpSlug}`;
    const botDeepLink = `https://t.me/${botUsername}?start=${deepLinkPayload}`;

    const record: RegistrationRecord = {
      ticketCode,
      fullName: String(fullName),
      telegramUsername: cleanUsername,
      rpName: String(rpName),
      characterArchetype: String(characterArchetype || '-'),
      referralSource: String(referralSource || '-'),
      createdAt: new Date().toISOString(),
      sentViaApi: false,
    };

    // If Bot Token and Chat ID are configured, push message directly via Telegram Bot API
    if (token && chatId) {
      const messageText = [
        `🐾 <b>TIKET PENDAFTARAN BARU — BEAR WITH US</b>`,
        `Nomor Tiket: <code>${ticketCode}</code>`,
        ``,
        `👤 <b>Nama Panggilan:</b> ${escapeHtml(record.fullName)}`,
        `📱 <b>Username Telegram:</b> ${escapeHtml(record.telegramUsername)}`,
        `🎭 <b>Nama Karakter RP:</b> ${escapeHtml(record.rpName)}`,
        `🌲 <b>Archetype Karakter:</b> ${escapeHtml(record.characterArchetype)}`,
        `🧭 <b>Sumber Info:</b> ${escapeHtml(record.referralSource)}`,
        ``,
        `<i>Status: Menunggu sambutan pengurus di pintu suaka.</i>`,
      ].join('\n');

      try {
        const sendRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: messageText,
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: `Sapa ${cleanUsername}`,
                    url: `https://t.me/${cleanUsername.replace(/^@/, '')}`,
                  },
                ],
              ],
            },
          }),
        });

        const sendData = (await sendRes.json()) as { ok: boolean; description?: string };

        if (sendData.ok) {
          record.sentViaApi = true;
          saveRegistration(record);
          return res.json({
            ok: true,
            sentViaApi: true,
            ticketCode,
            botUsername,
            botDeepLink,
            groupUrl,
            message: 'Data pendaftaran berhasil dikirim otomatis ke grup/admin via Telegram Bot API!',
          });
        } else {
          saveRegistration(record);
          return res.json({
            ok: true,
            sentViaApi: false,
            ticketCode,
            botUsername,
            botDeepLink,
            groupUrl,
            apiWarning: sendData.description || 'Gagal mengirim via Bot API, dialihkan ke Deep Link.',
          });
        }
      } catch {
        saveRegistration(record);
        return res.json({
          ok: true,
          sentViaApi: false,
          ticketCode,
          botUsername,
          botDeepLink,
          groupUrl,
          apiWarning: 'Koneksi ke Telegram API terputus, dialihkan ke Deep Link.',
        });
      }
    }

    // Save ticket even if no token yet so Deep Link / webhook can reference it
    saveRegistration(record);
    return res.json({
      ok: true,
      sentViaApi: false,
      ticketCode,
      botUsername,
      botDeepLink,
      groupUrl,
      message: 'Tiket dibuat. Silakan lanjutkan melalui tombol Kirim Tiket ke Bot atau salin format tiket.',
    });
  });

  // Handle Bot CH complaints (Rule #09) and farewells (Rule #08)
  app.post('/api/telegram/botch', async (req, res) => {
    const { actionType, senderName, message } = req.body || {};
    if (!senderName || !message) {
      return res.status(400).json({ ok: false, error: 'Nama dan pesan wajib diisi.' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim() || lastDetectedChatId;

    if (token && chatId) {
      const headerTitle =
        actionType === 'keluhan'
          ? '🛡️ <b>LAPORAN KELUHAN SUASANA CC (RULE #09) — BOT CH</b>'
          : '🍂 <b>PENGAJUAN IZIN PAMIT / KELUAR (RULE #08) — BOT CH</b>';

      const text = [
        headerTitle,
        ``,
        `👤 <b>Pengirim:</b> ${escapeHtml(String(senderName))}`,
        `📝 <b>Pesan / Alasan:</b>`,
        escapeHtml(String(message)),
        ``,
        `<i>Prinsip Pengurus: Solve, Don't Spill.</i>`,
      ].join('\n');

      try {
        const sendRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'HTML',
          }),
        });
        const sendData = (await sendRes.json()) as { ok: boolean };
        return res.json({ ok: true, sentViaApi: Boolean(sendData.ok) });
      } catch {
        return res.json({ ok: true, sentViaApi: false });
      }
    }

    return res.json({ ok: true, sentViaApi: false });
  });

  // Start lightweight Telegram Bot update poller if TELEGRAM_BOT_TOKEN is provided
  // This handles "/start reg_BWU-XXXX" deep links automatically and "/id" helper command!
  startTelegramBotPoller();

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

function startTelegramBotPoller() {
  let offset = 0;

  const poll = async () => {
    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    if (!token) return;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${token}/getUpdates?offset=${offset}&timeout=5&allowed_updates=["message"]`
      );
      const data = (await res.json()) as {
        ok: boolean;
        result?: Array<{
          update_id: number;
          message?: {
            chat: { id: number; title?: string; username?: string; first_name?: string; type: string };
            from?: { id: number; username?: string; first_name?: string };
            text?: string;
          };
        }>;
      };

      if (data.ok && Array.isArray(data.result)) {
        for (const update of data.result) {
          offset = update.update_id + 1;
          const msg = update.message;
          if (!msg || !msg.text) continue;

          const chatIdStr = String(msg.chat.id);
          lastDetectedChatId = chatIdStr;
          lastDetectedChatTitle = msg.chat.title || msg.chat.username || msg.chat.first_name || 'Chat Telegram';

          const text = msg.text.trim();
          const groupUrl = process.env.TELEGRAM_GROUP_URL || 'https://t.me/BearWithUsCommunity';
          const adminChatId = process.env.TELEGRAM_CHAT_ID?.trim() || lastDetectedChatId;

          // Helper command to check Chat ID
          if (text.startsWith('/id') || text.startsWith('/chatid')) {
            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: msg.chat.id,
                text: `🐾 <b>ID Chat / Grup ini adalah:</b>\n<code>${msg.chat.id}</code>\n\nSalin angka di atas ke variabel <code>TELEGRAM_CHAT_ID</code> di pengaturan website Bear With Us.`,
                parse_mode: 'HTML',
              }),
            });
            continue;
          }

          // Handle Deep Link: /start reg_BWU-1234_...
          if (text.startsWith('/start')) {
            const parts = text.split(' ');
            const payload = parts[1] || '';

            if (payload.startsWith('reg_')) {
              const payloadParts = payload.split('_');
              const ticketCode = payloadParts[1] || 'BWU-OK';
              const ticket = registrationStore[ticketCode];

              const replyText = ticket
                ? [
                    `🐾 <b>Halo ${escapeHtml(ticket.fullName)}! Tiket Pendaftaranmu Diterima!</b>`,
                    ``,
                    `• <b>Nomor Tiket:</b> <code>${ticket.ticketCode}</code>`,
                    `• <b>Karakter RP:</b> ${escapeHtml(ticket.rpName)}`,
                    `• <b>Archetype:</b> ${escapeHtml(ticket.characterArchetype)}`,
                    ``,
                    `Silakan tekan tombol di bawah untuk langsung masuk ke Suaka Telegram <b>Bear With Us</b> dan sapa teman-teman di dekat perapian! ☕`,
                  ].join('\n')
                : [
                    `🐾 <b>Selamat Datang di Bot Resmi Bear With Us!</b>`,
                    ``,
                    `Kode Tiketmu (<code>${escapeHtml(ticketCode)}</code>) telah tercatat. Silakan klik tombol di bawah untuk masuk ke Suaka Telegram kami!`,
                  ].join('\n');

              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: msg.chat.id,
                  text: replyText,
                  parse_mode: 'HTML',
                  reply_markup: {
                    inline_keyboard: [
                      [
                        {
                          text: '🌲 Masuk Suaka Telegram Bear With Us',
                          url: groupUrl,
                        },
                      ],
                    ],
                  },
                }),
              });

              // Also notify admin group if adminChatId differs from user's private chat
              if (adminChatId && adminChatId !== String(msg.chat.id)) {
                const senderHandle = msg.from?.username ? `@${msg.from.username}` : msg.from?.first_name || 'Calon Anggota';
                await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: adminChatId,
                    text: `🔔 <b>KONFIRMASI DEEP LINK BOT</b>\nCalon anggota <b>${escapeHtml(senderHandle)}</b> baru saja mengaktifkan tiket <code>${escapeHtml(ticketCode)}</code> melalui Bot!`,
                    parse_mode: 'HTML',
                  }),
                });
              }
            } else {
              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: msg.chat.id,
                  text: `🐾 Halo! Ini adalah Bot Penjaga Pintu <b>Bear With Us</b>.\n\n• Ketik <code>/id</code> untuk melihat Chat ID grup/chat ini.\n• Daftar karaktermu melalui website resmi untuk mendapatkan tiket masuk!`,
                  parse_mode: 'HTML',
                }),
              });
            }
          }
        }
      }
    } catch {
      // Ignore transient polling errors
    } finally {
      setTimeout(poll, 4000);
    }
  };

  setTimeout(poll, 2000);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

startServer();

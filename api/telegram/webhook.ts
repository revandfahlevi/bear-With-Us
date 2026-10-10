function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req: any, res: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const groupUrl = process.env.TELEGRAM_GROUP_URL || 'https://t.me/+Z-4ZvjCMtbs4MDBh';
  const adminChatId = process.env.TELEGRAM_CHAT_ID?.trim();
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET?.trim();

  if (!token) {
    return res.status(400).json({
      ok: false,
      error: 'TELEGRAM_BOT_TOKEN belum diisi di Environment Variables Vercel.',
    });
  }

  // GET /api/telegram/webhook -> Mendaftarkan URL Vercel sebagai Webhook ke Telegram secara otomatis
  if (req.method === 'GET') {
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const webhookUrl = `${proto}://${host}/api/telegram/webhook`;

    try {
      const params = new URLSearchParams({ url: webhookUrl });
      if (webhookSecret) {
        params.set('secret_token', webhookSecret);
      }

      const tgRes = await fetch(
        `https://api.telegram.org/bot${token}/setWebhook?${params.toString()}`
      );
      const tgData = (await tgRes.json()) as { ok: boolean; description?: string };
      return res.status(200).json({
        ok: tgData.ok,
        webhookUrl,
        description: tgData.description || 'Webhook berhasil didaftarkan ke Telegram!',
      });
    } catch {
      return res.status(500).json({
        ok: false,
        error: 'Gagal mendaftarkan webhook ke api.telegram.org.',
      });
    }
  }

  // POST /api/telegram/webhook -> Menerima pesan masuk (/start atau /id) dari Telegram di Vercel
  if (req.method === 'POST') {
    // Jika user mengisi TELEGRAM_WEBHOOK_SECRET (opsional), validasi header dari Telegram
    if (webhookSecret) {
      const incomingSecret = req.headers['x-telegram-bot-api-secret-token'];
      if (incomingSecret !== webhookSecret) {
        return res.status(401).json({ ok: false, error: 'Unauthorized webhook secret' });
      }
    }

    const update = req.body;
    const msg = update?.message;

    if (!msg || !msg.text) {
      return res.status(200).json({ ok: true });
    }

    const text = String(msg.text).trim();

    if (text.startsWith('/id') || text.startsWith('/chatid')) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: msg.chat.id,
          text: `🐾 <b>ID Chat / Grup ini adalah:</b>\n<code>${msg.chat.id}</code>\n\nSalin angka di atas ke variabel <code>TELEGRAM_CHAT_ID</code> di pengaturan Environment Variables Vercel kamu.`,
          parse_mode: 'HTML',
        }),
      });
      return res.status(200).json({ ok: true });
    }

    if (text.startsWith('/start')) {
      const parts = text.split(' ');
      const payload = parts[1] || '';

      if (payload.startsWith('reg_')) {
        const payloadParts = payload.split('_');
        const ticketCode = payloadParts[1] || 'BWU-OK';
        const rpSlug = payloadParts.slice(2).join(' ') || 'Pengembara Baru';

        const replyText = [
          `🐾 <b>Tiket Pendaftaranmu Diterima!</b>`,
          ``,
          `• <b>Nomor Tiket:</b> <code>${escapeHtml(ticketCode)}</code>`,
          `• <b>Karakter RP:</b> ${escapeHtml(rpSlug)}`,
          ``,
          `Silakan tekan tombol di bawah untuk langsung masuk ke Suaka Telegram <b>Bear With Us</b> dan sapa teman-teman di dekat perapian! ☕`,
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

        if (adminChatId && adminChatId !== String(msg.chat.id)) {
          const senderHandle = msg.from?.username
            ? `@${msg.from.username}`
            : msg.from?.first_name || 'Calon Anggota';
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: adminChatId,
              text: `🔔 <b>KONFIRMASI DEEP LINK BOT</b>\nCalon anggota <b>${escapeHtml(
                senderHandle
              )}</b> baru saja mengaktifkan tiket <code>${escapeHtml(ticketCode)}</code> (${escapeHtml(
                rpSlug
              )}) melalui Bot!`,
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

    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
}

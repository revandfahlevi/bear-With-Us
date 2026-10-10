function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

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
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  let botUsername = (process.env.TELEGRAM_BOT_USERNAME || 'BearWithUsBot').replace(/^@/, '').trim();
  const groupUrl = process.env.TELEGRAM_GROUP_URL || 'https://t.me/+Z-4ZvjCMtbs4MDBh';

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

  const safeRpSlug = String(rpName)
    .replace(/[^a-zA-Z0-9]/g, '_')
    .slice(0, 24);
  const deepLinkPayload = `reg_${ticketCode}_${safeRpSlug}`;
  const botDeepLink = `https://t.me/${botUsername}?start=${deepLinkPayload}`;

  if (token && chatId) {
    const messageText = [
      `🐾 <b>TIKET PENDAFTARAN BARU — BEAR WITH US</b>`,
      `Nomor Tiket: <code>${ticketCode}</code>`,
      ``,
      `👤 <b>Nama Panggilan:</b> ${escapeHtml(String(fullName))}`,
      `📱 <b>Username Telegram:</b> ${escapeHtml(cleanUsername)}`,
      `🎭 <b>Nama Karakter RP:</b> ${escapeHtml(String(rpName))}`,
      `🌲 <b>Archetype Karakter:</b> ${escapeHtml(String(characterArchetype || '-'))}`,
      `🧭 <b>Sumber Info:</b> ${escapeHtml(String(referralSource || '-'))}`,
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
        return res.status(200).json({
          ok: true,
          sentViaApi: true,
          ticketCode,
          botUsername,
          botDeepLink,
          groupUrl,
          message: 'Data pendaftaran berhasil dikirim otomatis ke grup/admin via Telegram Bot API!',
        });
      }

      return res.status(200).json({
        ok: true,
        sentViaApi: false,
        ticketCode,
        botUsername,
        botDeepLink,
        groupUrl,
        apiWarning: sendData.description || 'Gagal mengirim via Bot API, dialihkan ke Deep Link.',
      });
    } catch {
      return res.status(200).json({
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

  return res.status(200).json({
    ok: true,
    sentViaApi: false,
    ticketCode,
    botUsername,
    botDeepLink,
    groupUrl,
    message: 'Tiket dibuat. Silakan lanjutkan melalui tombol Kirim Tiket ke Bot atau salin format tiket.',
  });
}

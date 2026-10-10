export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  const fallbackBotUsername = (process.env.TELEGRAM_BOT_USERNAME || 'BearWithUsBot').replace(/^@/, '').trim();
  const groupUrl = process.env.TELEGRAM_GROUP_URL || 'https://t.me/+Z-4ZvjCMtbs4MDBh';

  if (!token) {
    return res.status(200).json({
      configured: false,
      hasToken: false,
      hasChatId: Boolean(chatId),
      mode: 'deeplink',
      botUsername: fallbackBotUsername,
      groupUrl,
      message: 'Sistem Web & Deep Link sudah jalan di Vercel. Tambahkan TELEGRAM_BOT_TOKEN di Vercel Environment Variables untuk notifikasi otomatis.',
    });
  }

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    const tgData = (await tgRes.json()) as {
      ok: boolean;
      result?: { username?: string; first_name?: string };
    };

    if (tgData.ok && tgData.result) {
      return res.status(200).json({
        configured: Boolean(token && chatId),
        hasToken: true,
        hasChatId: Boolean(chatId),
        mode: token && chatId ? 'bot_api' : 'partial_token',
        botUsername: tgData.result.username || fallbackBotUsername,
        botName: tgData.result.first_name || 'Bear With Us Bot',
        groupUrl,
        message: chatId
          ? `Terhubung penuh ke bot @${tgData.result.username}. Siap mengirim tiket pendaftaran otomatis!`
          : `Bot @${tgData.result.username} sudah aktif! Isi TELEGRAM_CHAT_ID di Vercel Environment Variables agar notifikasi grup berjalan.`,
      });
    }

    return res.status(200).json({
      configured: false,
      hasToken: true,
      hasChatId: Boolean(chatId),
      mode: 'invalid_token',
      botUsername: fallbackBotUsername,
      groupUrl,
      message: 'TELEGRAM_BOT_TOKEN tidak valid atau ditolak oleh Telegram.',
    });
  } catch {
    return res.status(200).json({
      configured: false,
      hasToken: true,
      hasChatId: Boolean(chatId),
      mode: 'network_error',
      botUsername: fallbackBotUsername,
      groupUrl,
      message: 'Gagal menghubungi server api.telegram.org.',
    });
  }
}

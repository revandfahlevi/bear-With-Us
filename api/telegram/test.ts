export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token) {
    return res.status(400).json({
      ok: false,
      error: 'TELEGRAM_BOT_TOKEN belum diatur di Environment Variables.',
    });
  }

  if (!chatId) {
    return res.status(400).json({
      ok: false,
      error: 'TELEGRAM_CHAT_ID belum diatur di Environment Variables.',
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
      return res.status(200).json({
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
}

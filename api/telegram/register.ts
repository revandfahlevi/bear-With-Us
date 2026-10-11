function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// TELEGRAM_CHAT_ID boleh berisi satu atau beberapa ID, dipisah koma
function parseChatIds(raw?: string): string[] {
  return Array.from(
    new Set(
      (raw || '')
        .split(/[,;\s]+/)
        .map((s) => s.trim().replace(/^["']+|["']+$/g, ''))
        .filter(Boolean)
    )
  );
}

async function resolveValidChatIds(token: string, rawChatIds?: string): Promise<string[]> {
  const botSelfId = token.split(':')[0]?.trim();
  const configured = parseChatIds(rawChatIds).filter((id) => id !== botSelfId);

  if (configured.length > 0) {
    return configured;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?limit=20`);
    const data = await res.json();
    if (data.ok && Array.isArray(data.result)) {
      for (let i = data.result.length - 1; i >= 0; i--) {
        const item = data.result[i];
        const chatId = item.message?.chat?.id || item.my_chat_member?.chat?.id;
        if (chatId && String(chatId) !== botSelfId) {
          return [String(chatId)];
        }
      }
    }
  } catch {}

  return [];
}

interface SendResult {
  chatId: string;
  ok: boolean;
  error?: string;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const { actionType, senderName, message } = req.body || {};

  if (!senderName || !message) {
    return res.status(400).json({
      ok: false,
      error: 'Nama pengirim dan isi pesan wajib diisi.',
    });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();

  if (token) {
    const chatIds = await resolveValidChatIds(token, process.env.TELEGRAM_CHAT_ID);

    if (chatIds.length > 0) {
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

      // Kirim ke semua tujuan sekaligus
      const results: SendResult[] = await Promise.all(
        chatIds.map(async (chatId): Promise<SendResult> => {
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
            const sendData = await sendRes.json();
            if (sendData.ok) return { chatId, ok: true };
            return { chatId, ok: false, error: sendData.description || 'Telegram menolak pesan.' };
          } catch {
            return { chatId, ok: false, error: 'Gagal menghubungi Telegram.' };
          }
        })
      );

      const failed = results.filter((r) => !r.ok);
      failed.forEach((f) => console.error(`[botch] gagal kirim ke chat ${f.chatId}: ${f.error}`));

      if (failed.length < results.length) {
        return res.status(200).json({
          ok: true,
          sentViaApi: true,
          delivered: results.length - failed.length,
          failed: failed.length,
        });
      }

      return res.status(502).json({
        ok: false,
        error: failed[0]?.error || 'Telegram menolak pesan.',
      });
    }
  }

  return res.status(503).json({
    ok: false,
    error: 'Bot Telegram belum dikonfigurasi di server.',
  });
}
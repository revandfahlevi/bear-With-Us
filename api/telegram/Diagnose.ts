// SEMENTARA: hapus file ini setelah masalah bot selesai.
async function tg(token: string, method: string, params: Record<string, string> = {}) {
  try {
    const qs = new URLSearchParams(params).toString();
    const r = await fetch(`https://api.telegram.org/bot${token}/${method}${qs ? `?${qs}` : ''}`);
    return (await r.json()) as { ok: boolean; result?: any; description?: string };
  } catch {
    return { ok: false, description: 'Tidak bisa menghubungi Telegram' } as {
      ok: boolean;
      result?: any;
      description?: string;
    };
  }
}

const mask = (id: string) => (id.length <= 6 ? id : `${id.slice(0, 4)}…${id.slice(-3)}`);

export default async function handler(_req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');

  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const rawChatIds: string = process.env.TELEGRAM_CHAT_ID || '';
  const chatIds: string[] = Array.from(
    new Set(
      rawChatIds
        .split(/[,;\s]+/)
        .map((s: string) => s.trim().replace(/^["']+|["']+$/g, ''))
        .filter(Boolean)
    )
  );

  if (!token) {
    return res.status(200).json({
      tokenSet: false,
      hint: 'TELEGRAM_BOT_TOKEN tidak terbaca di server. Cek nama variabel, environment Production, lalu Redeploy.',
    });
  }

  const me = await tg(token, 'getMe');
  const botId = me.result?.id;

  const chats = await Promise.all(
    chatIds.map(async (id) => {
      const chat = await tg(token, 'getChat', { chat_id: id });
      let botStatus: string | undefined;
      if (chat.ok && botId && chat.result?.type !== 'private') {
        const member = await tg(token, 'getChatMember', { chat_id: id, user_id: String(botId) });
        botStatus = member.ok ? member.result?.status : member.description;
      }
      return {
        id: mask(id),
        reachable: chat.ok,
        type: chat.result?.type,
        error: chat.ok ? undefined : chat.description,
        botStatus,
      };
    })
  );

  return res.status(200).json({
    tokenSet: true,
    tokenValid: me.ok,
    tokenError: me.ok ? undefined : me.description,
    botUsername: me.result?.username,
    chatIdsRead: chatIds.length,
    chats,
  });
}
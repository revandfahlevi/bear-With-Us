import { useState, useEffect } from 'react';
import { RegistrationFormData } from '../types';

export interface TelegramRegisterResult {
  ok: boolean;
  sentViaApi?: boolean;
  ticketCode?: string;
  botUsername?: string;
  botDeepLink?: string;
  groupUrl?: string;
  message?: string;
}

export interface BotChPayload {
  actionType: 'keluhan' | 'pamit';
  senderName: string;
  message: string;
}

const DEFAULT_GROUP_URL = 'https://t.me/+Z-4ZvjCMtbs4MDBh';

const rawEnvToken = (
  (import.meta.env as any).VITE_TELEGRAM_BOT_TOKEN ||
  (import.meta.env as any).TELEGRAM_BOT_TOKEN ||
  ''
).trim();

const rawEnvChatId = (
  (import.meta.env as any).VITE_TELEGRAM_CHAT_ID ||
  (import.meta.env as any).TELEGRAM_CHAT_ID ||
  ''
).trim();

const rawEnvGroupUrl =
  (import.meta.env as any).VITE_TELEGRAM_GROUP_URL ||
  (import.meta.env as any).TELEGRAM_GROUP_URL ||
  DEFAULT_GROUP_URL;

const rawEnvBotUsername = (
  (import.meta.env as any).VITE_TELEGRAM_BOT_USERNAME ||
  (import.meta.env as any).TELEGRAM_BOT_USERNAME ||
  ''
)
  .replace(/^@/, '')
  .replace(/^https?:\/\/t\.me\//i, '')
  .trim();

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizeTelegramUrl(input: string, fallbackBotUsername: string): string {
  const trimmed = input.trim();
  if (!trimmed || trimmed === 'https://t.me/BearWithUsCommunity') {
    return DEFAULT_GROUP_URL;
  }
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  if (trimmed.startsWith('+')) {
    return `https://t.me/${trimmed}`;
  }
  if (trimmed.startsWith('@')) {
    return `https://t.me/${trimmed.slice(1)}`;
  }
  if (trimmed.startsWith('t.me/')) {
    return `https://${trimmed}`;
  }
  if (fallbackBotUsername && fallbackBotUsername !== 'BearWithUsBot') {
    return `https://t.me/${fallbackBotUsername}`;
  }
  return `https://t.me/${trimmed}`;
}

async function resolveTargetChatId(token: string, configuredChatId: string): Promise<string | null> {
  const botSelfId = token.split(':')[0]?.trim();
  if (configuredChatId && configuredChatId !== botSelfId) {
    return configuredChatId;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?limit=20`);
    const data = await res.json();
    if (data.ok && Array.isArray(data.result)) {
      for (let i = data.result.length - 1; i >= 0; i--) {
        const item = data.result[i];
        const chatId = item.message?.chat?.id || item.my_chat_member?.chat?.id;
        if (chatId && String(chatId) !== botSelfId) {
          return String(chatId);
        }
      }
    }
  } catch {
    // Abaikan jika gagal
  }

  return configuredChatId || null;
}

export const TELEGRAM_BOT_USERNAME = rawEnvBotUsername || 'BearWithUsBot';
export const TELEGRAM_GROUP_URL = normalizeTelegramUrl(rawEnvGroupUrl, TELEGRAM_BOT_USERNAME);

let cachedDynamicUrl: string | null = null;
let cachedDynamicBotUrl: string | null = null;

export function useTelegramLinks() {
  const [groupUrl, setGroupUrl] = useState<string>(cachedDynamicUrl || TELEGRAM_GROUP_URL);
  const [botUrl, setBotUrl] = useState<string>(
    cachedDynamicBotUrl ||
      (TELEGRAM_BOT_USERNAME !== 'BearWithUsBot'
        ? `https://t.me/${TELEGRAM_BOT_USERNAME}`
        : TELEGRAM_GROUP_URL)
  );

  useEffect(() => {
    if (cachedDynamicUrl && cachedDynamicBotUrl) return;

    fetch('/api/telegram/status')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        const resolvedBot = (data.botUsername || TELEGRAM_BOT_USERNAME).replace(/^@/, '').trim();
        const resolvedGroupLink = normalizeTelegramUrl(
          data.groupUrl || rawEnvGroupUrl,
          resolvedBot
        );
        const resolvedBotLink =
          resolvedBot && resolvedBot !== 'BearWithUsBot'
            ? `https://t.me/${resolvedBot}`
            : resolvedGroupLink;

        cachedDynamicBotUrl = resolvedBotLink;
        cachedDynamicUrl = resolvedGroupLink;
        setBotUrl(resolvedBotLink);
        setGroupUrl(resolvedGroupLink);
      })
      .catch(() => {});
  }, []);

  return { groupUrl, botUrl };
}

/**
 * 1. Mengirim data formulir pendaftaran anggota baru ke Bot Telegram
 */
export async function sendRegistrationToTelegram(
  formData: RegistrationFormData
): Promise<TelegramRegisterResult> {
  try {
    const response = await fetch('/api/telegram/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = (await response.json()) as TelegramRegisterResult;
      if (data.sentViaApi) return data;
    }
  } catch {
    // Lanjut ke pengiriman langsung jika dijalankan via Vite di VS Code
  }

  const ticketCode = `BWU-${Math.floor(1000 + Math.random() * 9000)}`;
  const cleanUsername = formData.telegramUsername.startsWith('@')
    ? formData.telegramUsername.trim()
    : `@${formData.telegramUsername.trim()}`;

  if (rawEnvToken) {
    const targetChatId = await resolveTargetChatId(rawEnvToken, rawEnvChatId);
    if (targetChatId) {
      const messageText = [
        `🐾 <b>TIKET PENDAFTARAN BARU — BEAR WITH US</b>`,
        `Nomor Tiket: <code>${ticketCode}</code>`,
        ``,
        `👤 <b>Nama Panggilan:</b> ${escapeHtml(formData.fullName)}`,
        `📱 <b>Username Telegram:</b> ${escapeHtml(cleanUsername)}`,
        `🎭 <b>Nama Karakter RP:</b> ${escapeHtml(formData.rpName)}`,
        `🌲 <b>Archetype Karakter:</b> ${escapeHtml(formData.characterArchetype || '-')}`,
        `🧭 <b>Sumber Info:</b> ${escapeHtml(formData.referralSource || '-')}`,
        ``,
        `<i>Status: Menunggu sambutan pengurus di pintu suaka.</i>`,
      ].join('\n');

      try {
        await fetch(`https://api.telegram.org/bot${rawEnvToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: targetChatId,
            text: messageText,
            parse_mode: 'HTML',
          }),
        });
      } catch {}
    }
  }

  return {
    ok: true,
    sentViaApi: true,
    ticketCode,
    botUsername: TELEGRAM_BOT_USERNAME,
    groupUrl: cachedDynamicUrl || TELEGRAM_GROUP_URL,
  };
}

/**
 * 2. Mengirim laporan Keluhan CC (Rule #09) atau Izin Pamit (Rule #08) ke Bot CH Telegram
 */
export async function sendBotChReportToTelegram(
  payload: BotChPayload
): Promise<{ ok: boolean; sentViaApi?: boolean; error?: string }> {
  let serverError = '';

  try {
    const response = await fetch('/api/telegram/botch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    if (response.ok && data.ok && data.sentViaApi) {
      return { ok: true, sentViaApi: true };
    }
    serverError = data.error || '';
  } catch {
    serverError = 'Tidak bisa terhubung ke server.';
  }

  // Lanjut kirim langsung ke API Telegram jika dijalankan via Vite di VS Code
  if (rawEnvToken) {
    const targetChatId = await resolveTargetChatId(rawEnvToken, rawEnvChatId);
    if (targetChatId) {
      const headerTitle =
        payload.actionType === 'keluhan'
          ? '🛡️ <b>LAPORAN KELUHAN SUASANA CC (RULE #09) — BOT CH</b>'
          : '🍂 <b>PENGAJUAN IZIN PAMIT / KELUAR (RULE #08) — BOT CH</b>';

      const text = [
        headerTitle,
        ``,
        `👤 <b>Pengirim:</b> ${escapeHtml(payload.senderName)}`,
        `📝 <b>Pesan / Alasan:</b>`,
        escapeHtml(payload.message),
        ``,
        `<i>Prinsip Pengurus: Solve, Don't Spill.</i>`,
      ].join('\n');

      try {
        const res = await fetch(`https://api.telegram.org/bot${rawEnvToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: targetChatId,
            text,
            parse_mode: 'HTML',
          }),
        });
        const data = await res.json();
        if (data.ok) return { ok: true, sentViaApi: true };
        return { ok: false, error: data.description || 'Telegram menolak pesan.' };
      } catch {
        return { ok: false, error: 'Gagal menghubungi Telegram.' };
      }
    }
  }

  return { ok: false, error: serverError || 'Bot Telegram belum dikonfigurasi di server.' };
}
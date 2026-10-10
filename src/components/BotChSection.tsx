import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendBotChReportToTelegram } from '../services/telegram';

type Kind = 'keluhan' | 'pamit';
type Status = 'idle' | 'sending' | 'done' | 'error';

export const BotChSection: React.FC = () => {
  const [kind, setKind] = useState<Kind>('keluhan');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const result = await sendBotChReportToTelegram({ actionType: kind, senderName: name, message });
    if (result.ok) {
      setStatus('done');
      setName('');
      setMessage('');
    } else {
      setError(result.error || 'Pesan gagal terkirim. Coba lagi sebentar lagi.');
      setStatus('error');
    }
  };

  const field =
    'w-full px-3 py-2.5 bg-white border border-[#221812]/20 text-sm text-[#221812] focus:outline-none focus:border-[#B85829]';
  const label = 'block text-[11px] font-mono uppercase tracking-wider text-[#221812] mb-1';

  return (
    <section id="bot-ch" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-b border-[#221812]/10">
      <div className="text-xs font-mono uppercase tracking-widest text-[#B85829] mb-2">
        [BOT CH · RULES #08 & #09]
      </div>
      <h2 className="font-display text-3xl sm:text-4xl text-[#221812] tracking-tight mb-3">
        Ruang keluh kesah & izin pamit.
      </h2>
      <p className="text-sm text-[#5F4E42] leading-relaxed mb-6">
        Ada yang bikin nggak nyaman di CC, atau mau pamit? Tulis di sini. Pesanmu diterima pengurus secara privat.
      </p>

      <div className="p-1 bg-[#F2EDE4] border border-[#221812]/15 flex gap-1 mb-5 text-xs font-semibold">
        {(['keluhan', 'pamit'] as Kind[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => { setKind(k); setStatus('idle'); }}
            className={`flex-1 py-2 transition-colors cursor-pointer ${kind === k ? 'bg-[#221812] text-white' : 'text-[#5F4E42]'}`}
          >
            {k === 'keluhan' ? 'Keluh Kesah (09)' : 'Izin Pamit (08)'}
          </button>
        ))}
      </div>

      {status === 'done' ? (
        <div className="p-6 bg-[#EBF2EC] text-center border border-[#2B4533]/30">
          <CheckCircle2 className="w-8 h-8 text-[#2B4533] mx-auto mb-2" />
          <h3 className="font-display font-semibold text-[#221812]">Pesan sudah diterima pengurus</h3>
          <p className="text-xs text-[#5F4E42] mt-1">Akan ditindaklanjuti secara privat. Terima kasih sudah bercerita.</p>
          <button type="button" onClick={() => setStatus('idle')} className="mt-4 text-xs underline cursor-pointer text-[#2B4533]">
            Kirim pesan lain
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className={label}>Nama / Username Telegram</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: @pengembara_rp" className={field} />
          </div>
          <div>
            <label className={label}>{kind === 'keluhan' ? 'Keluh kesah atau masukanmu' : 'Alasan pamit / rehat'}</label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={kind === 'keluhan' ? 'Ceritakan apa yang kamu rasakan...' : 'Sampaikan alasanmu pamit...'}
              className={field}
            />
          </div>
          {status === 'error' && (
            <div className="flex items-start gap-2 p-3 bg-[#FBEDEA] border border-[#B8442F]/30 text-xs text-[#7A2A1B]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-px" />
              <span>{error}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-3 bg-[#2B4533] hover:bg-[#1E3124] disabled:opacity-60 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{status === 'sending' ? 'Mengirim...' : kind === 'keluhan' ? 'Kirim Keluh Kesah' : 'Ajukan Pamit'}</span>
          </button>
        </form>
      )}
    </section>
  );
};
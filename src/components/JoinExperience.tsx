import React, { useState } from 'react';
import { PawIcon } from './PawIcon';
import { RegistrationFormData } from '../types';
import { sendRegistrationToTelegram, TELEGRAM_GROUP_URL } from '../services/telegram';
import { Send, CheckCircle2, ExternalLink, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface JoinExperienceProps {
  formRef: React.RefObject<HTMLDivElement | null>;
}

export const JoinExperience: React.FC<JoinExperienceProps> = ({ formRef }) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    telegramUsername: '',
    rpName: '',
    characterArchetype: 'Kehidupan Sehari-hari & Kota Hangat',
    referralSource: 'Channel Broadcast Telegram',
    agreedToRules: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedGreeting, setCopiedGreeting] = useState(false);

  const steps = [
    {
      num: '01',
      title: 'Pahami Nilai Den',
      desc: 'Pelajari filosofi kebersamaan Grizz, Panda, dan Ice Bear: saling menghormati dan tidak baper.',
    },
    {
      num: '02',
      title: 'Setujui Aturan',
      desc: 'Pahami 9 aturan anggota dan 7 aturan pengurus untuk menjaga suaka tetap aman dan tertib.',
    },
    {
      num: '03',
      title: 'Daftarkan Karakter',
      desc: 'Isi identitas peran dan username Telegrammu pada register resmi di bawah ini.',
    },
    {
      num: '04',
      title: 'Masuki Pintu Den',
      desc: 'Terima tautan langsung suaka Telegram dan perkenalkan karaktermu di lingkaran perapian.',
    },
  ];

  const validate = (): boolean => {
    const errs: Partial<Record<keyof RegistrationFormData, string>> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Mohon masukkan nama atau panggilanmu';
    }
    if (!formData.telegramUsername.trim()) {
      errs.telegramUsername = 'Username Telegram wajib diisi (contoh: @namakamu)';
    } else if (!formData.telegramUsername.startsWith('@') && formData.telegramUsername.length < 3) {
      errs.telegramUsername = 'Sertakan tanda @ pada username Telegram';
    }
    if (!formData.rpName.trim()) {
      errs.rpName = 'Mohon isi nama karakter roleplay yang akan dimainkan';
    }
    if (!formData.agreedToRules) {
      errs.agreedToRules = 'Kamu wajib menyetujui komitmen saling menghargai';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    await sendRegistrationToTelegram(formData);

    setIsSubmitting(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#221812', '#B85829', '#2B4533', '#EBE4D8'],
      });
    } catch {}
  };

  const telegramJoinUrl = TELEGRAM_GROUP_URL;

  const greetingTemplate = `Halo Teman-Teman Beruang! 🐾 Saya baru saja mengisi tiket pendaftaran di website resmi. Karakter saya adalah ${
    formData.rpName || 'seorang pengembara'
  }, dan username saya ${formData.telegramUsername || '@anggota'}. Senang sekali bisa bergabung di dekat perapian hangat! ☕`;

  const copyGreeting = () => {
    navigator.clipboard.writeText(greetingTemplate);
    setCopiedGreeting(true);
    setTimeout(() => setCopiedGreeting(false), 2500);
  };

  return (
    <section id="join" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#221812]/10">
      {/* 4-Step Architectural Progress Tracker */}
      <div className="mb-16 sm:mb-20">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#B85829] flex items-center gap-2 mb-2">
            <span>[ALUR PENERIMAAN ANGGOTA]</span>
            <span aria-hidden="true">·</span>
            <span>FOUR-STEP PROTOCOL</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#221812] tracking-tight">
            Langkah bergabung ke dalam suaka.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="p-5 bg-white border border-[#221812]/15 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#917F72] border-b border-[#221812]/10 pb-2 mb-3">
                  <span className="font-bold text-[#B85829]">STEP // {step.num}</span>
                  {idx < 3 && <span className="opacity-50">Lanjut →</span>}
                </div>
                <h3 className="font-display font-semibold text-base text-[#221812] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-[#5F4E42] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Registry Ledger */}
      <div ref={formRef} className="max-w-3xl mx-auto">
        <div className="bg-[#F2EDE4] border-2 border-[#221812] p-6 sm:p-10 shadow-lg">
          {!isSubmitted ? (
            <div>
              {/* Form Masthead */}
              <div className="pb-6 mb-8 border-b border-[#221812]/15">
                <div className="flex items-center justify-between text-xs font-mono text-[#917F72] mb-2">
                  <span className="text-[#B85829] font-bold">DOKUMEN PENDAFTARAN RESMI</span>
                  <span>FORM NO. BWU-2026</span>
                </div>
                <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[#221812]">
                  Buku Registrasi Calon Anggota Den
                </h3>
                <p className="text-xs sm:text-sm text-[#5F4E42] mt-1.5 leading-relaxed">
                  Lengkapi identitas peranmu di bawah. Data ini digunakan staf untuk memvalidasi dan menyapa karaktermu begitu pintu den terbuka.
                </p>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#221812] mb-1">
                      Nama atau Panggilanmu <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="contoh: Bram atau Alex"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-3 py-2.5 bg-white border text-xs sm:text-sm text-[#221812] placeholder-[#917F72]/60 focus:outline-none focus:border-[#B85829] ${
                        errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#221812]/20'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-600 font-mono">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Telegram Username Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#221812] mb-1">
                      Username Telegram <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="@username_kamu"
                      value={formData.telegramUsername}
                      onChange={(e) => setFormData({ ...formData, telegramUsername: e.target.value })}
                      className={`w-full px-3 py-2.5 bg-white border text-xs sm:text-sm text-[#221812] placeholder-[#917F72]/60 focus:outline-none focus:border-[#B85829] ${
                        errors.telegramUsername ? 'border-red-500 bg-red-50/20' : 'border-[#221812]/20'
                      }`}
                    />
                    {errors.telegramUsername && (
                      <p className="mt-1 text-xs text-red-600 font-mono">{errors.telegramUsername}</p>
                    )}
                  </div>

                  {/* RP Character Name */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#221812] mb-1">
                      Nama Karakter Roleplay <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="contoh: Arthur sang Pengembara"
                      value={formData.rpName}
                      onChange={(e) => setFormData({ ...formData, rpName: e.target.value })}
                      className={`w-full px-3 py-2.5 bg-white border text-xs sm:text-sm text-[#221812] placeholder-[#917F72]/60 focus:outline-none focus:border-[#B85829] ${
                        errors.rpName ? 'border-red-500 bg-red-50/20' : 'border-[#221812]/20'
                      }`}
                    />
                    {errors.rpName && (
                      <p className="mt-1 text-xs text-red-600 font-mono">{errors.rpName}</p>
                    )}
                  </div>

                  {/* Character Archetype */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#221812] mb-1">
                      Archetype & Vibe Karakter
                    </label>
                    <select
                      value={formData.characterArchetype}
                      onChange={(e) => setFormData({ ...formData, characterArchetype: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#221812]/20 text-xs sm:text-sm text-[#221812] focus:outline-none focus:border-[#B85829] cursor-pointer"
                    >
                      <option value="Kehidupan Sehari-hari & Kota Hangat">Kehidupan Sehari-hari & Kota Hangat</option>
                      <option value="Pengelana Rimba & Penjelajah Alam">Pengelana Rimba & Penjelajah Alam</option>
                      <option value="Makhluk Fantasi & Legenda Hutan">Makhluk Fantasi & Legenda Hutan</option>
                      <option value="Cendekiawan Tenang & Pengrajin">Cendekiawan Tenang & Pengrajin</option>
                      <option value="Pengelana Bebas Tanpa Batas">Pengelana Bebas Tanpa Batas</option>
                    </select>
                  </div>
                </div>

                {/* Referral Source */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#221812] mb-1">
                    Dari Mana Mengetahui Bear With Us?
                  </label>
                  <select
                    value={formData.referralSource}
                    onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-[#221812]/20 text-xs sm:text-sm text-[#221812] focus:outline-none focus:border-[#B85829] cursor-pointer"
                  >
                    <option value="Channel Broadcast Telegram">Channel Broadcast Telegram</option>
                    <option value="Diajak Teman / Sahabat">Diajak Teman / Sahabat</option>
                    <option value="Direktori Komunitas Roleplay">Direktori Komunitas Roleplay</option>
                    <option value="Media Sosial (Twitter/X, TikTok, Instagram)">Media Sosial (Twitter/X, TikTok, Instagram)</option>
                    <option value="Sumber Lainnya">Sumber Lainnya</option>
                  </select>
                </div>

                {/* Agreement Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreedToRules}
                      onChange={(e) => setFormData({ ...formData, agreedToRules: e.target.checked })}
                      className="mt-0.5 w-4 h-4 text-[#221812] focus:ring-[#221812] border-[#221812]/30"
                    />
                    <span className="text-xs text-[#5F4E42] leading-relaxed">
                      Saya berjanji menjaga rasa hormat, tidak membawa drama luar ke CC, dan mematuhi konstitusi resmi den Bear With Us.
                    </span>
                  </label>
                  {errors.agreedToRules && (
                    <p className="mt-1 text-xs text-red-600 font-mono pl-6">{errors.agreedToRules}</p>
                  )}
                </div>

                {/* Action Row */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 py-3 px-6 bg-[#221812] hover:bg-[#3D2E24] text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>MENCATAT TIKET MASUK...</span>
                    ) : (
                      <>
                        <PawIcon size={14} color="#F8F5F0" />
                        <span>Kirim Formulir & Buka Pintu Den</span>
                      </>
                    )}
                  </button>

                  <a
                    href={telegramJoinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-white text-[#221812] font-mono text-xs border border-[#221812]/20 hover:bg-[#F8F5F0] transition-colors"
                  >
                    <span>Masuk Telegram Langsung</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#2AABEE]" />
                  </a>
                </div>
              </form>
            </div>
          ) : (
            /* Stamped Confirmation State */
            <div className="py-4 text-center max-w-lg mx-auto">
              <div className="w-12 h-12 bg-[#2B4533] text-white flex items-center justify-center mx-auto mb-4 rounded-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="text-xs font-mono uppercase tracking-widest text-[#2B4533] mb-1">
                TIKET MASUK DISETUJUI // NO. BWU-OK
              </div>

              <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[#221812] mb-2">
                Selamat Datang di Rumah, {formData.fullName}!
              </h3>

              <p className="text-xs sm:text-sm text-[#5F4E42] leading-relaxed mb-6">
                Karaktermu <strong>{formData.rpName}</strong> telah resmi terdaftar. Perapian telah menyala dan kawan-kawan siap menyambutmu.
              </p>

              {/* Greeting template */}
              <div className="p-3.5 bg-white border border-[#221812]/15 text-left mb-6 font-mono text-xs">
                <div className="text-[10px] text-[#917F72] uppercase tracking-wider mb-1">
                  TEMPLATE SAPAAN PERDANA
                </div>
                <p className="text-[#221812] bg-[#F8F5F0] p-2.5 border border-[#221812]/10 leading-relaxed font-sans">
                  {greetingTemplate}
                </p>
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={copyGreeting}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#F2EDE4] hover:bg-[#EBE4D8] text-[#221812] cursor-pointer"
                  >
                    {copiedGreeting ? (
                      <>
                        <Check className="w-3 h-3 text-[#2B4533]" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#B85829]" />
                        <span>Salin Sapaan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={telegramJoinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2AABEE] hover:bg-[#2097D4] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Masuk Suaka Telegram</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      fullName: '',
                      telegramUsername: '',
                      rpName: '',
                      characterArchetype: 'Kehidupan Sehari-hari & Kota Hangat',
                      referralSource: 'Channel Broadcast Telegram',
                      agreedToRules: false,
                    });
                  }}
                  className="text-xs font-mono text-[#B85829] hover:underline cursor-pointer"
                >
                  Isi formulir baru
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

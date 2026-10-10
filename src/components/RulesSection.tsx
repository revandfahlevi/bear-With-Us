import React, { useState } from 'react';
import { RuleItem } from '../types';
import { PawIcon } from './PawIcon';
import { sendBotChReportToTelegram, TELEGRAM_GROUP_URL } from '../services/telegram';
import {
  ShieldCheck,
  Users,
  Bot,
  Send,
  X,
  FileText,
  CheckCircle2,
  Copy,
  Check,
  BookMarked,
  ArrowUpRight,
} from 'lucide-react';

export const RulesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'member' | 'admin'>('member');
  const [modalOpen, setModalOpen] = useState(false);
  const [botModalOpen, setBotModalOpen] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Bot simulator state
  const [botActionType, setBotActionType] = useState<'keluhan' | 'pamit'>('keluhan');
  const [botSenderName, setBotSenderName] = useState('');
  const [botMessage, setBotMessage] = useState('');
  const [botSubmitted, setBotSubmitted] = useState(false);

  // 9 OFFICIAL BWU MEMBER RULES
  const memberRules: RuleItem[] = [
    {
      number: '01',
      title: 'ONLY RP',
      summary: 'Grup ini didedikasikan murni untuk dunia dan interaksi Roleplay.',
      details: 'Gunakan karakter dan persona bermain peranmu. Fokus merajut cerita, persahabatan karakter, dan bersenang-senang di semesta den tanpa membawa identitas dunia nyata.',
      iconName: 'users',
      badge: 'FOKUS UTAMA',
    },
    {
      number: '02',
      title: 'Masalah Dibahas di RC Masing-Masing',
      summary: 'Jika punya masalah tolong bahas di rc (room chat privat) masing-masing.',
      details: 'Jangan membawa perselisihan pribadi ke dalam circle publik (cc). Selesaikan secara dewasa dan berkepala dingin di jalur privat.',
      iconName: 'lock',
      badge: 'PRIVASI RC',
    },
    {
      number: '03',
      title: 'Dilarang Keras untuk Numnam!',
      summary: 'Dilarang keras numpang nama saja tanpa ikut berinteraksi di obrolan.',
      details: 'Den kami dibangun untuk saling menyapa dan bercengkerama. Jangan biarkan dirimu membisu setelah bergabung—yuk nimbrung dan bercanda bareng!',
      iconName: 'userX',
      badge: 'KEAKTIFAN',
    },
    {
      number: '04',
      title: 'Jangan Kaitkan Urusan Pribadi ke CC',
      summary: 'Pisahkan urusan pribadi atau real life dari ruang circle chat (cc).',
      details: 'Hindari melampiaskan emosi dunia nyata ke dalam grup publik. Masuki den untuk rekreasi dan berbagi tawa bersama kawan sehangat perapian.',
      iconName: 'shield',
      badge: 'KENYAMANAN',
    },
    {
      number: '05',
      title: 'Dilarang Konten / Stiker 18/21+',
      summary: 'Dilarang keras membahas atau mengirim sticker berbau 18/21+.',
      details: 'Komunitas Bear With Us adalah suaka yang aman, nyaman, dan ramah untuk semua usia. Konten vulgar atau tidak senonoh akan langsung ditindak tegas.',
      iconName: 'alert',
      badge: 'STRICT SFW',
    },
    {
      number: '06',
      title: 'Toxic Sewajarnya, Berlebihan Wajib Spoiler',
      summary: 'Toxic sewajarnya, bila berlebihan mohon untuk di-spoiler.',
      details: 'Bercandaan santai diperbolehkan, namun jika menggunakan kata-kata kasar atau humor sensitif, wajib menggunakan format sensor spoiler Telegram.',
      iconName: 'messageOff',
      badge: 'ETIKA CHAT',
    },
    {
      number: '07',
      title: 'Saling Menghargai, Jangan Pernah Kacang!',
      summary: 'Saling menghargai sesama member, jangan biarkan pesan teman dikacangin!',
      details: 'Ketika ada anggota baru atau teman yang mengirim pesan, tanggapi dan sambut dengan ramah. Tidak boleh ada yang merasa diabaikan di sini.',
      iconName: 'heart',
      badge: 'ANTI-KACANG',
    },
    {
      number: '08',
      title: 'Prosedur Pamit: Wajib Alasan via Bot CH',
      summary: 'Jika ingin keluar, tolong berikan alasan yang jelas, kirim melalui bot ch.',
      details: 'Masuk dengan baik-baik, pamit pun dengan sopan. Sampaikan alasanmu melalui Bot CH resmi agar silaturahmi tetap terjaga dengan penuh rasa hormat.',
      iconName: 'bot',
      badge: 'ETIKA PAMIT',
    },
    {
      number: '09',
      title: 'Suara Member: Berikan Keluhan via Bot CH',
      summary: 'Bila tidak nyaman dengan suasana cc, bisa memberi keluhan melalui bot ch.',
      details: 'Merasa kurang nyaman atau ada yang mengganggu? Sampaikan aduanmu secara aman dan rahasia melalui Bot CH resmi untuk mediasi staf.',
      iconName: 'bot',
      badge: 'MEDIASI AMAN',
    },
  ];

  // 7 OFFICIAL BWU ADMIN RULES
  const adminRules: RuleItem[] = [
    {
      number: '01',
      title: 'BE RESPONSIBLE',
      summary: 'Admin wajib menjalankan tugas dengan tanggung jawab dan tidak menghilang saat dibutuhkan.',
      details: 'Hadir saat anggota membutuhkan bantuan atau mediasi. Disiplin dalam memantau kenyamanan dan ketertiban den.',
      iconName: 'shield',
      badge: 'TANGGUNG JAWAB',
    },
    {
      number: '02',
      title: 'NO FAVORITISM',
      summary: 'Jangan membeda-bedakan member. Semua diperlakukan secara adil dan dihargai.',
      details: 'Tidak ada kasta atau perlakuan istimewa. Teman dekat sekalipun tetap tunduk pada aturan yang sama tanpa pilih kasih.',
      iconName: 'scale',
      badge: 'KEADILAN',
    },
    {
      number: '03',
      title: 'KEEP THE DEN SAFE',
      summary: 'Jaga grup tetap nyaman. Jangan biarkan bullying, penghinaan, atau masalah pribadi mengganggu member lain.',
      details: 'Segera lakukan intervensi secara bijak jika obrolan mulai mengarah ke perundungan atau kebencian.',
      iconName: 'lock',
      badge: 'PERLINDUNGAN',
    },
    {
      number: '04',
      title: "SOLVE, DON'T SPILL",
      summary: 'Kalau ada masalah antar-member, selesaikan secara private terlebih dahulu. Jangan membawa masalah ke publik.',
      details: 'Mediasi dilakukan di ruang privat (RC) atau melalui staf resmi. Tidak ada drama yang dipertontonkan di circle chat utama.',
      iconName: 'heartHandshake',
      badge: 'MEDIASI PRIVAT',
    },
    {
      number: '05',
      title: 'NO POWER ABUSE',
      summary: 'Jabatan admin bukan berarti bebas melakukan apa saja. Jangan menggunakan wewenang untuk kepentingan pribadi.',
      details: 'Wewenang kick, mute, atau teguran hanya diterapkan untuk menegakkan aturan resmi, bukan karena ketidaksukaan personal.',
      iconName: 'shield',
      badge: 'ETIKA WEWENANG',
    },
    {
      number: '06',
      title: 'DISCUSS BEFORE DECIDING',
      summary: 'Untuk keputusan penting seperti perubahan rules, kick, atau masalah besar, diskusikan dengan admin lain terlebih dahulu.',
      details: 'Keputusan bersifat kolegial untuk menjaga objektivitas dan mencegah keputusan gegabah yang merugikan anggota.',
      iconName: 'users',
      badge: 'MUSYAWARAH',
    },
    {
      number: '07',
      title: 'KEEP IT FUN',
      summary: 'Admin juga bagian dari circle. Boleh bercanda, random, dan plenger, tapi tetap tahu batas.',
      details: 'Jadilah sosok pengayom yang hangat, santai, dan membaur bersama seluruh anggota tanpa menciptakan jarak wibawa palsu.',
      iconName: 'smile',
      badge: 'KEHANGATAN',
    },
  ];

  // RAW TELEGRAM FORMAT TEXTS
  const rawMemberRulesTelegram = `𝐁𝐖𝐔 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋:
🖼 MEMBER RULES !! 

✯ONLY RP

✯Jika punya masalah tolong bahas di rc masing-masing

✯Dilarang keras untuk numnam!

✯Jangan kaitan urusan pribadi ke dalam cc

✯Dilarang membahas atau mengirim sticker berbau 18/21+

✯Toxic sewajarnya, bila berlebihan mohon untuk di spoiler

✯Saling menghargai sesama member, jangan kacang!!

✯Jika ingin keluar, tolong berikan alasan yang jelas, kirim melalui bot ch

✯Bila tidak nyaman dengan suasana cc, bisa memberi keluhan melalui bot ch`;

  const rawAdminRulesTelegram = `𝐁𝐖𝐔 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋:
🖼 ADMIN RULES !!

01. BE RESPONSIBLE
Admin wajib menjalankan tugas dengan tanggung jawab dan nggak menghilang saat sedang dibutuhkan.

2. NO FAVORITSM
Jangan membeda-bedakan member. Semua diperlakukan secara adil dan dihargai.

03. KEEP THE DEN SAFE
Jaga grup tetap nyaman. Jangan membiarkan bullying, penghinaan, atau masalah pribadi yang mengganggu member lain.

04. SOLVE, DON'T SPILL
Kalau ada masalah antar-member, selesaikan secara private terlebih dahulu. Jangan langsung membawa masalah ke publik.

05. NO POWER ABUSE
Jabatan admin bukan berarti bebas melakukan apa saja. Jangan menggunakan wewenang untuk kepentingan pribadi atau menjatuhkan member.

06. DISCUSS BEFORE DECIDING
Untuk keputusan penting seperti perubahan rules, kick, atau masalah besar, sebisa mungkin diskusikan dengan admin lain terlebih dahulu

07. KEEP IT FUN
Admin juga bagian dari circle. Boleh bercanda, random, dan plenger, tapi tetap tahu batas.`;

  const copyTelegramText = (type: 'member' | 'admin') => {
    const textToCopy = type === 'member' ? rawMemberRulesTelegram : rawAdminRulesTelegram;
    navigator.clipboard.writeText(textToCopy);
    setCopiedFormat(type);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  const rpGlossary = [
    { term: 'RP', full: 'Roleplay', meaning: 'Bermain peran menggunakan karakter atau persona fiksi dalam koridor narasi den.' },
    { term: 'RC', full: 'Room Chat (Private)', meaning: 'Obrolan jalur pribadi / DM antar-anggota untuk membahas urusan personal.' },
    { term: 'CC', full: 'Circle Chat (Public)', meaning: 'Grup obrolan publik komunitas tempat seluruh anggota berkumpul.' },
    { term: 'Numnam', full: 'Numpang Nama', meaning: 'Hanya masuk grup untuk memasang nama di daftar anggota tanpa pernah menyapa.' },
    { term: 'Kacang', full: 'Mengabaikan Pesan', meaning: 'Membiarkan pesan rekan den terabaikan tanpa respons yang menghargai.' },
    { term: 'Plenger', full: 'Bengong Santai / Absurd', meaning: 'Reaksi rileks saat obrolan bernuansa random tanpa perlu jaim atau tegang.' },
    { term: 'Spoiler', full: 'Sensor Teks Telegram', meaning: 'Format sensor ||teks|| Telegram untuk candaan yang agak kasar agar tetap aman.' },
    { term: 'Bot CH', full: 'Bot Channel Resmi', meaning: 'Layanan aduan dan izin pamit resmi untuk menjaga etika silaturahmi.' },
  ];

  const currentRules = activeTab === 'member' ? memberRules : adminRules;

 const handleSimulateBotSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!botMessage.trim()) return;

  await sendBotChReportToTelegram({
    actionType: botActionType,
    senderName: botSenderName,
    message: botMessage,
  });

  setBotSubmitted(true);
  setTimeout(() => {
    setBotSubmitted(false);
    setBotMessage('');
    setBotSenderName('');
    setBotModalOpen(false);
  }, 2200);
};

  return (
    <section id="rules" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#221812]/10">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#221812]/15">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[#B85829] flex items-center gap-2">
            <span>[PEDOMAN KELUARGA BESAR BWU]</span>
            <span aria-hidden="true">·</span>
            <span>CODEX DEN SANCTUARY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#221812] tracking-tight [text-wrap:balance]">
            Konstitusi & pedoman tertulis komunitas.
          </h2>
          <p className="text-sm sm:text-base text-[#5F4E42] leading-relaxed">
            Aturan ini disusun secara transparan untuk menjaga den tetap hangat, menghormati privasi antar-anggota, dan memastikan semua orang merasa dihargai.
          </p>
        </div>

        {/* Tab Switcher & Quick Copy Controls (Clean Segmented Toolbar) */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="inline-flex p-1 bg-[#F2EDE4] border border-[#221812]/15 rounded-md">
            <button
              type="button"
              onClick={() => setActiveTab('member')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
                activeTab === 'member'
                  ? 'bg-[#221812] text-[#F8F5F0]'
                  : 'text-[#5F4E42] hover:text-[#221812]'
              }`}
            >
              Member Rules (09)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-[#221812] text-[#F8F5F0]'
                  : 'text-[#5F4E42] hover:text-[#221812]'
              }`}
            >
              Admin Rules (07)
            </button>
          </div>

          <button
            type="button"
            onClick={() => copyTelegramText(activeTab)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#F2EDE4] text-[#221812] border border-[#221812]/15 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
            title="Salin pesan format resmi Telegram untuk broadcast"
          >
            {copiedFormat === activeTab ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#2B4533]" />
                <span className="text-[#2B4533]">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#B85829]" />
                <span>Salin Format TG</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Rules Codex Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {currentRules.map((rule) => (
          <div
            key={rule.number + rule.title}
            className="bg-white border border-[#221812]/15 p-6 flex flex-col justify-between hover:border-[#221812]/40 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#917F72] border-b border-[#221812]/10 pb-2">
                <span className="font-bold text-[#B85829]">RULE {rule.number}</span>
                <span className="uppercase">{rule.badge}</span>
              </div>

              <h3 className="font-display font-semibold text-lg text-[#221812] tracking-tight">
                {rule.title}
              </h3>

              <div className="p-2.5 bg-[#F8F5F0] border-l-2 border-[#221812] text-xs font-mono text-[#221812] leading-relaxed">
                “{rule.summary}”
              </div>

              <p className="text-xs text-[#5F4E42] leading-relaxed pt-1">
                {rule.details}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#221812]/10 flex items-center justify-between text-[11px] font-mono text-[#917F72]">
              <span>BWU CODEX // 2026</span>
              <span className="text-[#2B4533]">PENGAWASAN ADIL</span>
            </div>
          </div>
        ))}
      </div>

      {/* =========================================================================
          KAMUS ISTILAH ROLEPLAY TELEGRAM BWU (Editorial Reference Grid)
      ========================================================================= */}
      <div className="mb-14 p-6 sm:p-8 bg-[#F2EDE4] border border-[#221812]/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#221812]/15">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-[#221812] text-white flex items-center justify-center font-bold text-xs rounded-sm">
              <BookMarked className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B85829] block">
                GLOSARIUM RESMI TELEGRAM
              </span>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-[#221812]">
                Kamus Istilah Roleplay yang Wajib Diketahui
              </h3>
            </div>
          </div>
          <span className="text-xs font-mono text-[#5F4E42]">Panduan ramah pemula & member baru</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rpGlossary.map((item) => (
            <div key={item.term} className="p-4 bg-white border border-[#221812]/10">
              <div className="flex items-baseline justify-between mb-1 pb-1 border-b border-[#221812]/10">
                <span className="font-mono font-bold text-base text-[#221812]">{item.term}</span>
                <span className="text-[10px] font-mono uppercase text-[#917F72]">
                  {item.full}
                </span>
              </div>
              <p className="text-xs text-[#5F4E42] leading-relaxed pt-1">
                {item.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Row: Full Handbook & Bot CH Simulator */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#221812] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#3D2E24] transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Buka Buku Saku Konstitusi Lengkap</span>
        </button>

        <button
          type="button"
          onClick={() => document.getElementById('bot-ch')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-[#221812] border border-[#221812]/20 text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#F2EDE4] transition-colors cursor-pointer"
        >
          <Bot className="w-4 h-4 text-[#2B4533]" />
          <span>Simulasi Bot CH (Aduan & Izin Pamit)</span>
        </button>
      </div>

      {/* =========================================================================
          BOT CH SIMULATOR MODAL (Rules #08 & #09)
      ========================================================================= */}
      {botModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#221812]/75 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setBotModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-[#F8F5F0] border-2 border-[#221812] shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setBotModalOpen(false)}
              type="button"
              className="absolute top-4 right-4 p-1.5 text-[#221812] hover:bg-[#EBE4D8] transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#221812]/15">
              <span className="w-8 h-8 bg-[#2B4533] text-white flex items-center justify-center font-bold text-xs rounded-sm">
                <Bot className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#917F72] block">
                  Layanan Bantuan Resmi (Rules #08 & #09)
                </span>
                <h3 className="font-display font-semibold text-lg text-[#221812]">
                  BWU Official Bot CH
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#5F4E42] leading-relaxed mb-4">
              Sesuai aturan resmi nomor <strong>08</strong> dan <strong>09</strong>, Bot CH adalah sarana privat untuk menyampaikan keluhan suasana CC atau pengajuan pamit keluar dengan alasan yang jelas.
            </p>

            {/* Simulator Action Switcher */}
            <div className="p-1 bg-[#F2EDE4] border border-[#221812]/15 flex gap-1 mb-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setBotActionType('keluhan')}
                className={`flex-1 py-1.5 rounded-xs transition-colors cursor-pointer ${
                  botActionType === 'keluhan' ? 'bg-[#221812] text-white' : 'text-[#5F4E42]'
                }`}
              >
                09. Kirim Keluhan Suasana CC
              </button>
              <button
                type="button"
                onClick={() => setBotActionType('pamit')}
                className={`flex-1 py-1.5 rounded-xs transition-colors cursor-pointer ${
                  botActionType === 'pamit' ? 'bg-[#221812] text-white' : 'text-[#5F4E42]'
                }`}
              >
                08. Izin Pamit / Alasan Keluar
              </button>
            </div>

            {botSubmitted ? (
              <div className="p-5 bg-[#EBF2EC] text-center border border-[#2B4533]/30">
                <CheckCircle2 className="w-8 h-8 text-[#2B4533] mx-auto mb-2" />
                <h4 className="font-display font-semibold text-sm text-[#221812]">Laporan Diterima Bot CH BWU</h4>
                <p className="text-xs text-[#5F4E42] mt-1">
                  Staf akan menindaklanjuti secara privat sesuai prinsip <em>Solve, Don't Spill</em>. Terima kasih!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSimulateBotSubmit} className="space-y-3 mb-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#221812] mb-1">
                    Nama / Username Telegram
                  </label>
                  <input
                    type="text"
                    required
                    value={botSenderName}
                    onChange={(e) => setBotSenderName(e.target.value)}
                    placeholder="Contoh: @pengembara_rp atau Bram"
                    className="w-full px-3 py-2 bg-white border border-[#221812]/20 text-xs text-[#221812] focus:outline-none focus:border-[#B85829]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#221812] mb-1">
                    {botActionType === 'keluhan' ? 'Isi Keluhan atau Masukan Suasana CC:' : 'Alasan Jelas Mengajukan Keluar / Rehat:'}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={botMessage}
                    onChange={(e) => setBotMessage(e.target.value)}
                    placeholder={
                      botActionType === 'keluhan'
                        ? 'Ceritakan kendala atau ketidaknyamanan yang kamu rasakan...'
                        : 'Sampaikan alasanmu pamit (kesibukan dunia nyata, rehat roleplay, dsb)...'
                    }
                    className="w-full px-3 py-2 bg-white border border-[#221812]/20 text-xs text-[#221812] focus:outline-none focus:border-[#B85829]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#2B4533] hover:bg-[#1E3124] text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Pesan ke Bot CH Resmi</span>
                </button>
              </form>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-[#221812]/15 text-[11px] font-mono">
              <span className="text-[#917F72]">TERHUBUNG DENGAN TELEGRAM OFFICIAL</span>
              <a
                href="https://t.me/BearWithUsCommunity"
                target="_blank"
                rel="noreferrer"
                className="text-[#2AABEE] hover:underline font-semibold flex items-center gap-1"
              >
                Buka Link Langsung ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FULL RULES HANDBOOK MODAL
      ========================================================================= */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#221812]/75 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] bg-[#F8F5F0] border-2 border-[#221812] shadow-2xl p-6 sm:p-8 overflow-y-auto animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              type="button"
              className="absolute top-4 right-4 p-1.5 text-[#221812] hover:bg-[#EBE4D8] transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#221812]/15">
              <span className="w-8 h-8 bg-[#221812] text-white flex items-center justify-center font-bold text-xs rounded-sm">
                <FileText className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B85829] block">
                  DOKUMEN RESMI TERTULIS
                </span>
                <h3 className="font-display font-semibold text-2xl text-[#221812]">
                  Buku Saku Konstitusi Bear With Us
                </h3>
              </div>
            </div>

            <div className="space-y-8">
              {/* Section 1: Member Rules */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#221812]/15">
                  <h4 className="font-display font-semibold text-lg text-[#221812]">
                    PEDOMAN ANGGOTA (09 ATURAN RESMI)
                  </h4>
                  <button
                    type="button"
                    onClick={() => copyTelegramText('member')}
                    className="text-xs font-mono text-[#B85829] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Format TG</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {memberRules.map((r) => (
                    <div key={r.number} className="p-3.5 bg-white border border-[#221812]/10 text-xs">
                      <div className="flex items-center gap-2 mb-1 text-[11px] font-mono text-[#917F72]">
                        <span className="font-bold text-[#B85829]">RULE {r.number}</span>
                        <span>·</span>
                        <span className="text-[#221812] font-semibold">{r.title}</span>
                      </div>
                      <p className="text-[#5F4E42] leading-relaxed">{r.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Admin Rules */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#221812]/15">
                  <h4 className="font-display font-semibold text-lg text-[#221812]">
                    PEDOMAN PENGURUS & MODERATOR (07 ATURAN RESMI)
                  </h4>
                  <button
                    type="button"
                    onClick={() => copyTelegramText('admin')}
                    className="text-xs font-mono text-[#2B4533] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Format TG</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {adminRules.map((r) => (
                    <div key={r.number} className="p-3.5 bg-white border border-[#221812]/10 text-xs">
                      <div className="flex items-center gap-2 mb-1 text-[11px] font-mono text-[#917F72]">
                        <span className="font-bold text-[#2B4533]">ADMIN {r.number}</span>
                        <span>·</span>
                        <span className="text-[#221812] font-semibold">{r.title}</span>
                      </div>
                      <p className="text-[#5F4E42] leading-relaxed">{r.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#221812]/15 flex justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 bg-[#221812] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                Tutup Buku Saku
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
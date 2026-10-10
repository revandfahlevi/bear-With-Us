import React, { useState } from 'react';
import { PawIcon } from './PawIcon';
import { ArrowDown, Compass, Sparkles, MessageSquare, Copy, Check, X, Send } from 'lucide-react';
import heroImg from '../assets/images/hero_bear_cabin_forest_1790514579116.jpg';

interface HeroProps {
  onJoinClick: () => void;
  onDiscoverClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinClick, onDiscoverClick }) => {
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [copiedBroadcast, setCopiedBroadcast] = useState(false);

  const officialBroadcastText = `𝐁𝐖𝐔 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋:
🖼 ⚠️ 🆆🅰🆁🅽🅸🅽🅶 :


𝙲𝚄𝚃𝙸𝙴/𝙲𝙾𝙾𝙻 𝙺𝙸𝙳 𝙳𝙴𝚃𝙴𝙲𝚃𝙴𝙳 𝙸𝙽✰


🐻 🅑🅔🅐🅡 🅦🅘🅣🅗 🅤🅢 🐼



Bear With Us dibentuk pada 19 September sebagai sebuah ruang kecil untuk mempertemukan orang-orang dengan karakter dan kepribadian yang berbeda, tetapi memiliki satu tujuan yang sama: bersenang-senang, berbagi cerita, dan menciptakan kenangan bersama.



Terinspirasi dari We Bare Bears, kami percaya bahwa perbedaan bukanlah alasan untuk terpisah. Seperti Grizz, Panda, dan Ice Bear yang memiliki sifat berbeda tetapi tetap saling melengkapi, kami juga ingin menjadikan grup ini sebagai tempat untuk menjadi diri sendiri, bercanda tanpa batas, saling menghargai, dan saling menemani.



Di sini, nggak harus selalu serius. Boleh random, boleh plenger, boleh ketawa karena hal yang nggak jelas—yang penting tetap saling menghargai dan nggak gampang baper.




Different personalities, one little den.
Welcome to Bear With Us. 🐻🐼🐻‍❄️🤍



🅑🅨 : 🅑🅦🅤`;

  const copyBroadcast = () => {
    navigator.clipboard.writeText(officialBroadcastText);
    setCopiedBroadcast(true);
    setTimeout(() => setCopiedBroadcast(false), 2200);
  };

  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-[#EFE6DC]/60 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
          {/* Official Warning / Cutie Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5EFEB] border border-[#EFE6DC] rounded-full text-xs font-semibold text-[#D36B3D] shadow-xs hover:shadow-sm transition-all">
            <span className="text-base">⚠️</span>
            <span className="font-mono tracking-tight font-bold">
              🆆🅰🆁🅽🅸🅽🅶 : 𝙲𝚄𝚃𝙸𝙴/𝙲𝙾𝙾𝙻 𝙺𝙸𝙳 𝙳𝙴𝚃𝙴𝙲𝚃𝙴𝙳 𝙸𝙽✰
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2B2119] leading-[1.12] tracking-tight">
              Different personalities,{' '}
              <span className="text-[#D36B3D] underline decoration-[#D36B3D]/30 underline-offset-8">
                one little den.
              </span>
            </h1>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#7E6351]">
              🐻 🅑🅔🅐🅡 🅦🅘🅣🅗 🅤🅢 🐼 · EST. 19 SEPTEMBER
            </p>
          </div>

          <p className="text-base sm:text-lg text-[#543E30] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
            Dibentuk pada <strong>19 September</strong>, Bear With Us adalah ruang hangat bagi para pemain peran di Telegram. Terinspirasi dari <em>We Bare Bears</em>: boleh random, boleh plenger, ketawa tanpa jaim—yang penting saling menghargai dan nggak gampang baper!
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <button
              onClick={onJoinClick}
              type="button"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#2B2119] text-white text-sm font-semibold rounded-full hover:bg-[#D36B3D] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <PawIcon size={16} color="#ffffff" />
              <span>Daftar Masuk Den</span>
            </button>

            <button
              onClick={() => setBroadcastModalOpen(true)}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#F5EFEB] text-[#2B2119] text-sm font-semibold rounded-full border border-[#EFE6DC] shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D36B3D]" />
              <span>Lihat Siaran BWU</span>
            </button>

            <button
              onClick={onDiscoverClick}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-[#543E30] hover:text-[#2B2119] text-sm font-medium transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#D36B3D]" />
              <span>Telusuri Alur Kisah</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="pt-6 border-t border-[#EFE6DC] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#2B2119]">19.09</div>
              <div className="text-xs text-[#7E6351] font-medium mt-0.5">Hari Jadi Den</div>
            </div>
            <div className="border-l border-[#EFE6DC] pl-4">
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#D36B3D]">100%</div>
              <div className="text-xs text-[#7E6351] font-medium mt-0.5">Ramah & SFW</div>
            </div>
            <div className="border-l border-[#EFE6DC] pl-4">
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#2B2119]">9 / 7</div>
              <div className="text-xs text-[#7E6351] font-medium mt-0.5">Aturan Member & Admin</div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Frame (5 cols) */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Outer card shadow */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#2B2119]">
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={heroImg}
                  alt="Pondok Kayu Bear With Us di Hutan Pinus"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2119]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-semibold mb-1">
                    <PawIcon size={12} color="#ffffff" />
                    <span>Suaka Hutan Pinus BWU</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Pondok Perapian Utama
                  </h3>
                  <p className="text-xs text-[#EFE6DC]">
                    Tempat berkumpulnya tiga watak dan persahabatan hangat.
                  </p>
                </div>
              </div>

              {/* Floating Notice Card */}
              <div className="p-4 bg-white border-t border-[#EFE6DC] space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#7E6351]">
                  <span className="text-[#D36B3D] flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>BWU OFFICIAL DISPATCH</span>
                  </span>
                  <span>EST. 19 SEPT</span>
                </div>
                <p className="text-xs text-[#2B2119] font-medium leading-relaxed">
                  Welcome to Bear With Us. Boleh random, boleh plenger, ketawa tanpa batas! 🐻🐼🐻‍❄️🤍
                </p>
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setBroadcastModalOpen(true)}
                    className="text-xs font-bold text-[#D36B3D] hover:underline cursor-pointer"
                  >
                    Buka pesan siaran lengkap ↗
                  </button>
                  <span className="text-[11px] font-mono text-[#7E6351]">🅑🅨 : 🅑🅦🅤</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Telegram Broadcast Modal */}
      {broadcastModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setBroadcastModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 border border-[#EFE6DC]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setBroadcastModalOpen(false)}
              type="button"
              className="absolute top-4 right-4 p-2 text-[#7E6351] hover:text-[#2B2119] hover:bg-[#EFE6DC] rounded-full transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#EFE6DC]">
              <div className="w-10 h-10 rounded-full bg-[#2B2119] text-white flex items-center justify-center font-bold text-sm">
                🐻
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D36B3D]">
                  SIARAN RESMI KOMUNITAS
                </span>
                <h3 className="font-display font-bold text-xl text-[#2B2119]">
                  BWU OFFICIAL BROADCAST
                </h3>
              </div>
            </div>

            {/* Broadcast Text Box */}
            <div className="p-4 bg-white rounded-2xl border border-[#EFE6DC] font-mono text-xs text-[#2B2119] whitespace-pre-line leading-relaxed max-h-[50vh] overflow-y-auto mb-5 select-text shadow-inner">
              {officialBroadcastText}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={copyBroadcast}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2B2119] hover:bg-[#543E30] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
              >
                {copiedBroadcast ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Tersalin ke Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Pesan Siaran</span>
                  </>
                )}
              </button>

              <a
                href="https://t.me/BearWithUsCommunity"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2AABEE] hover:bg-[#2097D4] text-white text-xs font-semibold rounded-full transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Buka Telegram Komunitas</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

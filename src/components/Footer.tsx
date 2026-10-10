import React from 'react';
import { PawIcon } from './PawIcon';
import { Send, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2B2119] text-[#FAF7F2] pt-16 pb-12 border-t border-[#3E2B20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#2B2119] flex items-center justify-center font-bold text-xs shadow-sm">
                <PawIcon size={16} color="#2B2119" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                BEAR WITH US
              </span>
              <span className="text-[11px] font-mono text-[#D8CCC0] border-l border-white/20 pl-2">
                EST. 19 SEPT
              </span>
            </div>
            <p className="text-sm text-[#EFE6DC] italic font-medium">
              “Different personalities, one little den.”
            </p>
            <p className="text-xs text-[#A8988B] leading-relaxed max-w-sm">
              Ruang kecil untuk mempertemukan karakter yang berbeda demi bersenang-senang, berbagi cerita, dan menciptakan kenangan bersama di semesta Telegram Roleplay.
            </p>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#D36B3D]">
              Navigasi Komunitas
            </div>
            <ul className="space-y-2 text-xs text-[#EFE6DC]">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Beranda</a>
              </li>
              <li>
                <a href="#scrollytelling" className="hover:text-white transition-colors">Kisah & Lore Kami</a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">Dewan Beruang</a>
              </li>
              <li>
                <a href="#why-join" className="hover:text-white transition-colors">Keunggulan Den</a>
              </li>
              <li>
                <a href="#rules" className="hover:text-white transition-colors">Aturan Member & Admin</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Arsip Visual</a>
              </li>
            </ul>
          </div>

          {/* Connect & Telegram Channel (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#D36B3D]">
              Portal Resmi Telegram
            </div>
            <p className="text-xs text-[#A8988B] leading-relaxed">
              Bergabung langsung ke kanal siaran dan ruang chat utama kami di Telegram untuk terhubung dengan kawan den.
            </p>
            <div className="pt-1">
              <a
                href="https://t.me/+Z-4ZvjCMtbs4MDBh"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2AABEE] hover:bg-[#2097D4] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Buka Telegram Resmi ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8988B]">
          <div>
            © 2026 BEAR WITH US. DIBENTUK PADA 19 SEPTEMBER. 🅑🅨 : 🅑🅦🅤.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-[#EFE6DC] hover:text-white transition-colors cursor-pointer"
          >
            <span>KEMBALI KE ATAS</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

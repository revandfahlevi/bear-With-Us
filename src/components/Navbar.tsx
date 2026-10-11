import React, { useState, useEffect } from 'react';
import { PawIcon } from './PawIcon';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onJoinClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onJoinClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Kisah Kami', href: '#scrollytelling' },
    { label: 'Dewan Beruang', href: '#team' },
    { label: 'Keunggulan', href: '#why-join' },
    { label: 'Konstitusi & Aturan', href: '#rules' },
    { label: 'Galeri Arsip', href: '#gallery' },
    { label: 'Keluh & Pamit', href: '#bot-ch' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#F8F5F0]/95 backdrop-blur-md border-b border-[#221812]/10 py-3 shadow-xs'
          : 'bg-transparent py-5 border-b border-[#221812]/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2.5 group"
          >
            <span className="w-7 h-7 rounded-sm bg-[#221812] text-[#F8F5F0] flex items-center justify-center transition-transform group-hover:rotate-6">
              <PawIcon size={14} color="#F8F5F0" />
            </span>
            <span className="font-display font-semibold text-lg sm:text-xl tracking-tight text-[#221812]">
              BEAR WITH US
            </span>
            <span className="hidden 2xl:inline text-[11px] font-mono uppercase tracking-widest text-[#917F72] border-l border-[#221812]/15 pl-2.5">
              EST. 19 SEPT
            </span>
          </a>

          {/* Zone 2: Navigation Links (Clean text links with hover underline) */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs font-semibold uppercase tracking-wider text-[#5F4E42] hover:text-[#221812] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#B85829] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onJoinClick}
              type="button"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#F8F5F0] bg-[#221812] hover:bg-[#3D2E24] rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Daftar Masuk Den</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#221812] hover:bg-[#EBE4D8] rounded-md transition-colors cursor-pointer"
              aria-label="Buka menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 p-4 max-h-[75vh] overflow-y-auto bg-[#F8F5F0] border border-[#221812]/15 rounded-lg shadow-md animate-in fade-in duration-150">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#221812] hover:bg-[#F2EDE4] rounded transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-[#221812]/10 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onJoinClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#F8F5F0] bg-[#221812] rounded-md"
                >
                  <span>Daftar Masuk Den Telegram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
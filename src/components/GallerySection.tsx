import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { PawIcon } from './PawIcon';
import { X, ZoomIn, ArrowUpRight } from 'lucide-react';
import unoImg from '../assets/images/gallery-uno.jpg';
import voiceChatImg from '../assets/images/gallery-voice-chat.jpg';
import welcomeImg from '../assets/images/gallery-welcome.jpg';
import chatImg from '../assets/images/gallery-chat.jpg';

export const GallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'item-1',
      title: 'Malam Main UNO Bareng',
      category: 'Acara',
      image: unoImg,
      description:
        'Seru-seruan main UNO langsung di Telegram lewat bot game. Tiap pemain punya giliran, saling jegal kartu, dan tertawa bareng. UNO hanya salah satu dari banyak game yang sering kami mainkan di den.',
      date: 'Sesi Game',
      tag: 'Game Bareng',
    },
    {
      id: 'item-2',
      title: "Obrolan Video, Musik & Who's the Spy",
      category: 'Acara',
      image: voiceChatImg,
      description:
        "Ngumpul di obrolan video grup sambil mendengarkan musik dari bot, lalu lanjut main game seperti Who's the Spy. Boleh ikut ngobrol, boleh juga cukup mendengarkan sambil santai.",
      date: 'Sesi Obrolan Video',
      tag: 'Obrolan Video',
    },
    {
      id: 'item-3',
      title: 'Sambutan Hangat untuk Anggota Baru',
      category: 'Obrolan',
      image: welcomeImg,
      description:
        'Setiap anggota baru disambut ramai-ramai: admin dan member menyapa, bahkan ada GIF sambutan. Di sini tidak ada yang dikacangin.',
      date: 'Penyambutan Member',
      tag: 'Welcome',
    },
    {
      id: 'item-4',
      title: 'Canda Tawa di Circle Chat',
      category: 'Obrolan',
      image: chatImg,
      description:
        'Obrolan CC yang random dan penuh canda. Saling bales, saling bercanda, tanpa jaim dan tanpa drama.',
      date: 'Keseharian Den',
      tag: 'Obrolan CC',
    },
  ];

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-12 sm:mb-16 text-center mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5EFEB] border border-[#EFE6DC] text-xs font-semibold text-[#D36B3D] mb-3">
          <PawIcon size={14} color="#D36B3D" />
          <span>ARSIP VISUAL & CUPLIKAN</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2B2119] tracking-tight">
          Galeri Suasana Den
        </h2>
        <p className="mt-3 text-base text-[#543E30] leading-relaxed max-w-2xl mx-auto">
          Cuplikan keseruan den: dari game bareng, obrolan video, sambutan untuk member baru, hingga canda tawa di Telegram.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer bg-white rounded-3xl border border-[#EFE6DC] p-3.5 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
          >
            <div>
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#2B2119] mb-3">
                {item.image === 'chat-mock' ? (
                  <div className="w-full h-full bg-[#1F2937] p-3 text-xs text-white font-mono flex flex-col justify-center space-y-2 select-none group-hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                      <span>● BWU Official Lounge</span>
                    </div>
                    <div className="p-2 bg-white/10 rounded-xl text-[11px]">
                      <span className="text-amber-300">Grizz:</span> Malam ini ada yang mau seduh teh bareng? ☕
                    </div>
                    <div className="p-2 bg-white/10 rounded-xl text-[11px]">
                      <span className="text-sky-300">Panda:</span> Hadir! Boleh random kan ya?
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-[#2B2119]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 bg-white text-[#2B2119] rounded-full shadow-md">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <div className="px-1.5">
                <span className="inline-block px-2.5 py-0.5 bg-[#FAF7F2] text-[#D36B3D] text-[10px] font-bold rounded-full mb-1">
                  {item.category}
                </span>
                <h3 className="font-display font-bold text-base text-[#2B2119] mb-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#7E6351] leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-[#EFE6DC] flex items-center justify-between text-xs text-[#7E6351] px-1.5">
              <span>{item.date}</span>
              <span className="text-[#D36B3D] font-bold flex items-center gap-0.5">
                Buka <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#FAF7F2] rounded-3xl border border-[#EFE6DC] shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              type="button"
              className="absolute top-4 right-4 p-2 text-[#7E6351] hover:text-[#2B2119] hover:bg-[#EFE6DC] rounded-full transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-[50vh] rounded-2xl overflow-hidden bg-black mb-4 border border-[#EFE6DC]">
              {selectedItem.image === 'chat-mock' ? (
                <div className="w-full h-full bg-[#111827] p-6 text-sm text-white font-mono flex flex-col justify-center space-y-3">
                  <div className="text-emerald-400 text-xs">● Suasana Den Roleplay Telegram (SFW)</div>
                  <div className="p-3 bg-white/10 rounded-xl">
                    <strong className="text-amber-300">Grizz:</strong> Selamat datang pengembara baru! Duduk santai dekat perapian ya! 🐻
                  </div>
                  <div className="p-3 bg-white/10 rounded-xl">
                    <strong className="text-sky-300">Panda:</strong> Jangan sungkan nimbrung, di sini bebas berekspresi tanpa jaim!
                  </div>
                  <div className="p-3 bg-white/10 rounded-xl">
                    <strong className="text-slate-300">Ice Bear:</strong> Ice Bear menyetujui. Teh hangat sudah siap.
                  </div>
                </div>
              ) : (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <h3 className="font-display font-bold text-xl text-[#2B2119] mb-2">
              {selectedItem.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#543E30] leading-relaxed">
              {selectedItem.description}
            </p>

            <div className="pt-4 mt-4 border-t border-[#EFE6DC] flex items-center justify-between text-xs font-semibold text-[#7E6351]">
              <span>LABEL: {selectedItem.tag}</span>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="text-[#D36B3D] font-bold hover:underline cursor-pointer"
              >
                Tutup Arsip
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
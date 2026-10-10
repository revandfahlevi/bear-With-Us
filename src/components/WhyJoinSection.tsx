import React from 'react';
import { motion } from 'framer-motion';
import { PawIcon } from './PawIcon';
import { Users, Calendar, MessageSquare, ShieldCheck, Check } from 'lucide-react';

export const WhyJoinSection: React.FC = () => {
  return (
    <section id="why-join" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#221812]/10">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="text-xs font-mono uppercase tracking-widest text-[#B85829] flex items-center gap-2 mb-2">
          <span>[KODE ETIK & NILAI UTAMA]</span>
          <span aria-hidden="true">·</span>
          <span>THE FOUR PILLARS</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#221812] tracking-tight [text-wrap:balance]">
          Empat komitmen suaka yang menjadikan den ini terasa seperti rumah.
        </h2>
        <p className="mt-3 text-base text-[#5F4E42] leading-relaxed max-w-2xl font-normal">
          Kami merawat ruang ini dengan standar tinggi agar setiap pengembara peran merasa aman, didengarkan, dan memiliki panggung untuk berkarya tanpa rasa takut dihakimi.
        </p>
      </div>

      {/* Asymmetric Editorial Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Marquee Primary Pillar (Spans 7 cols) */}
        <motion.div
          whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
          whileTap={{ scale: 0.995 }}
          className="lg:col-span-7 bg-[#F2EDE4] border border-[#221812]/15 p-6 sm:p-9 flex flex-col justify-between transition-shadow duration-300 hover:shadow-xl hover:border-[#221812]/35"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#917F72] border-b border-[#221812]/10 pb-3">
              <span className="text-[#B85829] font-bold">PILAR 01 · BUDAYA INKLUSIF</span>
              <span>500+ PENGEMBARA</span>
            </div>

            <div className="flex items-start gap-4 pt-2">
              <span className="w-10 h-10 bg-[#221812] text-[#F8F5F0] flex items-center justify-center shrink-0 rounded-sm shadow-xs transition-transform duration-200 group-hover:scale-105">
                <Users className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-display text-2xl text-[#221812] font-semibold">
                  Komunitas Ramah, Terbuka & Bebas Kasta Senioritas
                </h3>
                <p className="text-xs font-mono text-[#B85829] mt-0.5">
                  Setiap pendatang baru disambut layaknya kawan lama.
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#5F4E42] leading-relaxed pt-2">
              Di Bear With Us, tidak ada jurang pemisah antara member lama dan pendatang baru. Tidak ada kelompok eksklusif yang saling mengabaikan pesan orang lain. Baik ini adalah hari pertamamu menulis roleplay atau tahun kesepuluhmu, kamu memiliki hak bersuara dan ruang bercengkerama yang setara.
            </p>

            <blockquote className="border-l-2 border-[#B85829] pl-4 py-1 text-xs sm:text-sm italic text-[#221812] bg-white/60">
              “Seperti We Bare Bears, watak kami beragam tetapi tetap duduk semeja di dekat perapian yang sama.”
            </blockquote>
          </div>

          <div className="pt-6 mt-6 border-t border-[#221812]/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#5F4E42]">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#2B4533]" />
              <span>Pendampingan Member Baru</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#2B4533]" />
              <span>Nol Toleransi Pengabaian Pesan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#2B4533]" />
              <span>Bebas Drama Personal di CC</span>
            </div>
          </div>
        </motion.div>

        {/* Pillar 02: Event & Prompt Festival (Spans 5 cols) */}
        <motion.div
          whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
          whileTap={{ scale: 0.995 }}
          className="lg:col-span-5 bg-white border border-[#221812]/15 p-6 sm:p-8 flex flex-col justify-between transition-shadow duration-300 hover:shadow-xl hover:border-[#221812]/35"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#917F72] border-b border-[#221812]/10 pb-3">
              <span className="text-[#B85829] font-bold">PILAR 02 · AKTIVITAS</span>
              <span>BANYAK PILIHAN GAME</span>
            </div>

            <div className="flex items-start gap-3 pt-1">
              <span className="w-9 h-9 bg-[#F2EDE4] text-[#221812] flex items-center justify-center shrink-0 rounded-sm border border-[#221812]/10 shadow-xs">
                <Calendar className="w-4 h-4 text-[#B85829]" />
              </span>
              <div>
                <h3 className="font-display text-xl text-[#221812] font-semibold">
                  Game Bareng, Voice Chat & Sambutan Hangat
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5F4E42] leading-relaxed">
              Di den selalu ada yang seru untuk dilakukan bersama: main game lewat bot Telegram seperti UNO dan Who's the Spy (dan masih banyak game lainnya), ngumpul di obrolan video sambil mendengarkan musik, hingga menyambut anggota baru ramai-ramai supaya langsung betah.
            </p>
          </div>

          <div className="pt-4 border-t border-[#221812]/10 text-xs font-mono text-[#917F72] space-y-1.5">
            <div>· Banyak Game Bareng (UNO, Who's the Spy, dll.)</div>
            <div>· Voice Chat & Musik Bareng</div>
            <div>· Sambutan Hangat Member Baru</div>
          </div>
        </motion.div>

        {/* Pillar 03: Ruang Chat Santai & Hidup (Spans 6 cols) */}
        <motion.div
          whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
          whileTap={{ scale: 0.995 }}
          className="lg:col-span-6 bg-white border border-[#221812]/15 p-6 sm:p-8 flex flex-col justify-between transition-shadow duration-300 hover:shadow-xl hover:border-[#221812]/35"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#917F72] border-b border-[#221812]/10 pb-3">
              <span className="text-[#B85829] font-bold">PILAR 03 · DINAMIKA OBROLAN</span>
              <span>24 JAM NON-STOP</span>
            </div>

            <div className="flex items-start gap-3 pt-1">
              <span className="w-9 h-9 bg-[#F2EDE4] text-[#221812] flex items-center justify-center shrink-0 rounded-sm border border-[#221812]/10 shadow-xs">
                <MessageSquare className="w-4 h-4 text-[#2B4533]" />
              </span>
              <div>
                <h3 className="font-display text-xl text-[#221812] font-semibold">
                  Lounge OOC Bernyawa & Penuh Tawa
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5F4E42] leading-relaxed">
              Obrolan di den mengalir dengan hangat. Mulai dari curhat santai usai kuliah atau kantor, diskusi musik, rekomendasi teh hangat, hingga candaan spontan yang tidak perlu jaim.
            </p>
          </div>

          <div className="pt-4 border-t border-[#221812]/10 text-xs font-mono text-[#917F72] space-y-1.5">
            <div>· Boleh Random, Boleh Plenger</div>
            <div>· Saling Menghibur Tanpa Baper</div>
            <div>· Suasana Rileks Melepas Penat</div>
          </div>
        </motion.div>

        {/* Pillar 04: Aturan Transparan & Mediasi Adil (Spans 6 cols) */}
        <motion.div
          whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
          whileTap={{ scale: 0.995 }}
          className="lg:col-span-6 bg-white border border-[#221812]/15 p-6 sm:p-8 flex flex-col justify-between transition-shadow duration-300 hover:shadow-xl hover:border-[#221812]/35"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#917F72] border-b border-[#221812]/10 pb-3">
              <span className="text-[#B85829] font-bold">PILAR 04 · KEAMANAN DEN</span>
              <span>100% STRICT SFW</span>
            </div>

            <div className="flex items-start gap-3 pt-1">
              <span className="w-9 h-9 bg-[#F2EDE4] text-[#221812] flex items-center justify-center shrink-0 rounded-sm border border-[#221812]/10 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#2B4533]" />
              </span>
              <div>
                <h3 className="font-display text-xl text-[#221812] font-semibold">
                  Prinsip "Solve, Don't Spill" & Bot CH Resmi
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5F4E42] leading-relaxed">
              Masalah personal diselesaikan di Room Chat (RC) masing-masing atau melalui Bot CH. Admin terikat aturan ketat tanpa pilih kasih untuk melindungi ketenangan seluruh anggota.
            </p>
          </div>

          <div className="pt-4 border-t border-[#221812]/10 text-xs font-mono text-[#917F72] space-y-1.5">
            <div>· Mediasi Terbuka & Rahasia</div>
            <div>· Perlindungan Privasi Anggota</div>
            <div>· Nol Toleransi Konten Vulgar / 18+</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
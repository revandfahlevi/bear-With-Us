import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PawIcon } from './PawIcon';
import {
  Trees,
  Sun,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Sparkles,
  Heart,
} from 'lucide-react';
import heroImg from '../assets/images/hero_bear_cabin_forest_1790514579116.jpg';
import cabinImg from '../assets/images/cabin_cozy_hearth_1790514594991.jpg';
import sunsetImg from '../assets/images/sunset_bear_hills_1790514609625.jpg';

export const ScrollyStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [copiedLore, setCopiedLore] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.33) {
        setCurrentChapter(0);
      } else if (latest < 0.68) {
        setCurrentChapter(1);
      } else {
        setCurrentChapter(2);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToChapter = (chapterIndex: number) => {
    if (!containerRef.current) return;
    const clampedIndex = Math.max(0, Math.min(2, chapterIndex));
    const containerTop = containerRef.current.offsetTop;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (clampedIndex * 0.38) * totalHeight;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  const copyLoreText = () => {
    const text = `⚠️ 🆆🅰🆁🅽🅸🅽🅶 : 𝙲𝚄𝚃𝙸𝙴/𝙲𝙾𝙾𝙻 𝙺𝙸𝙳 𝙳𝙴𝚃𝙴𝙲𝚃𝙴𝙳 𝙸𝙽✰
🐻 🅑🅔🅐🅡 🅦🅘🅣🅗 🅤🅢 🐼

Bear With Us dibentuk pada 19 September sebagai sebuah ruang kecil untuk mempertemukan orang-orang dengan karakter dan kepribadian yang berbeda, tetapi memiliki satu tujuan yang sama: bersenang-senang, berbagi cerita, dan menciptakan kenangan bersama.

Terinspirasi dari We Bare Bears, kami percaya bahwa perbedaan bukanlah alasan untuk terpisah. Seperti Grizz, Panda, dan Ice Bear yang memiliki sifat berbeda tetapi tetap saling melengkapi, kami juga ingin menjadikan grup ini sebagai tempat untuk menjadi diri sendiri, bercanda tanpa batas, saling menghargai, dan saling menemani.

Di sini, nggak harus selalu serius. Boleh random, boleh plenger, boleh ketawa karena hal yang nggak jelas—yang penting tetap saling menghargai dan nggak gampang baper.

Different personalities, one little den.
Welcome to Bear With Us. 🐻🐼🐻‍❄️🤍
🅑🅨 : 🅑🅦🅤`;

    navigator.clipboard.writeText(text);
    setCopiedLore(true);
    setTimeout(() => setCopiedLore(false), 2200);
  };

  // Scene animations
  const scene1Opacity = useTransform(smoothProgress, [0, 0.28, 0.36], [1, 1, 0]);
  const scene1Scale = useTransform(smoothProgress, [0, 0.35], [1, 1.05]);
  const scene1TreeLeftX = useTransform(smoothProgress, [0, 0.35], [0, -60]);
  const scene1TreeRightX = useTransform(smoothProgress, [0, 0.35], [0, 60]);

  const scene2Opacity = useTransform(smoothProgress, [0.30, 0.38, 0.64, 0.72], [0, 1, 1, 0]);
  const scene2Scale = useTransform(smoothProgress, [0.32, 0.68], [0.98, 1.02]);
  const scene2Y = useTransform(smoothProgress, [0.30, 0.40], [30, 0]);

  const scene3Opacity = useTransform(smoothProgress, [0.65, 0.73, 1], [0, 1, 1]);
  const scene3Y = useTransform(smoothProgress, [0.65, 0.74], [40, 0]);

  const progressBarWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="scrollytelling"
      ref={containerRef}
      className="relative h-[340vh] bg-[#FAF7F2] border-b border-[#EFE6DC]"
    >
      {/* Sticky Stage */}
      <div className="sticky top-0 h-screen min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between">
        
        {/* HUD Navigation */}
        <div className="relative z-30 pt-16 sm:pt-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:p-4 bg-[#FAF7F2]/95 backdrop-blur-md rounded-2xl border border-[#EFE6DC] shadow-sm">
            
            {/* Left: Phase Title */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="w-8 h-8 rounded-full bg-[#2B2119] text-white flex items-center justify-center font-bold text-xs shrink-0">
                0{currentChapter + 1}
              </span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#D36B3D]">
                  LORE BEAR WITH US
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-[#2B2119]">
                  {currentChapter === 0 && 'Babak I: Gerbang Hutan Rimba & Sambutan Den'}
                  {currentChapter === 1 && 'Babak II: Di Balik Perapian Kabin (Filosofi We Bare Bears)'}
                  {currentChapter === 2 && 'Babak III: Tiga Watak Sahabat (Different Personalities)'}
                </h3>
              </div>
            </div>

            {/* Right: Step Switcher */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <button
                type="button"
                onClick={() => scrollToChapter(currentChapter - 1)}
                disabled={currentChapter === 0}
                className="p-2 rounded-xl border border-[#EFE6DC] bg-white disabled:opacity-30 text-[#2B2119] hover:bg-[#F5EFEB] cursor-pointer disabled:cursor-not-allowed transition-colors"
                title="Babak Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex gap-1.5">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToChapter(idx)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      currentChapter === idx
                        ? 'bg-[#2B2119] text-white shadow-sm'
                        : 'bg-white text-[#7E6351] border border-[#EFE6DC] hover:bg-[#F5EFEB]'
                    }`}
                  >
                    Babak 0{idx + 1}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollToChapter(currentChapter + 1)}
                disabled={currentChapter === 2}
                className="p-2 rounded-xl border border-[#EFE6DC] bg-white disabled:opacity-30 text-[#2B2119] hover:bg-[#F5EFEB] cursor-pointer disabled:cursor-not-allowed transition-colors"
                title="Babak Selanjutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Minimalist Progress Line with Paw Marker */}
          <div className="relative w-full bg-[#EFE6DC] h-1.5 rounded-full mt-2 overflow-hidden">
            <motion.div
              style={{ width: progressBarWidth }}
              className="h-full bg-gradient-to-r from-[#D36B3D] to-[#B95328] rounded-full"
            />
          </div>
        </div>

        {/* Dynamic Center Stage */}
        <div className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-center">

          {/* SCENE 1: GERBANG HUTAN RIMBA */}
          <motion.div
            style={{ opacity: scene1Opacity, scale: scene1Scale }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto p-4"
          >
            <motion.div
              style={{ x: scene1TreeLeftX }}
              className="absolute left-0 top-1/4 opacity-20 pointer-events-none text-[#2B2119]"
            >
              <Trees className="w-48 h-48 sm:w-72 sm:h-72" />
            </motion.div>
            <motion.div
              style={{ x: scene1TreeRightX }}
              className="absolute right-0 bottom-1/4 opacity-20 pointer-events-none text-[#2B2119]"
            >
              <Trees className="w-48 h-48 sm:w-72 sm:h-72" />
            </motion.div>

            <div className="relative max-w-2xl w-full bg-white/90 backdrop-blur-md border border-[#EFE6DC] rounded-3xl p-6 sm:p-10 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EFEB] text-[#D36B3D] text-xs font-semibold mb-4">
                <PawIcon size={12} color="#D36B3D" />
                <span>BABAK 01 // SUAKA RIMBA</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2B2119] tracking-tight mb-4">
                Pintu gerbang yang selalu terbuka bagi setiap pengembara.
              </h2>

              <p className="text-base text-[#543E30] leading-relaxed mb-6 font-normal">
                Rimba di luar sana mungkin penuh dengan kesibukan dan rutinitas melelahkan. Namun saat melintasi batas suaka <strong>Bear With Us</strong>, langkah kakimu melambat. Udara dipenuhi aroma kayu pinus dan secangkir teh hangat menanti di dekat tungku perapian.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[#EFE6DC] text-xs font-semibold text-[#7E6351]">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-[#D36B3D]" />
                  <span>SUASANA HANGAT & BERSAHABAT</span>
                </div>
                <span>GULIR KE BAWAH ↓</span>
              </div>
            </div>
          </motion.div>

          {/* SCENE 2: PONDOK KABIN & KISAH 19 SEPTEMBER */}
          <motion.div
            style={{ opacity: scene2Opacity, scale: scene2Scale, y: scene2Y }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto p-4"
          >
            <div className="relative max-w-3xl w-full bg-white rounded-3xl border border-[#EFE6DC] p-6 sm:p-9 shadow-2xl max-h-[82vh] overflow-y-auto">
              {/* Warning Header */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EFE6DC] mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="font-mono text-xs font-bold text-[#D36B3D]">
                  ⚠️ 🆆🅰🆁🅽🅸🅽🅶 : 𝙲𝚄𝚃𝙸𝙴/𝙲𝙾𝙾𝙻 𝙺𝙸𝙳 𝙳𝙴𝚃𝙴𝙲𝚃𝙴𝙳 𝙸𝙽✰
                </div>
                <div className="text-xs font-semibold text-[#7E6351]">
                  EST. 19 SEPTEMBER
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2B2119]">
                  <span>🐻 🅑🅔🅐🅡 🅦🅘🅣🅗 🅤🅢 🐼</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-3 text-sm text-[#543E30] leading-relaxed">
                    <p>
                      <strong>Bear With Us</strong> dibentuk pada <strong>19 September</strong> sebagai sebuah ruang kecil untuk mempertemukan orang-orang dengan karakter dan kepribadian yang berbeda, tetapi memiliki satu tujuan yang sama: bersenang-senang, berbagi cerita, dan menciptakan kenangan bersama.
                    </p>
                    <p>
                      Terinspirasi dari <strong>We Bare Bears</strong>, kami percaya bahwa perbedaan bukanlah alasan untuk terpisah. Seperti <em>Grizz, Panda, dan Ice Bear</em> yang memiliki sifat berbeda tetapi tetap saling melengkapi.
                    </p>
                    <p className="p-3 bg-[#F5EFEB] rounded-xl border-l-4 border-[#D36B3D] text-[#2B2119] italic text-xs sm:text-sm">
                      “Di sini, nggak harus selalu serius. Boleh random, boleh plenger, boleh ketawa karena hal yang nggak jelas—yang penting tetap saling menghargai dan nggak gampang baper.”
                    </p>
                  </div>

                  <div className="md:col-span-5">
                    <div className="rounded-2xl overflow-hidden shadow-md aspect-4/3">
                      <img
                        src={cabinImg}
                        alt="Perapian Hangat Den"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center mt-2">
                      <p className="text-xs font-bold text-[#2B2119]">Different personalities, one little den.</p>
                      <p className="text-[11px] text-[#7E6351]">Welcome to Bear With Us. 🐻🐼🐻‍❄️🤍</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EFE6DC] flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={copyLoreText}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2B2119] hover:bg-[#D36B3D] text-white rounded-full transition-colors cursor-pointer font-medium"
                  >
                    {copiedLore ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Lore BWU</span>
                      </>
                    )}
                  </button>
                  <span className="font-bold text-[#7E6351]">🅑🅨 : 🅑🅦🅤</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SCENE 3: TIGA WATAK BERUANG */}
          <motion.div
            style={{ opacity: scene3Opacity, y: scene3Y }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto p-4"
          >
            <div className="relative max-w-4xl w-full bg-[#FAF7F2] rounded-3xl border border-[#EFE6DC] p-6 sm:p-9 shadow-2xl max-h-[84vh] overflow-y-auto">
              <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D36B3D]">
                  INSPIRASI WE BARE BEARS
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2B2119]">
                  Tiga Watak Sahabat di Bawah Satu Atap
                </h2>
                <p className="text-xs sm:text-sm text-[#543E30] mt-1">
                  Different personalities, one little den.
                </p>
              </div>

              {/* 3 Bear Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-5 border border-[#EFE6DC] shadow-sm text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-2xl flex items-center justify-center mx-auto">
                    🐻
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#2B2119]">Grizzly</h3>
                  <div className="text-xs font-semibold text-[#D36B3D]">Hangat & Spontan</div>
                  <p className="text-xs text-[#543E30] leading-relaxed">
                    Pemecah kebekuan yang merangkul siapa saja. Boleh random, boleh tertawa lepas tanpa jaim.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#EFE6DC] shadow-sm text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-sky-100 text-2xl flex items-center justify-center mx-auto">
                    🐼
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#2B2119]">Panda</h3>
                  <div className="text-xs font-semibold text-[#D36B3D]">Kreatif & Penuh Empati</div>
                  <p className="text-xs text-[#543E30] leading-relaxed">
                    Peka terhadap sesama. Tidak kacang, selalu mendengarkan keluhan, dan merajut kisah imajinatif.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#EFE6DC] shadow-sm text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-2xl flex items-center justify-center mx-auto">
                    🐻‍❄️
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#2B2119]">Ice Bear</h3>
                  <div className="text-xs font-semibold text-[#D36B3D]">Tenang & Andal</div>
                  <p className="text-xs text-[#543E30] leading-relaxed">
                    Kepala dingin yang menjaga ketertiban. Selesaikan masalah privat tanpa spill, adil tanpa pilih kasih.
                  </p>
                </div>
              </div>

              <div className="text-center pt-2">
                <a
                  href="#team"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#2B2119] hover:bg-[#D36B3D] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md transition-colors"
                >
                  <span>Kenali Dewan Beruang BWU</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <div className="relative z-30 pb-4 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToChapter(idx)}
                className={`h-2 transition-all cursor-pointer rounded-full ${
                  currentChapter === idx ? 'w-8 bg-[#2B2119]' : 'w-2 bg-[#EFE6DC] hover:bg-[#7E6351]'
                }`}
                title={`Babak 0${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

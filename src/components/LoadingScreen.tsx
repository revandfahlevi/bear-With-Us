import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PawIcon } from './PawIcon';

interface LoadingScreenProps {
  onDone: () => void;
}

const TITLE = 'BEAR WITH US'.split('');
const PAW_COUNT = 6;
const MIN_DURATION_MS = 2400; // waktu minimal loading screen tampil
const MAX_WAIT_MS = 8000; // batas aman kalau ada aset yang lambat

const getStatus = (p: number) => {
  if (p >= 100) return 'Selamat datang, pengembara!';
  if (p >= 65) return 'Membuka pintu den...';
  if (p >= 30) return 'Menyeduh teh hangat...';
  return 'Menyalakan perapian...';
};

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onDone }) => {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  // Kunci scroll selama loading
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Progress: mengikuti waktu minimal, dan baru 100% setelah halaman selesai dimuat
  useEffect(() => {
    const duration = reduceMotion ? 800 : MIN_DURATION_MS;
    const start = performance.now();
    let loaded = document.readyState === 'complete';
    let finished = false;
    let raf = 0;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;

    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener('load', onLoad);
    const safety = setTimeout(() => {
      loaded = true;
    }, MAX_WAIT_MS);

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const cap = loaded ? 100 : 92;
      const value = Math.min(eased * 100, cap);
      setProgress(value);

      if (value >= 100 && !finished) {
        finished = true;
        doneTimer = setTimeout(() => onDoneRef.current(), 450);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      if (doneTimer) clearTimeout(doneTimer);
      window.removeEventListener('load', onLoad);
    };
  }, [reduceMotion]);

  const percent = Math.round(progress);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Memuat halaman"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F8F5F0] text-[#221812] select-none"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Label sudut */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 text-[11px] font-mono uppercase tracking-widest text-[#917F72]">
        [MEMUAT DEN]
      </div>
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 text-[11px] font-mono uppercase tracking-widest text-[#917F72]">
        EST. 19 SEPT
      </div>

      {/* Logo dengan cincin berdenyut */}
      <div className="relative w-24 h-24 flex items-center justify-center mb-8">
        {!reduceMotion &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-full border border-[#B85829]/40"
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 2.1, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 1, ease: 'easeOut' }}
            />
          ))}
        <motion.div
          className="relative w-16 h-16 rounded-md bg-[#221812] flex items-center justify-center shadow-lg"
          initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16 }}
        >
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex"
          >
            <PawIcon size={34} color="#F8F5F0" />
          </motion.span>
        </motion.div>
      </div>

      {/* Judul huruf demi huruf */}
      <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight flex" aria-hidden="true">
        {TITLE.map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </h1>

      <motion.p
        className="mt-2 text-xs font-mono uppercase tracking-widest text-[#B85829]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Komunitas Telegram Roleplay
      </motion.p>

      {/* Jejak kaki beruang berjalan */}
      <div className="relative mt-10 flex items-center gap-5 h-12" aria-hidden="true">
        {Array.from({ length: PAW_COUNT }).map((_, i) => (
          <motion.span
            key={i}
            className="flex"
            style={{ marginTop: i % 2 === 0 ? -8 : 10 }}
            initial={{ opacity: reduceMotion ? 0.6 : 0, scale: 0.6 }}
            animate={
              reduceMotion
                ? undefined
                : { opacity: [0, 1, 1, 0.12], scale: [0.6, 1, 1, 1] }
            }
            transition={{
              duration: 2.4,
              times: [0, 0.15, 0.6, 1],
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeOut',
            }}
          >
            <PawIcon size={22} color="#B85829" rotate={90} />
          </motion.span>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-56 sm:w-72">
        <div className="h-px w-full bg-[#221812]/15 overflow-hidden">
          <div
            className="h-full w-full bg-[#B85829] origin-left"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#5F4E42]">
          <span>{getStatus(progress)}</span>
          <span className="tabular-nums">{String(percent).padStart(3, '0')}%</span>
        </div>
      </div>
    </motion.div>
  );
};
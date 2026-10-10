/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollyStory } from './components/ScrollyStory';
import { TeamSection } from './components/TeamSection';
import { WhyJoinSection } from './components/WhyJoinSection';
import { GallerySection } from './components/GallerySection';
import { RulesSection } from './components/RulesSection';
import { BotChSection } from './components/BotChSection';
import { JoinExperience } from './components/JoinExperience';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';

export default function App() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const handleLoaded = useCallback(() => setLoading(false), []);

  const scrollToJoin = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
      // Slight focus delay after smooth scroll
      setTimeout(() => {
        const firstInput = formRef.current?.querySelector('input');
        firstInput?.focus();
      }, 600);
    } else {
      const joinSection = document.getElementById('join');
      joinSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStory = () => {
    const storySection = document.getElementById('scrollytelling');
    storySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2B2119] relative selection:bg-[#EBDDCF] selection:text-[#261B14]">
      {/* Loading screen awal */}
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" onDone={handleLoaded} />}
      </AnimatePresence>

      {/* Top sticky navigation */}
      <Navbar onJoinClick={scrollToJoin} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onJoinClick={scrollToJoin} onDiscoverClick={scrollToStory} />

        {/* Scrollytelling Story: Scene 1 (Forest), Scene 2 (Our Story), Scene 3 (What We Believe) */}
        <ScrollyStory />

        {/* Founder & Our Team Section */}
        <TeamSection />

        {/* Why Join Bear With Us (4 core pillars) */}
        <WhyJoinSection />

        {/* Community Preview & Gallery (with Lightbox) */}
        <GallerySection />

        {/* Rules Section (5 core rules + Full handbook modal) */}
        <RulesSection />

        {/* Keluh kesah & izin pamit (Bot CH) */}
        <BotChSection />

        {/* Join Experience (4-step visual stepper + interactive registration form) */}
        <JoinExperience formRef={formRef} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
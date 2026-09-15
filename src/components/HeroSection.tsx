import React, { useState, useEffect } from 'react';
import { MEMES_DATA } from '../data/memes';
import { MemeItem } from '../types';
import { playHoverBlip, playMemeSound, playRetroClick } from '../utils/audio';
import { ChevronDown, Sparkles, Type, Palette } from 'lucide-react';

interface HeroSectionProps {
  soundEnabled: boolean;
  onSelectMeme: (meme: MemeItem) => void;
}

type FontStyleKey = 'unbounded' | 'syne' | 'chakra' | 'anton';
type ColorSchemeKey = 'yellow-lightgreen' | 'electric-lime' | 'cyber-yellow';

export const HeroSection: React.FC<HeroSectionProps> = ({ soundEnabled, onSelectMeme }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [activeFont, setActiveFont] = useState<FontStyleKey>('unbounded');
  const [activeColorScheme, setActiveColorScheme] = useState<ColorSchemeKey>('yellow-lightgreen');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMouseOffset({
        x: (e.clientX - centerX) / 35,
        y: (e.clientY - centerY) / 35,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fontClasses: Record<FontStyleKey, string> = {
    unbounded: "font-['Unbounded',sans-serif] tracking-tight font-black",
    syne: "font-['Syne',sans-serif] tracking-tighter font-extrabold",
    chakra: "font-['Chakra_Petch',sans-serif] tracking-normal font-bold",
    anton: "font-['Anton',sans-serif] tracking-wide font-normal",
  };

  const colorPalettes: Record<ColorSchemeKey, { yellow: string; lightGreen: string; label: string }> = {
    'yellow-lightgreen': {
      yellow: '#d4ff00', // Electric yellow from screenshot
      lightGreen: '#76ff96', // Light pastel neon green from screenshot
      label: 'Yellow & Light Green (Screenshot Match)',
    },
    'electric-lime': {
      yellow: '#facc15',
      lightGreen: '#4ade80',
      label: 'Cyber Lime & Mint',
    },
    'cyber-yellow': {
      yellow: '#fef08a',
      lightGreen: '#86efac',
      label: 'Pale Neon & Soft Green',
    },
  };

  const currentColors = colorPalettes[activeColorScheme];

  // Specific screenshot arrangement
  const screenshotMemes = [
    {
      id: 'epic-handshake',
      meme: MEMES_DATA.find((m) => m.id === 'epic-handshake') || MEMES_DATA[0],
      style: {
        top: '12%',
        left: '2%',
        width: '280px',
        height: '210px',
        rotate: '0deg',
      },
    },
    {
      id: 'two-buttons',
      meme: MEMES_DATA.find((m) => m.id === 'two-buttons') || MEMES_DATA[1],
      style: {
        top: '10%',
        left: '48%',
        width: '140px',
        height: '100px',
        rotate: '0deg',
      },
    },
    {
      id: 'batman-slap',
      meme: MEMES_DATA.find((m) => m.id === 'batman-slap') || MEMES_DATA[2],
      style: {
        top: '40%',
        left: '34%',
        width: '130px',
        height: '95px',
        rotate: '0deg',
      },
    },
    {
      id: 'roll-safe',
      meme: MEMES_DATA.find((m) => m.id === 'roll-safe') || MEMES_DATA[3],
      style: {
        top: '55%',
        left: '36%',
        width: '100px',
        height: '80px',
        rotate: '0deg',
      },
    },
    {
      id: 'bike-stick',
      meme: MEMES_DATA.find((m) => m.id === 'bike-stick') || MEMES_DATA[4],
      style: {
        top: '60%',
        left: '48%',
        width: '90px',
        height: '90px',
        rotate: '0deg',
      },
    },
    {
      id: 'clown-makeup',
      meme: MEMES_DATA.find((m) => m.id === 'clown-makeup') || MEMES_DATA[5],
      style: {
        top: '62%',
        left: '55%',
        width: '100px',
        height: '80px',
        rotate: '0deg',
      },
    },
    {
      id: 'monkey-puppet',
      meme: MEMES_DATA.find((m) => m.id === 'monkey-puppet') || MEMES_DATA[6],
      style: {
        bottom: '8%',
        right: '24%',
        width: '220px',
        height: '110px',
        rotate: '0deg',
      },
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-24 pb-16 px-4 bg-black select-none">
      {/* Background cyber grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Floating interactive meme frames behind hero (exact layout from screenshot!) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {screenshotMemes.map(({ id, meme, style }, idx) => (
          <div
            key={id}
            onClick={() => {
              onSelectMeme(meme);
              playMemeSound(meme.soundType, soundEnabled);
            }}
            onMouseEnter={() => playHoverBlip(soundEnabled)}
            className="absolute pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-30 group"
            style={{
              ...style,
              transform: `translate3d(${mouseOffset.x * ((idx % 3) + 0.5)}px, ${
                mouseOffset.y * ((idx % 3) + 0.5)
              }px, 0)`,
            }}
          >
            <div className="relative w-full h-full p-0.5 bg-black/90 border border-zinc-700/80 group-hover:border-[#76ff96] transition-colors rounded shadow-2xl overflow-hidden">
              <img
                src={meme.imageUrl}
                alt={meme.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/70 p-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between text-[9px] font-mono text-zinc-300">
                <span className="truncate text-white font-bold">{meme.title}</span>
                <span className="text-[#d4ff00]">#{meme.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Center Typography Container */}
      <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center justify-center px-4">
        {/* Style & Color Quick Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2 bg-zinc-950/90 border border-zinc-800 p-1.5 rounded-full backdrop-blur-md">
          {/* Font Toggle */}
          <div className="flex items-center gap-1 px-2 border-r border-zinc-800 text-xs font-mono text-zinc-400">
            <Type className="w-3.5 h-3.5 text-[#d4ff00]" />
            <span className="hidden sm:inline">FONT:</span>
            {(['unbounded', 'syne', 'chakra', 'anton'] as FontStyleKey[]).map((f) => (
              <button
                key={f}
                onClick={() => {
                  setActiveFont(f);
                  playRetroClick(soundEnabled);
                }}
                className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono transition-all ${
                  activeFont === f
                    ? 'bg-[#d4ff00] text-black font-bold shadow-[0_0_8px_rgba(212,255,0,0.5)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Color Scheme Toggle */}
          <div className="flex items-center gap-1 px-2 text-xs font-mono text-zinc-400">
            <Palette className="w-3.5 h-3.5 text-[#76ff96]" />
            <span className="hidden sm:inline">COLOR:</span>
            {(['yellow-lightgreen', 'electric-lime', 'cyber-yellow'] as ColorSchemeKey[]).map((c) => (
              <button
                key={c}
                onClick={() => {
                  setActiveColorScheme(c);
                  playRetroClick(soundEnabled);
                }}
                className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono transition-all ${
                  activeColorScheme === c
                    ? 'bg-[#76ff96] text-black font-bold shadow-[0_0_8px_rgba(118,255,150,0.5)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {c === 'yellow-lightgreen' ? 'Yellow/Green' : c === 'electric-lime' ? 'Lime' : 'Soft'}
              </button>
            ))}
          </div>
        </div>

        {/* PRIMARY HEADLINE: WELCOME TO THE INTERNET with split yellow & light green colors */}
        <div
          className={`relative select-none text-center uppercase ${fontClasses[activeFont]} leading-none`}
          id="hero-main-headline"
        >
          {/* Chromatic subtle 3D shadow trail */}
          <div
            aria-hidden="true"
            className="absolute inset-0 text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none pointer-events-none opacity-25 filter blur-[1px]"
            style={{
              transform: `translate(${mouseOffset.x * 0.25 + 3}px, ${mouseOffset.y * 0.25 + 3}px)`,
            }}
          >
            <div>
              <span style={{ color: currentColors.yellow }}>WELCOME </span>
              <span style={{ color: currentColors.lightGreen }}>TO</span>
            </div>
            <div className="mt-1 sm:mt-2">
              <span style={{ color: currentColors.yellow }}>THE </span>
              <span style={{ color: currentColors.lightGreen }}>INTERNET</span>
            </div>
          </div>

          {/* Main Sharp Crisp Text */}
          <div className="relative text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none transition-transform duration-100 drop-shadow-[0_0_35px_rgba(212,255,0,0.25)]">
            {/* Line 1: WELCOME (Yellow) TO (Light Green) */}
            <div>
              <span
                style={{
                  color: currentColors.yellow,
                  textShadow: `0 0 25px ${currentColors.yellow}60`,
                }}
              >
                WELCOME{' '}
              </span>
              <span
                style={{
                  color: currentColors.lightGreen,
                  textShadow: `0 0 25px ${currentColors.lightGreen}60`,
                }}
              >
                TO
              </span>
            </div>

            {/* Line 2: THE (Yellow) INTERNET (Light Green) */}
            <div className="mt-1 sm:mt-2">
              <span
                style={{
                  color: currentColors.yellow,
                  textShadow: `0 0 25px ${currentColors.yellow}60`,
                }}
              >
                THE{' '}
              </span>
              <span
                style={{
                  color: currentColors.lightGreen,
                  textShadow: `0 0 25px ${currentColors.lightGreen}60`,
                }}
              >
                INTERNET
              </span>
            </div>
          </div>
        </div>

        {/* The requested phrase: "We will be your guide" */}
        <p
          className="mt-6 text-white font-sans text-base sm:text-lg md:text-xl font-normal tracking-wide text-center"
          id="hero-guide-subtext"
        >
          We will be your guide
        </p>

        {/* Explore buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 z-20 font-mono text-xs">
          <button
            onClick={() => {
              const el = document.getElementById('work');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              playRetroClick(soundEnabled);
            }}
            className="px-6 py-2.5 bg-[#d4ff00] hover:bg-[#bce000] text-black font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(212,255,0,0.4)]"
          >
            EXPLORE WORK
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('memes-stream');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              playRetroClick(soundEnabled);
            }}
            className="px-6 py-2.5 bg-black/80 hover:bg-zinc-900 border border-[#76ff96] text-[#76ff96] font-bold tracking-wider uppercase transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 inline mr-1" />
            MEME STREAM
          </button>
        </div>
      </div>

      {/* Triple Green Chevrons (exact match from the screenshot bottom center!) */}
      <div
        onClick={() => {
          const el = document.getElementById('work');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          playRetroClick(soundEnabled);
        }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center -space-y-2 cursor-pointer group select-none"
        title="Scroll to explore"
      >
        <ChevronDown
          className="w-6 h-6 transition-transform group-hover:translate-y-1 animate-pulse"
          style={{ color: currentColors.lightGreen }}
        />
        <ChevronDown
          className="w-6 h-6 transition-transform group-hover:translate-y-1 animate-pulse delay-100"
          style={{ color: currentColors.lightGreen }}
        />
        <ChevronDown
          className="w-6 h-6 transition-transform group-hover:translate-y-1 animate-pulse delay-200"
          style={{ color: currentColors.lightGreen }}
        />
      </div>
    </section>
  );
};

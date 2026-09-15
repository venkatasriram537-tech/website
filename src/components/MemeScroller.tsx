import React, { useState } from 'react';
import { MEMES_DATA } from '../data/memes';
import { MemeItem } from '../types';
import { playHoverBlip, playMemeSound, playRetroClick } from '../utils/audio';
import { Sparkles, Play, Pause, Compass } from 'lucide-react';

interface MemeScrollerProps {
  soundEnabled: boolean;
  onSelectMeme: (meme: MemeItem) => void;
}

export const MemeScroller: React.FC<MemeScrollerProps> = ({ soundEnabled, onSelectMeme }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState<'normal' | 'fast'>('normal');

  const filteredMemes =
    activeCategory === 'all'
      ? MEMES_DATA
      : MEMES_DATA.filter((m) => m.category === activeCategory);

  // Split into 2 rows for dynamic two-way scrolling stream
  const row1 = filteredMemes;
  const row2 = [...filteredMemes].reverse();

  return (
    <section id="memes-stream" className="relative py-20 bg-zinc-950 border-y border-zinc-900 overflow-hidden">
      {/* Background neon ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#22c55e]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#22c55e] mb-2 tracking-widest uppercase">
              <Compass className="w-4 h-4" />
              <span>THE ARCHIVE // SCROLLING THE MEMES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight">
              INTERNET MEME STREAM
            </h2>
            <p className="text-zinc-400 font-mono text-sm mt-2 max-w-xl">
              "We will be your guide" through the golden relics of web history. Click any artifact to decode its origin and play its nostalgic frequency.
            </p>
          </div>

          {/* Controls: Pause / Speed / Filter */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <button
              onClick={() => {
                setIsPaused(!isPaused);
                playRetroClick(soundEnabled);
              }}
              className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:border-[#22c55e] text-zinc-300 rounded flex items-center gap-1.5 transition-colors"
            >
              {isPaused ? <Play className="w-3 h-3 text-[#22c55e]" /> : <Pause className="w-3 h-3 text-yellow-400" />}
              <span>{isPaused ? 'RESUME' : 'PAUSE'}</span>
            </button>

            <button
              onClick={() => {
                setSpeed(speed === 'normal' ? 'fast' : 'normal');
                playRetroClick(soundEnabled);
              }}
              className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:border-yellow-400 text-zinc-300 rounded flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span>SPEED: {speed.toUpperCase()}</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-4">
          {[
            { id: 'all', label: 'ALL RELICS' },
            { id: 'classic', label: 'CLASSIC 2000s' },
            { id: 'nostalgia', label: 'EARLY NOSTALGIA' },
            { id: 'viral', label: 'VIRAL FORMATS' },
            { id: 'cat', label: 'FELINE LORE' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                playRetroClick(soundEnabled);
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#22c55e] text-black font-bold shadow-[0_0_12px_rgba(34,197,94,0.4)]'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Row 1: Leftward moving infinite marquee */}
      <div className="relative w-full overflow-hidden my-4 py-2">
        <div
          className={`flex gap-6 w-max ${isPaused ? '' : 'animate-scroll-left'}`}
          style={{
            animationDuration: speed === 'fast' ? '25s' : '45s',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {/* Double items for continuous infinite loop */}
          {[...row1, ...row1].map((meme, idx) => (
            <div
              key={`row1-${meme.id}-${idx}`}
              onClick={() => {
                onSelectMeme(meme);
                playMemeSound(meme.soundType, soundEnabled);
              }}
              onMouseEnter={() => playHoverBlip(soundEnabled)}
              className="flex-shrink-0 w-72 sm:w-80 group cursor-pointer"
            >
              <div className="relative p-2 bg-zinc-900/90 border border-zinc-800 group-hover:border-[#22c55e] transition-all duration-300 rounded overflow-hidden">
                {/* Stepped corner accents */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative h-44 w-full overflow-hidden rounded bg-black">
                  <img
                    src={meme.imageUrl}
                    alt={meme.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-[#22c55e] border border-zinc-700">
                    #{meme.year}
                  </span>
                </div>

                <div className="mt-2.5">
                  <h3 className="text-white font-mono font-bold text-sm group-hover:text-[#22c55e] transition-colors truncate">
                    {meme.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono line-clamp-1 mt-0.5">
                    {meme.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Rightward moving infinite marquee */}
      <div className="relative w-full overflow-hidden my-4 py-2">
        <div
          className={`flex gap-6 w-max ${isPaused ? '' : 'animate-scroll-right'}`}
          style={{
            animationDuration: speed === 'fast' ? '28s' : '50s',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {[...row2, ...row2].map((meme, idx) => (
            <div
              key={`row2-${meme.id}-${idx}`}
              onClick={() => {
                onSelectMeme(meme);
                playMemeSound(meme.soundType, soundEnabled);
              }}
              onMouseEnter={() => playHoverBlip(soundEnabled)}
              className="flex-shrink-0 w-72 sm:w-80 group cursor-pointer"
            >
              <div className="relative p-2 bg-zinc-900/90 border border-zinc-800 group-hover:border-yellow-400 transition-all duration-300 rounded overflow-hidden">
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative h-44 w-full overflow-hidden rounded bg-black">
                  <img
                    src={meme.imageUrl}
                    alt={meme.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-yellow-400 border border-zinc-700">
                    #{meme.category}
                  </span>
                </div>

                <div className="mt-2.5">
                  <h3 className="text-white font-mono font-bold text-sm group-hover:text-yellow-400 transition-colors truncate">
                    {meme.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono line-clamp-1 mt-0.5">
                    {meme.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { NinePSmileLogo } from './NinePSmileLogo';
import { playHoverBlip, playMemeSound, playRetroClick } from '../utils/audio';
import { Heart, MousePointer2, CheckSquare, Sparkles } from 'lucide-react';

interface FloatingPlaygroundProps {
  soundEnabled: boolean;
}

export const FloatingPlayground: React.FC<FloatingPlaygroundProps> = ({ soundEnabled }) => {
  const [items, setItems] = useState([
    { id: 1, type: 'logo', x: 20, y: 30, rotation: -12 },
    { id: 2, type: 'cursor', x: 65, y: 25, rotation: 15 },
    { id: 3, type: 'heart', x: 45, y: 70, rotation: 8 },
    { id: 4, type: 'box', x: 38, y: 20, rotation: -5 },
    { id: 5, type: 'cursor2', x: 75, y: 65, rotation: -20 },
  ]);

  const handleElementClick = (id: number, type: string) => {
    playMemeSound(type === 'heart' ? 'ding' : 'wow', soundEnabled);
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              rotation: item.rotation + 35,
              x: Math.min(85, Math.max(10, item.x + (Math.random() * 20 - 10))),
              y: Math.min(80, Math.max(15, item.y + (Math.random() * 20 - 10))),
            }
          : item
      )
    );
  };

  return (
    <section className="relative py-24 bg-black border-y border-zinc-900 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#22c55e] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CYBER PLAYGROUND // CLICK THE FLOATING RELICS</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-mono font-bold text-white uppercase tracking-tight">
          INTERACTIVE WEB DRIFT
        </h3>
        <p className="text-zinc-500 font-mono text-xs max-w-md mx-auto mt-2">
          Click to disrupt their quantum coordinates &amp; trigger soundwaves.
        </p>
      </div>

      {/* Interactive Floating Arena (Matches video 00:33 - 00:35) */}
      <div className="relative w-full h-96 sm:h-[420px] max-w-5xl mx-auto border border-zinc-800/80 rounded bg-zinc-950/70 backdrop-blur-sm overflow-hidden">
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e15_1px,transparent_1px)] [background-size:24px_24px]" />

        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleElementClick(item.id, item.type)}
            onMouseEnter={() => playHoverBlip(soundEnabled)}
            className="absolute cursor-pointer transition-all duration-300 ease-out transform hover:scale-125 select-none"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
            }}
          >
            {item.type === 'logo' && (
              <div className="p-2 filter drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">
                <NinePSmileLogo size="lg" interactive={true} />
              </div>
            )}

            {item.type === 'cursor' && (
              <div className="text-[#22c55e] p-2 filter drop-shadow-[0_0_12px_#22c55e]">
                <MousePointer2 className="w-12 h-12 fill-[#22c55e] stroke-black" />
              </div>
            )}

            {item.type === 'cursor2' && (
              <div className="text-[#facc15] p-2 filter drop-shadow-[0_0_12px_#facc15]">
                <MousePointer2 className="w-10 h-10 fill-[#facc15] stroke-black" />
              </div>
            )}

            {item.type === 'heart' && (
              <div className="text-[#22c55e] p-2 filter drop-shadow-[0_0_15px_#22c55e]">
                <Heart className="w-12 h-12 fill-[#22c55e] stroke-black" />
              </div>
            )}

            {item.type === 'box' && (
              <div className="border-2 border-[#22c55e] bg-black/80 px-4 py-2 rounded text-xs font-mono text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.5)] flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-yellow-400" />
                <span>9P.SYS</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

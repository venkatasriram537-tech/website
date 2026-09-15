import React, { useState } from 'react';
import { playHoverBlip, playRetroClick } from '../utils/audio';
import { ArrowRight } from 'lucide-react';

interface BigMenuSectionProps {
  soundEnabled: boolean;
  onNavigate: (sectionId: string) => void;
}

export const BigMenuSection: React.FC<BigMenuSectionProps> = ({ soundEnabled, onNavigate }) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const links = [
    { id: 'work', label: 'work', sub: 'PROJECTS & DIGITAL ACTIVATIONS' },
    { id: 'studio', label: 'studio', sub: 'THE CREATIVE EXPERTS & VALUES' },
    { id: 'contact', label: 'contact', sub: 'START A PROJECT // PARIS & BORDEAUX' },
  ];

  return (
    <section className="relative py-20 bg-black border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="divide-y divide-zinc-800 border-y border-zinc-800">
          {links.map((link) => {
            const isHovered = hoveredLink === link.id;

            return (
              <div
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  playRetroClick(soundEnabled);
                }}
                onMouseEnter={() => {
                  setHoveredLink(link.id);
                  playHoverBlip(soundEnabled);
                }}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative py-8 sm:py-12 cursor-pointer group transition-all duration-300 overflow-hidden"
              >
                {/* Background scanning horizontal highlight on hover */}
                <div
                  className={`absolute inset-0 bg-[#22c55e]/5 transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 z-10">
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="text-xs font-mono text-zinc-600 group-hover:text-[#22c55e] transition-colors">
                      /{link.id}
                    </span>
                    <h3
                      className={`text-5xl sm:text-7xl lg:text-8xl font-mono font-bold lowercase tracking-tight transition-all duration-200 ${
                        isHovered
                          ? 'text-[#22c55e] translate-x-3'
                          : 'text-zinc-200 group-hover:text-white'
                      }`}
                    >
                      {link.label}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-zinc-400 font-mono text-xs sm:text-sm">
                    <span className="hidden sm:inline-block tracking-wider group-hover:text-zinc-200 transition-colors">
                      {link.sub}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center transition-all ${
                        isHovered
                          ? 'border-[#22c55e] bg-[#22c55e] text-black translate-x-2'
                          : 'text-zinc-400'
                      }`}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Stepped shadow echo on hover */}
                {isHovered && (
                  <div
                    aria-hidden="true"
                    className="absolute top-1/2 -translate-y-1/2 left-20 text-5xl sm:text-7xl lg:text-8xl font-mono font-bold lowercase tracking-tight text-transparent opacity-20 pointer-events-none select-none"
                    style={{ WebkitTextStroke: '1px #facc15' }}
                  >
                    {link.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

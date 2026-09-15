import React from 'react';
import { MemeItem } from '../types';
import { X, Volume2, Share2, Sparkles, ExternalLink } from 'lucide-react';
import { playMemeSound, playRetroClick } from '../utils/audio';

interface MemeModalProps {
  meme: MemeItem | null;
  soundEnabled: boolean;
  onClose: () => void;
}

export const MemeModal: React.FC<MemeModalProps> = ({ meme, soundEnabled, onClose }) => {
  if (!meme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      {/* Stepped Wireframe Border Backdrop */}
      <div className="relative max-w-xl w-full bg-zinc-950 border-2 border-[#22c55e] p-5 sm:p-7 shadow-[0_0_50px_rgba(34,197,94,0.3)] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#22c55e]">
            <Sparkles className="w-4 h-4" />
            <span>INTERNET ARTIFACT DECODER #{meme.year}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              playRetroClick(soundEnabled);
            }}
            className="w-8 h-8 rounded border border-zinc-700 hover:border-[#22c55e] hover:text-[#22c55e] text-zinc-400 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Meme Image Preview */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded bg-black border border-zinc-800">
          <img
            src={meme.imageUrl}
            alt={meme.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 px-2.5 py-0.5 bg-black/80 border border-zinc-700 rounded text-xs font-mono text-yellow-400">
            {meme.category.toUpperCase()}
          </div>
        </div>

        {/* Content Details */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-mono font-bold text-white uppercase">{meme.title}</h3>
            <button
              onClick={() => playMemeSound(meme.soundType, soundEnabled)}
              className="px-3 py-1.5 bg-[#22c55e]/20 hover:bg-[#22c55e]/30 border border-[#22c55e] text-[#22c55e] rounded text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>PLAY SOUNDBITE</span>
            </button>
          </div>

          <p className="text-zinc-200 font-mono text-sm bg-zinc-900/90 p-3 rounded border border-zinc-800">
            &ldquo;{meme.caption}&rdquo;
          </p>

          <div className="pt-2 text-xs font-mono space-y-1 text-zinc-400 border-t border-zinc-900">
            <p className="text-zinc-500">HISTORICAL ORIGIN:</p>
            <p className="text-zinc-300">{meme.origin}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-500">CURATED BY STUDIO 9P</span>
          <button
            onClick={() => {
              onClose();
              playRetroClick(soundEnabled);
            }}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700"
          >
            CLOSE VIEWER
          </button>
        </div>
      </div>
    </div>
  );
};

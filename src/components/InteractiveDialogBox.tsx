import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playMemeSound, playRetroClick } from '../utils/audio';
import { Send, CheckCircle2 } from 'lucide-react';

interface InteractiveDialogBoxProps {
  soundEnabled: boolean;
}

export const InteractiveDialogBox: React.FC<InteractiveDialogBoxProps> = ({ soundEnabled }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubmitted(true);
    playMemeSound('ding', soundEnabled);

    // Blast celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#facc15', '#ffffff'],
    });
  };

  return (
    <section className="relative py-20 bg-black overflow-hidden flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl w-full mx-auto relative">
        {/* Decorative stepped cascading wireframe windows (exact signature look from video 00:43 - 00:44) */}
        <div className="absolute inset-0 border border-yellow-400 translate-x-2 -translate-y-2 pointer-events-none opacity-80" />
        <div className="absolute inset-0 border border-[#22c55e] translate-x-4 -translate-y-4 pointer-events-none opacity-70" />
        <div className="absolute inset-0 border border-yellow-400/50 translate-x-6 -translate-y-6 pointer-events-none opacity-50 hidden sm:block" />

        {/* Main Window Box */}
        <div className="relative z-10 bg-zinc-950 border-2 border-yellow-400 p-6 sm:p-10 shadow-[0_0_40px_rgba(250,204,21,0.15)]">
          {/* Window Header */}
          <div className="flex items-center justify-between border-b border-yellow-400/40 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-xs font-mono text-yellow-400 font-bold ml-2">
                URL_MEET_SYSTEM.EXE
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500">[STATUS: READY]</span>
          </div>

          <div className="space-y-6 text-center sm:text-left">
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-0.5 bg-yellow-400 text-black font-mono font-bold text-xs tracking-widest uppercase">
                HI THERE YOUNG ENTREPRENEUR
              </span>
              <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                Does our sense of humour float your boat?
              </h3>
              <p className="text-zinc-400 font-mono text-sm leading-relaxed">
                You&apos;re all ready to learn with or at 9P? If you tick all the boxes,{' '}
                <strong className="text-[#22c55e]">DROP US YOUR EMAIL</strong> and we will be your guide.
              </p>
            </div>

            {submitted ? (
              <div className="p-4 bg-[#22c55e]/10 border border-[#22c55e] rounded flex items-center justify-center gap-3 text-[#22c55e] font-mono text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>PACKET RECEIVED! We&apos;ll beam an invitation to your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  required
                  className="flex-1 bg-black border border-zinc-700 focus:border-[#22c55e] focus:outline-none px-4 py-3 text-white font-mono text-sm placeholder:text-zinc-600 rounded-none transition-colors"
                />
                <button
                  type="submit"
                  onClick={() => playRetroClick(soundEnabled)}
                  className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-transform active:scale-95 whitespace-nowrap"
                >
                  <Send className="w-4 h-4" />
                  <span>DROP EMAIL</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

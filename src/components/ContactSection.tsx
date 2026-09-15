import React, { useState } from 'react';
import { NinePSmileLogo } from './NinePSmileLogo';
import { playMemeSound, playRetroClick } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Mail, MapPin, Share2, Send, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  soundEnabled: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ soundEnabled }) => {
  const [formData, setFormData] = useState({
    email: '',
    nameSociety: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setSubmitted(true);
    playMemeSound('ding', soundEnabled);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.8 },
      colors: ['#22c55e', '#facc15', '#ffffff'],
    });
  };

  return (
    <footer id="contact" className="relative bg-zinc-950 text-white pt-24 pb-12 border-t border-zinc-900 overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#22c55e]/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#facc15]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Contact Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-zinc-800">
          {/* Left Column: Heading & Info (matches video 00:51 - 00:59) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-zinc-400 font-mono text-xs tracking-widest uppercase block mb-2">
                Do you have a brief?
              </span>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-mono tracking-tighter text-[#facc15] leading-none">
                TELL US<br />
                EVERYTHING*
              </h2>
              <p className="text-zinc-400 font-mono text-xs mt-3">*or just hello!</p>
            </div>

            {/* Studio Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs font-mono border-t border-zinc-800/80">
              <div>
                <div className="flex items-center gap-1.5 text-zinc-400 mb-2 uppercase">
                  <Mail className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>DROP US A LINE</span>
                </div>
                <a
                  href="mailto:contact@studio9p.com"
                  className="text-white hover:text-[#22c55e] transition-colors break-all"
                >
                  contact@studio9p.com
                </a>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-zinc-400 mb-2 uppercase">
                  <Share2 className="w-3.5 h-3.5 text-yellow-400" />
                  <span>FOLLOW US</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      playRetroClick(soundEnabled);
                    }}
                    className="w-7 h-7 rounded border border-zinc-700 flex items-center justify-center hover:border-[#22c55e] hover:text-[#22c55e] transition-colors"
                  >
                    f
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      playRetroClick(soundEnabled);
                    }}
                    className="w-7 h-7 rounded border border-zinc-700 flex items-center justify-center hover:border-[#22c55e] hover:text-[#22c55e] transition-colors"
                  >
                    in
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      playRetroClick(soundEnabled);
                    }}
                    className="w-7 h-7 rounded border border-zinc-700 flex items-center justify-center hover:border-[#22c55e] hover:text-[#22c55e] transition-colors"
                  >
                    v
                  </a>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-zinc-400 mb-2 uppercase">
                  <MapPin className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>COME ON UP</span>
                </div>
                <p className="text-zinc-300">
                  4 Cité Griset<br />
                  75011 Paris<br />
                  <span className="text-zinc-500 mt-1 block">
                    30 rue des Bouviers<br />
                    33800 Bordeaux
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (matches video 00:53 - 00:58) */}
          <div className="lg:col-span-6 relative">
            {/* Stepped Wireframe Border Effect */}
            <div className="absolute inset-0 border border-[#22c55e] translate-x-2 translate-y-2 pointer-events-none opacity-40" />

            <div className="relative bg-black border border-zinc-800 p-6 sm:p-8 z-10">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#22c55e] mx-auto" />
                  <h3 className="text-2xl font-mono font-bold text-white uppercase">
                    MESSAGE TRANSMITTED!
                  </h3>
                  <p className="text-zinc-400 font-mono text-sm max-w-sm mx-auto">
                    Thanks for dropping us a line. We will review your brief and guide you through the next phase.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      Email address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email"
                      className="w-full bg-zinc-900/90 border border-zinc-700 focus:border-[#22c55e] focus:outline-none p-3 text-white font-mono text-sm placeholder:text-zinc-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      Name / Society *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nameSociety}
                      onChange={(e) => setFormData({ ...formData, nameSociety: e.target.value })}
                      placeholder="name / society"
                      className="w-full bg-zinc-900/90 border border-zinc-700 focus:border-[#22c55e] focus:outline-none p-3 text-white font-mono text-sm placeholder:text-zinc-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      Your message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="your message"
                      className="w-full bg-zinc-900/90 border border-zinc-700 focus:border-[#22c55e] focus:outline-none p-3 text-white font-mono text-sm placeholder:text-zinc-600 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={() => playRetroClick(soundEnabled)}
                    className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-300 active:scale-[0.99] text-black font-mono font-black text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                  >
                    <Send className="w-4 h-4" />
                    <span>SEND!</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom: 9P Logo with smile & credits (matches video 00:08, 00:46, 00:56) */}
        <div className="pt-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-zinc-500 font-mono text-[11px] leading-relaxed">
          <div className="flex items-center gap-4">
            <NinePSmileLogo size="lg" interactive={true} />
            <div>
              <p className="text-zinc-300 font-bold">STUDIO 9P // WEB CRAFTSMANSHIP</p>
              <p>&copy; {new Date().getFullYear()} Studio 9P. All rights reserved.</p>
            </div>
          </div>

          <div className="max-w-xl text-center md:text-right">
            <p>
              Brand design: Studio 9P&trade;, motion design: Studio Rebia, copy: Mille Servant, traduction EN: Martine Steyn &mdash; Legals.
            </p>
            <p className="mt-1 text-zinc-600">
              Welcome to the internet. We will be your guide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { NinePSmileLogo } from './NinePSmileLogo';
import { Volume2, VolumeX, Sparkles, Menu, X } from 'lucide-react';
import { playRetroClick, playHoverBlip } from '../utils/audio';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  trailEnabled: boolean;
  onToggleTrail: () => void;
  onOpenMemeGallery: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  onToggleSound,
  trailEnabled,
  onToggleTrail,
  onOpenMemeGallery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    playRetroClick(soundEnabled);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: 9P Logo with Smile and Brand */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            playRetroClick(soundEnabled);
          }}
          className="flex items-center gap-3 group"
          id="nav-logo-link"
        >
          <NinePSmileLogo size="md" interactive={true} />
          <div className="flex flex-col text-left">
            <span className="text-white font-extrabold tracking-wider text-sm sm:text-base font-mono group-hover:text-[#22c55e] transition-colors">
              STUDIO 9P
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-widest hidden sm:inline-block">
              DIGITAL PRODUCTION
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-mono lowercase tracking-wider">
          <button
            onClick={() => handleNavClick('work')}
            onMouseEnter={() => playHoverBlip(soundEnabled)}
            className="text-[#76ff96] hover:text-[#d4ff00] transition-colors relative py-1 hover:underline underline-offset-8 decoration-2 decoration-[#d4ff00]"
            id="nav-link-work"
          >
            work
          </button>
          <button
            onClick={() => handleNavClick('studio')}
            onMouseEnter={() => playHoverBlip(soundEnabled)}
            className="text-[#76ff96] hover:text-[#d4ff00] transition-colors relative py-1 hover:underline underline-offset-8 decoration-2 decoration-[#d4ff00]"
            id="nav-link-studio"
          >
            studio
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            onMouseEnter={() => playHoverBlip(soundEnabled)}
            className="text-[#76ff96] hover:text-[#d4ff00] transition-colors relative py-1 hover:underline underline-offset-8 decoration-2 decoration-[#d4ff00]"
            id="nav-link-contact"
          >
            contact
          </button>

          {/* Interactive controls */}
          <div className="flex items-center gap-2 pl-4 border-l border-zinc-800">
            {/* Trail Generator button */}
            <button
              onClick={() => {
                onToggleTrail();
                playRetroClick(soundEnabled);
              }}
              title={trailEnabled ? 'Wireframe trails enabled' : 'Enable wireframe trails'}
              className={`p-2 rounded-md border text-xs flex items-center gap-1.5 transition-all ${
                trailEnabled
                  ? 'border-[#22c55e] text-[#22c55e] bg-[#22c55e]/10 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                  : 'border-zinc-700 text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">3D Trails</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                onToggleSound();
                playRetroClick(!soundEnabled);
              }}
              title={soundEnabled ? 'Mute sound effects' : 'Enable retro 8-bit sound effects'}
              className={`p-2 rounded-md border text-xs transition-all ${
                soundEnabled
                  ? 'border-[#22c55e] text-[#22c55e] bg-[#22c55e]/10'
                  : 'border-zinc-700 text-zinc-400 hover:text-white'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Memes Vault shortcut */}
            <button
              onClick={() => {
                onOpenMemeGallery();
                playRetroClick(soundEnabled);
              }}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-700 hover:border-yellow-400 hover:text-yellow-400 text-zinc-300 rounded text-[11px] font-mono transition-colors flex items-center gap-1"
            >
              <span>💾</span> Memes
            </button>
          </div>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              onToggleSound();
              playRetroClick(!soundEnabled);
            }}
            className="p-2 border border-zinc-800 rounded text-zinc-300"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#22c55e]" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-zinc-800 rounded text-white"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-4 font-mono text-lg uppercase tracking-wider">
            <button
              onClick={() => handleNavClick('work')}
              className="text-left text-zinc-200 hover:text-[#22c55e]"
            >
              01. WORK
            </button>
            <button
              onClick={() => handleNavClick('studio')}
              className="text-left text-zinc-200 hover:text-[#22c55e]"
            >
              02. STUDIO
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left text-zinc-200 hover:text-[#22c55e]"
            >
              03. CONTACT
            </button>
          </div>
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <button
              onClick={() => {
                onToggleTrail();
                playRetroClick(soundEnabled);
              }}
              className="text-xs font-mono text-[#22c55e] flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {trailEnabled ? 'Disable Trails' : 'Enable 3D Trails'}
            </button>
            <button
              onClick={() => {
                onOpenMemeGallery();
                playRetroClick(soundEnabled);
              }}
              className="text-xs font-mono text-yellow-400 bg-zinc-900 px-3 py-1 rounded border border-yellow-500/30"
            >
              💾 View Memes Vault
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

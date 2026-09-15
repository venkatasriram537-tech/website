import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../data/projects';
import { playHoverBlip, playRetroClick } from '../utils/audio';
import { Users, Terminal, Award } from 'lucide-react';

interface TeamSectionProps {
  soundEnabled: boolean;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ soundEnabled }) => {
  const [activeMemberId, setActiveMemberId] = useState<string | null>(TEAM_MEMBERS[0].id);

  const currentMember = TEAM_MEMBERS.find((m) => m.id === activeMemberId) || TEAM_MEMBERS[0];

  return (
    <section id="studio" className="relative py-24 bg-zinc-950 border-b border-zinc-900 overflow-hidden">
      {/* Background large 9 numeral wireframe backdrop (from video 00:39 - 00:40) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-10 text-[380px] font-mono font-black text-[#22c55e] leading-none">
        9
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 border-b border-zinc-800 pb-12">
          <div className="lg:col-span-6">
            <span className="text-[#22c55e] text-xs font-mono tracking-widest uppercase block mb-2">
              // STUDIO CORE
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-mono tracking-tighter uppercase leading-tight">
              A TEAM OF<br />
              <span className="text-yellow-400">NUMBER NINES</span>
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-4 text-zinc-300 font-mono text-sm leading-relaxed">
            <p>
              We speak your language and have the same aversion to voicemails. What&apos;s more,
              we think our humour might tickle you.
            </p>
            <p className="text-zinc-400">
              In short: we&apos;re just a team of experts who love what they do, and we love
              sharing it even more. Come to us with your problems, and we&apos;ll turn them
              into solutions.
            </p>
          </div>
        </div>

        {/* Interactive Team Roster & Profile Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Members Table */}
          <div className="lg:col-span-7 border border-zinc-800 rounded bg-black/60 divide-y divide-zinc-800/80">
            {TEAM_MEMBERS.map((member) => {
              const isSelected = activeMemberId === member.id;
              return (
                <div
                  key={member.id}
                  onClick={() => {
                    setActiveMemberId(member.id);
                    playRetroClick(soundEnabled);
                  }}
                  onMouseEnter={() => playHoverBlip(soundEnabled)}
                  className={`p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all duration-200 group ${
                    isSelected
                      ? 'bg-zinc-900/90 border-l-4 border-l-[#22c55e]'
                      : 'hover:bg-zinc-900/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-zinc-500">[{member.id.padStart(2, '0')}]</span>
                      <h3
                        className={`font-mono text-base sm:text-lg font-bold transition-colors ${
                          isSelected ? 'text-[#22c55e]' : 'text-zinc-200 group-hover:text-white'
                        }`}
                      >
                        {member.name}
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">{member.role}</p>
                  </div>

                  <div className="hidden sm:flex items-center gap-2">
                    <span className="text-[11px] font-mono text-zinc-500 px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded">
                      {member.specialty}
                    </span>
                    <span
                      className={`text-xs font-mono transition-transform ${
                        isSelected ? 'translate-x-1 text-[#22c55e]' : 'text-zinc-600'
                      }`}
                    >
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Member Card / Live Inspector */}
          <div className="lg:col-span-5 relative">
            {/* Stepped Wireframe Border */}
            <div className="absolute inset-0 border border-yellow-400 translate-x-2 translate-y-2 pointer-events-none opacity-60" />
            <div className="relative bg-zinc-950 border border-zinc-700 p-6 sm:p-8 z-10">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[#22c55e]">
                  <Terminal className="w-4 h-4" />
                  <span>OPERATOR DOSSIER</span>
                </div>
                <span className="text-xs font-mono text-yellow-400 font-bold">STATUS: ONLINE</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-mono font-bold text-white uppercase">
                    {currentMember.name}
                  </h4>
                  <p className="text-sm font-mono text-[#22c55e] mt-1">{currentMember.role}</p>
                </div>

                <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded text-sm font-mono text-zinc-300 leading-relaxed">
                  &ldquo;{currentMember.bio}&rdquo;
                </div>

                <div className="space-y-2 pt-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800/60 pb-2">
                    <span>SPECIALIZATION</span>
                    <span className="text-white font-bold">{currentMember.specialty}</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800/60 pb-2">
                    <span>LOCATION</span>
                    <span className="text-white">Paris / Bordeaux / Cyber</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400 pb-2">
                    <span>MEME TOLERANCE</span>
                    <span className="text-[#22c55e]">100% MAXIMUM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

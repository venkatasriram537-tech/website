import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/projects';
import { Project } from '../types';
import { ArrowUpRight, Crosshair, Layers } from 'lucide-react';
import { playHoverBlip, playRetroClick } from '../utils/audio';

interface StudioWorkSectionProps {
  soundEnabled: boolean;
  onSelectProject: (project: Project) => void;
}

export const StudioWorkSection: React.FC<StudioWorkSectionProps> = ({
  soundEnabled,
  onSelectProject,
}) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <section id="work" className="relative py-24 bg-black border-b border-zinc-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#22c55e]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header split section matching the video layout (00:15 - 00:16) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 border-b border-zinc-800 pb-12">
          <div className="lg:col-span-6">
            <span className="text-[#22c55e] text-xs font-mono tracking-widest uppercase block mb-2">
              // LOADING YOUR DREAMS
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white font-mono tracking-tighter uppercase leading-none">
              STUDIO 9P<br />
              <span className="text-[#22c55e]">WORK</span>
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-4 text-zinc-300 font-mono text-sm leading-relaxed">
            <p>
              We create showcase websites, activations, campaigns, digital experiences, apps,
              digital installations, progressive web apps (PWA), AR experiences, filters, 360°/3D
              games, swipe-ups, and more.
            </p>
            <p className="text-zinc-400">
              We don&apos;t set ready-made templates or formulas, but unique craft, original
              adventures that will captivate your audiences. In other words:{' '}
              <span className="text-white font-bold underline decoration-[#22c55e] underline-offset-4">
                we code web-based journeys.
              </span>
            </p>
          </div>
        </div>

        {/* Project Cards Grid with Stepped Wireframe Borders (from video 00:02 - 00:04, 00:17 - 00:23) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS_DATA.map((project) => {
            const isHovered = hoveredProjectId === project.id;

            return (
              <div
                key={project.id}
                onClick={() => {
                  onSelectProject(project);
                  playRetroClick(soundEnabled);
                }}
                onMouseEnter={() => {
                  setHoveredProjectId(project.id);
                  playHoverBlip(soundEnabled);
                }}
                onMouseLeave={() => setHoveredProjectId(null)}
                className="relative group cursor-pointer"
                id={`project-card-${project.id}`}
              >
                {/* Stepped offset wireframe cascading borders (signature effect from video!) */}
                <div
                  className={`absolute inset-0 border transition-transform duration-300 pointer-events-none ${
                    isHovered
                      ? 'translate-x-3 translate-y-3 border-yellow-400 opacity-90'
                      : 'translate-x-1.5 translate-y-1.5 border-zinc-800 opacity-60'
                  }`}
                />
                <div
                  className={`absolute inset-0 border transition-transform duration-300 pointer-events-none ${
                    isHovered
                      ? 'translate-x-6 translate-y-6 border-[#22c55e] opacity-80'
                      : 'translate-x-3 translate-y-3 border-zinc-800/60 opacity-40'
                  }`}
                />

                {/* Main Card Container */}
                <div className="relative bg-zinc-950 border border-zinc-700 group-hover:border-[#22c55e] transition-colors p-3 sm:p-4 z-10">
                  {/* Card Header with crosshair and title */}
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Crosshair className="w-3.5 h-3.5 text-[#22c55e]" />
                      <span className="text-white font-mono font-bold tracking-wider text-sm sm:text-base uppercase group-hover:text-[#22c55e] transition-colors">
                        {project.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-zinc-500">[{project.year}]</span>
                      <div className="w-6 h-6 rounded bg-zinc-900 group-hover:bg-[#22c55e] group-hover:text-black flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Image with scanline/retro tone */}
                  <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-zinc-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <span className="text-xs text-[#22c55e] font-mono font-semibold block">
                          {project.client}
                        </span>
                        <span className="text-xs text-zinc-300 font-mono">
                          {project.category}
                        </span>
                      </div>

                      {/* Tag pill */}
                      <span className="px-2 py-0.5 bg-black/80 border border-zinc-700 text-[10px] font-mono text-yellow-400">
                        {project.tags[0]}
                      </span>
                    </div>
                  </div>

                  {/* Card Description */}
                  <div className="pt-3 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <p className="line-clamp-1 pr-2">{project.description}</p>
                    <span className="text-zinc-500 whitespace-nowrap group-hover:text-white flex items-center gap-1">
                      <Layers className="w-3 h-3 text-[#22c55e]" /> DETAILS
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

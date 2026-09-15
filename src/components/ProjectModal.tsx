import React from 'react';
import { Project } from '../types';
import { X, ExternalLink, Tag, Calendar, Layers } from 'lucide-react';
import { playRetroClick } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  soundEnabled: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, soundEnabled, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      {/* Stepped Wireframe Border Backdrop */}
      <div className="relative max-w-2xl w-full bg-zinc-950 border-2 border-yellow-400 p-6 sm:p-8 shadow-[0_0_50px_rgba(250,204,21,0.25)] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-5">
          <div className="flex items-center gap-2 text-xs font-mono text-yellow-400">
            <Layers className="w-4 h-4" />
            <span>CASE STUDY // {project.category}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              playRetroClick(soundEnabled);
            }}
            className="w-8 h-8 rounded border border-zinc-700 hover:border-yellow-400 hover:text-yellow-400 text-zinc-400 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Project Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded bg-black border border-zinc-800">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="text-white font-mono font-bold text-xl sm:text-2xl uppercase">
              {project.title}
            </span>
            <span className="px-2.5 py-0.5 bg-[#22c55e] text-black font-mono font-bold text-xs rounded">
              {project.year}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="mt-6 space-y-4 font-mono">
          <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800/80 pb-3">
            <div>
              <span className="text-zinc-500 block">CLIENT / PARTNER</span>
              <span className="text-white font-bold text-sm">{project.client}</span>
            </div>
            <div className="text-right">
              <span className="text-zinc-500 block">DISCIPLINE</span>
              <span className="text-[#22c55e] font-bold text-sm">{project.category}</span>
            </div>
          </div>

          <p className="text-zinc-300 text-sm leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-yellow-400 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center justify-between font-mono text-xs">
          <span className="text-zinc-500">STUDIO 9P PORTFOLIO</span>
          <button
            onClick={() => {
              onClose();
              playRetroClick(soundEnabled);
            }}
            className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold uppercase transition-transform active:scale-95"
          >
            CLOSE CASE STUDY
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MemeScroller } from './components/MemeScroller';
import { StudioWorkSection } from './components/StudioWorkSection';
import { TeamSection } from './components/TeamSection';
import { FloatingPlayground } from './components/FloatingPlayground';
import { InteractiveDialogBox } from './components/InteractiveDialogBox';
import { BigMenuSection } from './components/BigMenuSection';
import { ContactSection } from './components/ContactSection';
import { CustomCursor } from './components/CustomCursor';
import { WireframeTrailCanvas } from './components/WireframeTrailCanvas';
import { MemeModal } from './components/MemeModal';
import { ProjectModal } from './components/ProjectModal';
import { MemeItem, Project } from './types';
import { MEMES_DATA } from './data/memes';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [trailEnabled, setTrailEnabled] = useState(true);
  const [selectedMeme, setSelectedMeme] = useState<MemeItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenMemeGallery = () => {
    const el = document.getElementById('memes-stream');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setSelectedMeme(MEMES_DATA[0]);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#22c55e] selection:text-black font-sans cursor-default">
      {/* Custom Crosshair Cursor matching video */}
      <CustomCursor />

      {/* 3D Wireframe stepped trail canvas matching video 00:14 / 00:31 */}
      <WireframeTrailCanvas isActive={trailEnabled} />

      {/* Navigation Header */}
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        trailEnabled={trailEnabled}
        onToggleTrail={() => setTrailEnabled((prev) => !prev)}
        onOpenMemeGallery={handleOpenMemeGallery}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero with "WELCOME TO THE INTERNET" and "We will be your guide" */}
        <HeroSection
          soundEnabled={soundEnabled}
          onSelectMeme={(meme) => setSelectedMeme(meme)}
        />

        {/* Studio 9P Work showcase with stepped wireframe cards */}
        <StudioWorkSection
          soundEnabled={soundEnabled}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Continuous Scrolling Memes Archive as requested */}
        <MemeScroller
          soundEnabled={soundEnabled}
          onSelectMeme={(meme) => setSelectedMeme(meme)}
        />

        {/* Studio & Team Section: "A TEAM OF NUMBER NINES" */}
        <TeamSection soundEnabled={soundEnabled} />

        {/* Interactive Floating Playground matching video 00:33 */}
        <FloatingPlayground soundEnabled={soundEnabled} />

        {/* Interactive dialog: "HI THERE YOUNG ENTREPRENEUR" */}
        <InteractiveDialogBox soundEnabled={soundEnabled} />

        {/* Giant kinetic navigation links: work / studio / contact */}
        <BigMenuSection
          soundEnabled={soundEnabled}
          onNavigate={handleNavigate}
        />

        {/* Contact Form: "TELL US EVERYTHING*" & Footer with 9P smile */}
        <ContactSection soundEnabled={soundEnabled} />
      </main>

      {/* Meme Lore & Soundbite Modal */}
      <MemeModal
        meme={selectedMeme}
        soundEnabled={soundEnabled}
        onClose={() => setSelectedMeme(null)}
      />

      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        soundEnabled={soundEnabled}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

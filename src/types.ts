export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  image: string;
  tags: string[];
  color?: string;
  accentColor?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialty: string;
}

export interface MemeItem {
  id: string;
  title: string;
  year: string;
  category: 'classic' | 'nostalgia' | 'viral' | 'cat';
  imageUrl: string;
  caption: string;
  origin: string;
  soundType?: 'wow' | 'beep' | 'quack' | 'dialup' | 'ding';
}

export interface FloatingElement {
  id: string;
  type: 'icon' | 'cursor' | 'heart' | 'box';
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
}

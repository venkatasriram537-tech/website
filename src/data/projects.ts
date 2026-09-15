import { Project, TeamMember } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'yame',
    title: 'YAMÉ',
    client: 'Yamé Music / Colors',
    category: 'Digital Experience & 3D Web',
    year: '2024',
    description: 'Immersive sound voyage and spatial 3D audio experience exploring musical frequencies.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    tags: ['WebGL', 'Sound Reactive', 'Three.js'],
    accentColor: '#4ade80'
  },
  {
    id: 'ricky',
    title: 'RICKY',
    client: 'Ricky & Friends Studio',
    category: 'Showcase Website & Motion',
    year: '2024',
    description: 'High octane street culture and digital installation featuring glitch raster art.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    tags: ['Motion Design', 'Typography', 'Interactive'],
    accentColor: '#facc15'
  },
  {
    id: 'vous-emerveiller',
    title: 'VOUS ÉMERVEILLER',
    client: 'Fondation d’Art Contemporain',
    category: 'Interactive Gallery',
    year: '2023',
    description: 'Generative typography and poetic web exploration designed to inspire modern curiosity.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    tags: ['Digital Art', 'Generative', 'PWA'],
    accentColor: '#22c55e'
  },
  {
    id: 'artefact-3000',
    title: 'ARTEFACT 3000',
    client: 'Artefact Agency',
    category: 'Creative Campaign & AR',
    year: '2023',
    description: 'Hyper-futuristic brand platform with dynamic holographic shaders and custom audio synthesis.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    tags: ['Augmented Reality', 'Shader Art', 'UI/UX'],
    accentColor: '#a3e635'
  },
  {
    id: 'design-for-adoption',
    title: 'DESIGN FOR ADOPTION',
    client: 'Animal Welfare Collective',
    category: 'Activation & Web Journey',
    year: '2023',
    description: 'Emotional storytelling portal connecting rescued companions with loving forever homes.',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&auto=format&fit=crop&q=80',
    tags: ['Interactive Map', 'Storytelling', 'Web App'],
    accentColor: '#34d399'
  },
  {
    id: 'leopard-oliveiro',
    title: 'LEOPARD OLIVEIRO',
    client: 'Haute Couture Studio',
    category: 'Fashion Showcase',
    year: '2022',
    description: 'Editorial web installation with tactile fabric physics and fluid cursor displacement.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
    tags: ['Fabric Simulation', 'Editorial', '3D Model'],
    accentColor: '#eab308'
  },
  {
    id: 'cosmo-av',
    title: 'COSMO AV',
    client: 'Cosmo Audiovisual France',
    category: '360° Interactive Show',
    year: '2022',
    description: 'Monolithic stage visual mapping simulator created for international festival stages.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    tags: ['Stage Mapping', 'Audiovisual', 'Custom Engine'],
    accentColor: '#84cc16'
  },
  {
    id: 'greenpeace-orizon',
    title: 'GREENPEACE - ORIZON',
    client: 'Greenpeace International',
    category: 'Global Awareness Campaign',
    year: '2022',
    description: 'Real-time satellite ocean topography visualizer educating thousands on ocean preservation.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    tags: ['Data Visualization', 'Geo Spatial', 'Campaign'],
    accentColor: '#10b981'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Ludovic Julve',
    role: 'Co-founder and Technical Director',
    bio: 'Architecting cutting-edge web shaders, WebGL engines, and seamless interactive realities.',
    specialty: 'Creative Tech & Shaders'
  },
  {
    id: '2',
    name: 'Gaspard Vidal',
    role: 'Co-founder and Creative Director',
    bio: 'Orchestrating visual identity, bold typography systems, and internet-native storytelling.',
    specialty: 'Art Direction & Concept'
  },
  {
    id: '3',
    name: 'Laura Bricout-Robert',
    role: 'Project Manager',
    bio: 'Ensuring seamless delivery across timezone boundaries, tight deadlines, and ambitious ambitions.',
    specialty: 'Agile & Client Partnerships'
  },
  {
    id: '4',
    name: 'Jean-Baptiste Michel',
    role: 'Full-stack Developer',
    bio: 'Crafting resilient backends, sub-millisecond API pipelines, and cloud architectures.',
    specialty: 'Cloud & Fullstack JS'
  },
  {
    id: '5',
    name: 'Maxime Leprevost',
    role: 'Front-end Developer',
    bio: 'Specialist in kinetic interfaces, complex CSS layouts, and micro-interactions.',
    specialty: 'React & Kinetic CSS'
  },
  {
    id: '6',
    name: 'Clément Roussin',
    role: 'Front-end Developer',
    bio: 'Obsessed with frame rates, buttery 60fps animations, and responsive web craftsmanship.',
    specialty: 'Performance & WebGL'
  },
  {
    id: '7',
    name: 'Alexis Dufour',
    role: 'UI Designer',
    bio: 'Pioneering neo-brutalist layouts, modular grid systems, and dark-mode aesthetics.',
    specialty: 'Visual Systems & UI'
  },
  {
    id: '8',
    name: 'Ophélie Manceau',
    role: 'UX Designer',
    bio: 'Mapping intuitive visitor journeys that balance rebellious creativity with effortless usability.',
    specialty: 'UX Strategy & Research'
  }
];

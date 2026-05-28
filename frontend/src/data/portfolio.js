// Single source of truth for portfolio content.
// Edit this file to update text everywhere.

export const profile = {
  name: 'Ashish Kumar',
  roles: [ 'Full Stack Developer', 'Problem Solver'],
  tagline:
    'Building intelligent systems that solve real-world problems',
  intro:
    'Computer Science postgraduate passionate about AI, scalable systems, and full-stack development. I build products where intelligence meets real-world impact.',
  email: 'ashishsingh3363@gmail.com',
  github: 'https://github.com/Ashish3363',
  linkedin: 'https://www.linkedin.com/in/ashish-kumar-772797231/',
  resume: 'https://drive.google.com/file/d/1OW52bkKFJ2_YO2OhmN65LTm5ubJwgAml/view?usp=sharing',
};

export const about = {
  heading: 'About Me?',
  body: `I'm Ashish Kumar, currently working as an FullStack Developer Intern at ARTPARK, IISc Bangalore, contributing to Project - an Early Warning System for Vector Borne Disease, with a strong background in full-stack development, AI systems, and scalable application development.`,
  pillars: [
    'AI / ML',
    'Backend architecture',
    'Full-stack applications',
    'Real-world automation',
    'Problem solving',
  ],
  education: [
    {
      degree: 'MCA',
      school: 'Kristu Jayanti (Deemed to be University)',
      years: '2024 — 2026',
    },
    {
      degree: 'BCA',
      school: 'Techno Main Salt Lake',
      years: '2019 — 2022',
    },
  ],
};

export const currentWork = {
  title: 'Early Warning System for Vector Borne Disease - ARTPARK @ IISC Bangalore',
  subtitle: 'Real-time vector borne disease surveillance for public health.',
  description:
    'Building a real-time disease surveillance platform that helps track dengue outbreaks and supports public health decisions across India.',
  highlights: [
    'Hotspot Detection System',
    'Outbreak Prediction Module',
    'Interactive Heat Maps',
    'Weather Data Integration',
    'API development',
    'Frontend ↔ Backend integration',
    'Query optimization',
    'Bug fixing & debugging',
  ],
  stack: ['FastAPI', 'React', 'PostgreSQL', 'GitHub'],
  tagline: 'Using technology to fight real-world healthcare challenges.',
};

export const projects = [
  {
    id: 'id-tie',
    title: 'ID-TIE Monitor System',
    blurb:
      'Smart attendance system that verifies attendance only when face matches, ID card is detected, and tie is detected.',
    tagline: 'Attendance with intelligence.',
    bullets: [
      'Face match verification',
      'ID card detection',
      'Tie detection',
      'Multi-modal verification pipeline',
    ],
    stack: ['YOLO', 'FastAPI', 'React', 'MongoDB'],
    accent: 'from-cyan-500 to-blue-600',
    link: 'https://github.com/Ashish3363/IDTIE-Monitoring-System-Frontend',
  },
  {
    id: 'jarvis',
    title: 'JARVIS AI Assistant',
    blurb:
      'A local AI assistant with semantic search and document retrieval, runs entirely on your machine.',
    tagline: 'Private AI assistant running locally.',
    bullets: [
      'Ollama + TinyLlama',
      'Pinecone vector store',
      'Semantic search',
      'Hybrid response system',
    ],
    stack: ['Ollama', 'TinyLlama', 'Pinecone', 'Python'],
    accent: 'from-violet-500 to-fuchsia-600',
    link: 'https://github.com/Ashish3363/JARVIS---Personal-AI-Assistant',
  },
  {
    id: 'qpaper',
    title: 'AI Smart Question Paper Generator',
    blurb:
      'AI system trained on syllabus and previous papers to generate custom question papers with difficulty and topic control.',
    tagline: 'Exams, generated with intelligence.',
    bullets: [
      'Custom question papers',
      'Difficulty control',
      'Topic filtering',
      'NLP-based generation',
    ],
    stack: ['Python', 'NLP', 'MongoDB', 'TinyLlama'],
    accent: 'from-emerald-500 to-teal-600',
    link: 'https://github.com/Ashish3363/Smart_Question_Paper_Generator',
  },
  {
    id: 'live-transcript',
    title: 'Live Transcript Web App',
    blurb:
      'Real-time speech-to-text web application using browser speech APIs.',
    tagline: 'Speech, transcribed live.',
    bullets: [
      'Realtime transcription',
      'Browser-native APIs',
      'Low-latency stream',
      'Lightweight web UI',
    ],
    stack: ['JavaScript', 'Web Speech API', 'React'],
    accent: 'from-amber-500 to-orange-600',
    link: 'https://github.com/Ashish3363/LiveScribe',
  },
];

export const experience = [
  {
    company: 'SkillFied Mentor',
    role: 'Machine Learning Intern',
    period: 'May – July 2025',
    link: 'https://drive.google.com/file/d/1aC3TkZCjW5FhLzWHliiyVVIuFzRTcrkv/view?usp=sharing',
    description:
      'An internship focused on Machine Learning, gaining practical exposure to core ML concepts and techniques. Also acquired experience with Python libraries and applying them to real-world projects.',
    work: [
      'Breast Cancer Detection Model',
      'Heart Rate Prediction Model',
      'Data preprocessing',
      'Model training',
      'Performance optimization',
    ],
  },
];

export const skills = [
  {
    group: 'Programming',
    items: ['Java', 'Python', 'JavaScript', 'SQL'],
  },
  {
    group: 'AI / ML',
    items: ['NumPy', 'Pandas', 'Scikit-learn', 'NLP', 'Computer Vision'],
  },
  {
    group: 'Backend',
    items: [ 'REST APIs', 'FastAPI'],
  },
  {
    group: 'Frontend',
    items: ['React', 'JavaScript', 'HTML/CSS'],
  },
  {
    group: 'Database',
    items: ['MongoDB', 'PostgreSQL', 'Pinecone', 'Supabase'],
  },
  {
    group: 'DevOps',
    items: ['Docker', 'Git', 'GitHub'],
  },
];

export const achievements = [
  {
    title: 'Azure Fundamentals',
    issuer: 'Microsoft',
    link: 'https://drive.google.com/file/d/1pYWoHsvGhnqFlCXY2cU77sK6F7Wghcsp/view?usp=sharing',
  },
  {
    title: 'Claude 101',
    issuer: 'Anthropic',
    link: 'https://drive.google.com/file/d/1oVyKmfxvTBDwxfhLJoY06UW-a8fiBqrx/view?usp=sharing',
  },
  {
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    link: 'https://drive.google.com/file/d/1TaVvOvGYYYZhcwnSlCO4NHKyR-GykRFn/view?usp=sharing',
  },
];

export interface AppItem {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  tags: string[];
  status: 'LIVE' | 'IN DEV' | 'HACKATHON';
  playStoreUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  category: string;
}

export const apps: AppItem[] = [
  {
    id: 'pactora',
    name: 'Pactora',
    icon: '🤝',
    tagline: 'Make promises. Keep them.',
    description: 'A fully offline Flutter app to create and track personal commitments and promises. No accounts, no cloud — just you and your word.',
    tags: ['Flutter', 'Dart', 'Drift', 'Riverpod', 'AdMob'],
    status: 'LIVE',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sooubh.pactora',
    githubUrl: null,
    featured: true,
    category: 'Productivity',
  },
  {
    id: 'btwus',
    name: 'BtwUs',
    icon: '💑',
    tagline: 'Your relationship, offline and private.',
    description: 'A 100% offline relationship archive app for couples. Store memories, promises, and milestones with full privacy — no cloud, no accounts.',
    tags: ['Flutter', 'Drift', 'Riverpod', 'GoRouter', 'SQLite'],
    status: 'IN DEV',
    playStoreUrl: null,
    githubUrl: null,
    featured: true,
    category: 'Lifestyle',
  },
  {
    id: 'gocrush',
    name: 'GoCrush',
    icon: '🔥',
    tagline: 'Dating app with real identity checks.',
    description: 'Flutter dating app with Firebase Auth, Firestore-based swipe matching, ML Kit face verification, geolocation radar, and RevenueCat subscriptions.',
    tags: ['Flutter', 'Firebase', 'ML Kit', 'RevenueCat', 'AdMob'],
    status: 'LIVE',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sooubh.gocrush',
    githubUrl: null,
    featured: false,
    category: 'Social',
  },
  {
    id: 'lovingo',
    name: 'Lovingo',
    icon: '💬',
    tagline: 'Talk to your match with AI voice.',
    description: 'Flutter dating app featuring Gemini Live API voice chat, Firebase backend, IAP subscription system, and AdMob monetization.',
    tags: ['Flutter', 'Gemini API', 'Firebase', 'IAP', 'AdMob'],
    status: 'LIVE',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sooubh.lovingo',
    githubUrl: null,
    featured: false,
    category: 'Social',
  },
  {
    id: 'gullycricket',
    name: 'Gully Cricket',
    icon: '🏏',
    tagline: 'Score your local match, no WiFi needed.',
    description: 'Fully offline Flutter cricket scoring app with Riverpod state management, Hive storage, real-time WebSocket multiplayer, AdMob, and floating overlay scoreboard.',
    tags: ['Flutter', 'Riverpod', 'Hive', 'WebSocket', 'AdMob'],
    status: 'LIVE',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sooubh.gullycricket',
    githubUrl: null,
    featured: true,
    category: 'Sports',
  },
  {
    id: 'careai',
    name: 'CARE-AI',
    icon: '👶',
    tagline: 'AI parenting companion.',
    description: 'Flutter + Firebase AI parenting companion app with local encryption for judge demos, Riverpod state management, and Gemini-powered recommendations.',
    tags: ['Flutter', 'Firebase', 'Gemini AI', 'Riverpod', 'AES Encryption'],
    status: 'HACKATHON',
    playStoreUrl: null,
    githubUrl: 'https://github.com/sooubh',
    featured: false,
    category: 'Health',
  },
];

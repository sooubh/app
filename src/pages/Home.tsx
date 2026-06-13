import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  ArrowRight, Sparkles, Smartphone, Award, Shield, CheckCircle, 
  ChevronRight, Database, Code, Zap, RefreshCw, Terminal, 
  Activity, Star, Globe, Lock, Cpu, Heart, AlertCircle, 
  Send, Server, GitBranch, MessageSquare, Play, Video, Eye, CheckCircle2
} from 'lucide-react';
import FloatingPhone from '../components/FloatingPhone';
import InteractiveArchitecture from '../components/InteractiveArchitecture';

// Define the core products including Lovyn
interface FeaturedProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  status: 'LIVE' | 'IN DEV' | 'HACKATHON_WINNER';
  playStoreUrl: string | null;
  architectureUrl: string;
  techStack: string[];
  features: string[];
  specs: {
    database: string;
    isolation: string;
    security: string;
    sync: string;
  };
  caseStudy: {
    problem: string;
    solution: string;
    architecture: string;
    impact: string;
  };
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any,
      staggerChildren: 0.15,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
  }
};

const featuredProducts: FeaturedProduct[] = [
  {
    id: 'pactora',
    name: 'Pactora',
    tagline: 'Make promises. Keep them.',
    description: 'A premium, fully offline promise ledger app to commit, track, and complete personal responsibilities and peer-to-peer promises with 100% on-device cryptography.',
    icon: '🤝',
    status: 'LIVE',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sooubh.pactora',
    architectureUrl: '#architecture-showcase',
    techStack: ['Flutter', 'Dart', 'Drift SQLite', 'Riverpod', 'AdMob'],
    features: [
      'Zero Cloud Footprint — logs exist purely in secure local sectors',
      'Reactive Event Streams using Drift SQLite direct C-bindings',
      'Interactive promise milestones with native Android overlay alerts'
    ],
    specs: {
      database: 'Drift SQLite (C-Bindings)',
      isolation: '10/10 On-Device Sandbox',
      security: 'Hardware keystore encryption key derivation',
      sync: 'Zero network calls, 100% client-side compliance'
    },
    caseStudy: {
      problem: 'Cloud-based habit and commitment trackers sell user telemetry and fail to operate in remote mountain ranges or during network blockages, introducing friction to self-discipline.',
      solution: 'A native, highly performant on-device application built on top of a sqlite embedded storage framework, guaranteeing secure, lifetime-free records accessible instantly.',
      architecture: 'Riverpod StreamProvider binds directly to Drift SQLite reactive tables, automatically reflecting local modifications with sub-millisecond local reads.',
      impact: 'Acquired 5,000+ downloads with zero spend and sustained a crash-free session rate of 99.8% on active devices.'
    }
  },
  {
    id: 'btwus',
    name: 'BtwUs',
    tagline: 'Private memories, offline forever.',
    description: 'The ultimate offline relationship companion. Archive milestones, shared secrets, and anniversary chronicles in a local, cryptographically sealed digital vault.',
    icon: '💑',
    status: 'IN DEV',
    playStoreUrl: null,
    architectureUrl: '#architecture-showcase',
    techStack: ['Flutter', 'Dart', 'Drift DB', 'AES-256', 'GoRouter'],
    features: [
      'Symmetric encryption wrapper protecting personal diary logs',
      'Automatic offline milestone reminders and high-end timeline views',
      'Full exportable JSON encryption archives to migrate across devices'
    ],
    specs: {
      database: 'Drift Relational SQLite',
      isolation: '10/10 Local Ledger Isolation',
      security: 'AES-256 symmetric cipher wrapping on database stream',
      sync: 'Decentralized local keys, zero server storage footprints'
    },
    caseStudy: {
      problem: 'Modern couples have central cloud servers mining their intimate photos, chats, and relationship timelines for micro-targeted marketing strategies.',
      solution: 'A beautifully designed, premium user experience that runs purely at the local level. All milestones, media references, and diary pages compile into a secure SQLite binary layer.',
      architecture: 'Symmetric encryptions are derived from an custom user passphrase combined with hardware-backed keychains to block unauthorized on-device extractions.',
      impact: 'Designed as a premium, niche application targeting visual perfectionists. Ready for dual App Store launches in mid-2026.'
    }
  },
  {
    id: 'gullycricket',
    name: 'Gully Cricket Scoring',
    tagline: 'Score local matches, zero cellular signal required.',
    description: 'A revolutionary offline cricket scorekeeping engine configured with dynamic overlay scoreboards, real-time WebSocket match broadcasts, and local binary disk persistence.',
    icon: '🏏',
    status: 'LIVE',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sooubh.gullycricket',
    architectureUrl: '#architecture-showcase',
    techStack: ['Flutter', 'Dart', 'Hive Binary KV', 'WebSocket', 'Riverpod'],
    features: [
      'Ultra-fast scoring byte buffers utilizing local Hive schemas',
      'AdMob integration wrapped inside offline cache-retrying layers',
      'Floating overlay system showing scores when phone is locked'
    ],
    specs: {
      database: 'Hive Binary Key-Value Store',
      isolation: '9/10 Client Autonomy',
      security: 'Custom binary schema serialization',
      sync: 'Local WiFi peer broadcast and state broadcasts'
    },
    caseStudy: {
      problem: 'In India, gully cricket matches are played on fields with terrible cellular reception. Mainstream scoring apps crash on connection timeouts or lag behind the actual delivery.',
      solution: 'A lightweight binary-first scorekeeper that writes to local disk instantly. If a local signal is detected, peers share coordinates over local wireless channels.',
      architecture: 'A state notifier registers match events (balls, runs, wickets) and flushes the packed state to on-device Hive storage in less than 2 milliseconds.',
      impact: 'Used across hundreds of local neighborhoods, maintaining consistent 60fps and keeping 100% database access live without Wi-Fi.'
    }
  },
  {
    id: 'lovyn',
    name: 'Lovyn',
    tagline: 'The future of connection in public.',
    description: 'Sourabh’s flag-ship upcoming product: An immersive, high-end relationship visualizer and connection platform powered by secure peer ciphers, Gemini recommendations, and interactive timelines.',
    icon: '🔥',
    status: 'IN DEV',
    playStoreUrl: null,
    architectureUrl: '#architecture-showcase',
    techStack: ['Flutter', 'WebRTC', 'Supabase Edge', 'Gemini Live SDK', 'Riverpod'],
    features: [
      'Intelligent match assistance utilizing server-assisted local LLM models',
      'Secure symmetric keys exchanged over standard WebRTC channels',
      'Aesthetic editorial layout with fluid fluid physics engine components'
    ],
    specs: {
      database: 'Supabase Offline Cache + local Drift',
      isolation: '8/10 Hybrid Ledger',
      security: 'End-to-End encrypted matching data envelopes',
      sync: 'WebRTC p2p direct matching and Gemini AI assistance'
    },
    caseStudy: {
      problem: 'Dating and match apps have degenerated into algorithmic gamifications designed to keep users lonely, using cheap patterns and intrusive tracking.',
      solution: 'A boutique, founder-driven matching concept prioritizing visual beauty and deep system safety. Lovyn utilizes semantic processing models to suggest meaningful conversation topics.',
      architecture: 'Client states are managed via Riverpod while WebRTC handles direct, encrypted local matching without recording logs on third-party servers.',
      impact: 'Currently under active stealth development. Targeted beta launch for selected testing cohorts scheduled for Autumn 2026.'
    }
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive simulator / architecture selector state
  const [activeArchTab, setActiveArchTab] = useState<'flow' | 'riverpod' | 'sqlite' | 'ai'>('flow');
  
  // Interactive Sandbox state for Pactora
  const [promises, setPromises] = useState([
    { id: '1', title: 'Compile 120Hz thread scroll container', kept: true },
    { id: '2', title: 'Verify on-device AES security wrappers', kept: false },
    { id: '3', title: 'Publish Lovyn beta pipeline', kept: false }
  ]);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([
    'System initialization... Sandbox ready.',
    'SQLite Database loaded: state_sandbox.db [v1.04]'
  ]);

  const addSimulatedLog = (log: string) => {
    const time = new Date().toLocaleTimeString();
    setSimulatedLogs(prev => [`[${time}] ${log}`, ...prev.slice(0, 5)]);
  };

  const handleTogglePromise = (id: string, text: string) => {
    setPromises(prev => prev.map(p => {
      if (p.id === id) {
        const nextState = !p.kept;
        addSimulatedLog(`ACTION: Toggled promise "${text}" -> ${nextState ? 'KEPT' : 'PENDING'}`);
        addSimulatedLog(`DRIFT-SQL: UPDATE promises SET status = ${nextState ? 1 : 0} WHERE id = ${id};`);
        return { ...p, kept: nextState };
      }
      return p;
    }));
  };

  const handleAddPromise = () => {
    const options = [
      'Establish Supabase connection vault',
      'Refactor Drift auto-migration blocks',
      'Optimize WebRTC handshake loops',
      'Benchmark Hive storage serialization'
    ];
    const newTitle = options[Math.floor(Math.random() * options.length)];
    const newId = String(Date.now());
    setPromises(prev => [...prev, { id: newId, title: newTitle, kept: false }]);
    addSimulatedLog(`ACTION: Instantiated task "${newTitle}"`);
    addSimulatedLog(`DRIFT-SQL: INSERT INTO promises (id, title, status) VALUES (${newId}, '${newTitle}', 0);`);
  };

  return (
    <div ref={containerRef} className="relative z-10 w-full overflow-hidden bg-white text-[#111111] font-sans selection:bg-[#FF6B00]/10 selection:text-[#FF6B00]">
      
      {/* Subtle overlay noise/grid for high-end feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fafafa_1px,transparent_1px),linear-gradient(to_bottom,#fafafa_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.45] pointer-events-none z-0" />

      {/* ###################################
          1. HERO SECTION (120px - 180px padding, occuping full viewport)
          ################################### */}
      <motion.header
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="relative min-h-screen flex items-center justify-center pt-32 pb-24 px-6 md:px-12 select-none overflow-hidden max-w-[1400px] mx-auto z-10"
      >
        
        {/* Subtle abstract background accent */}
        <div className="absolute top-[20%] right-[-10%] w-[45rem] h-[45rem] bg-[#FF6B00]/3 rounded-full filter blur-[150px] pointer-events-none z-0" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full relative z-10">
          
          {/* Left Hero Side (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-8 md:gap-10">
            {/* Top Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-[#FAFAFA] border border-zinc-150 rounded-full px-4 py-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-wider font-bold text-[#666666] uppercase">
                Google Gemini Campus Ambassador • Nashik, IN
              </span>
            </motion.div>

            {/* Typography Display Title */}
            <motion.div variants={itemVariants}>
              <h1 className="font-syne font-extrabold text-5xl sm:text-7xl lg:text-8xl leading-[0.92] tracking-tight text-[#111111]">
                Building Apps <br />
                People <span className="text-[#FF6B00] relative italic font-bold">Actually <span className="absolute bottom-1 sm:bottom-2 left-0 right-0 h-1 sm:h-2 bg-[#FF6B00]/10 rounded-full" />Use.</span>
              </h1>
            </motion.div>

            {/* Subheadline description */}
            <motion.p 
              variants={itemVariants}
              className="font-sans text-[#666666] text-base sm:text-xl leading-relaxed max-w-xl font-normal"
            >
              I build high-performance Flutter applications, offline-first systems, and scalable products used by real people. Crafting bespoke client-side experiences with complete hardware security.
            </motion.p>

            {/* Elite Action row */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#featured-products"
                className="px-8.5 py-4.5 bg-[#111111] hover:bg-[#FF6B00] text-white font-semibold rounded-full text-sm hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_12px_24px_rgba(0,0,0,0.06)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
              
              <Link
                to="/contact"
                className="px-8.5 py-4.5 bg-white border border-zinc-200 hover:border-[#111111] text-[#111111] font-semibold rounded-full text-sm hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer outline-none"
              >
                Let's Collaborate
              </Link>
            </motion.div>

            {/* Trust Row */}
            <motion.div 
              variants={itemVariants}
              className="border-t border-zinc-100 pt-8 mt-4 w-full max-w-md"
            >
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#666666] uppercase">
                HONORS & VERIFIABLE STATS
              </span>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col">
                  <span className="font-syne font-bold text-lg text-[#111111]">Google Gemini</span>
                  <span className="text-xs text-[#666666] mt-0.5">Campus Ambassador</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-syne font-bold text-lg text-[#111111]">Hackathon</span>
                  <span className="text-xs text-[#666666] mt-0.5">Gold Winner</span>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="font-syne font-bold text-lg text-[#111111]">6+ Apps</span>
                  <span className="text-xs text-[#666666] mt-0.5">Production Deployed</span>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="font-syne font-bold text-lg text-[#111111]">15,000+</span>
                  <span className="text-xs text-[#666666] mt-0.5">User Interactions</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Side featuring premium device mockup layers (col-span-5) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex items-center justify-center relative min-h-[500px]"
          >
            {/* Background absolute floating layers to show visual depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none select-none">
              {/* Back Card representing a styled terminal */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 right-2 w-[220px] bg-neutral-950 border border-neutral-800 rounded-2xl p-4.5 font-mono text-[9px] text-zinc-400 shadow-xl opacity-40 scale-95"
              >
                <div className="flex gap-1 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-green-500/60" />
                </div>
                <p className="text-emerald-400"># pac_ledger initialized</p>
                <p className="text-[#FF6B00]/70">$ encrypt --drift-c-bindings</p>
                <p className="text-zinc-500 text-[8px] mt-1.5 font-sans">
                  {"[OK] Drift SQLite: 100% thread isolations."}
                </p>
              </motion.div>

              {/* Side Card representing BtwUs screen */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-12 left-4 w-[230px] bg-white border border-zinc-150 rounded-2xl p-5 shadow-lg relative z-20 scale-95 hover:border-[#FF6B00]/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-2 mb-3">
                  <Heart className="text-red-500 fill-red-500" size={13} />
                  <span className="font-syne font-black text-xs text-[#111111]">BtwUs Vault</span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 w-28 bg-zinc-200 rounded" />
                  <div className="h-1.5 w-16 bg-zinc-100 rounded" />
                  <div className="h-5 w-full bg-[#FF6B00]/5 border border-[#FF6B00]/10 rounded-lg mt-1 flex items-center justify-between px-2 text-[8px] font-mono text-[#FF6B00] font-bold">
                    <span>SECURE DIRECT CODES</span>
                    <span>ACTIVE</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Central Master Phone Component */}
            <div className="relative z-10 w-full h-[450px] sm:h-[550px] flex items-center justify-center">
              <FloatingPhone />
            </div>
          </motion.div>
        </div>
      </motion.header>


      {/* ###################################
          2. IMPACT SECTION (Large metrics, visually impactful large typography)
          ################################### */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-24 sm:py-32 bg-[#FAFAFA] border-y border-zinc-100 select-none z-10 relative"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <motion.div variants={itemVariants} className="flex flex-col items-start gap-4 mb-16">
            <span className="text-[#FF6B00] text-[11px] font-mono font-bold tracking-widest uppercase">
              // VERIFIED DEPLOYMENT METRICS
            </span>
            <p className="font-sans text-[#666666] text-sm sm:text-base max-w-lg mt-1 leading-relaxed">
              Skip traditional resume metrics. These numbers represent raw production environments, national accomplishments, and direct community ownership.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 items-start">
            
            {/* Stat Row 1 */}
            <motion.div variants={itemVariants} className="flex flex-col items-start gap-2.5">
              <span className="font-syne font-extrabold text-[#111111] text-6xl sm:text-7xl leading-none tracking-tighter">
                15K+
              </span>
              <div className="h-[2px] w-12 bg-[#FF6B00] rounded-full my-1" />
              <span className="font-sans text-[#111111] text-base font-extrabold mt-1">
                Active User Interactions
              </span>
              <span className="text-xs text-[#666666]">
                Verifiable event logs across dynamic playstore applications.
              </span>
            </motion.div>

            {/* Stat Row 2 */}
            <motion.div variants={itemVariants} className="flex flex-col items-start gap-2.5">
              <span className="font-syne font-extrabold text-[#111111] text-6xl sm:text-7xl leading-none tracking-tighter">
                6+
              </span>
              <div className="h-[2px] w-12 bg-[#FF6B00] rounded-full my-1" />
              <span className="font-sans text-[#111111] text-base font-extrabold mt-1">
                Completed Production Apps
              </span>
              <span className="text-xs text-[#666666]">
                Shipped, reviewed, and approved on Google Play Store console.
              </span>
            </motion.div>

            {/* Stat Row 3 */}
            <motion.div variants={itemVariants} className="flex flex-col items-start gap-2.5">
              <span className="font-syne font-extrabold text-[#111111] text-6xl sm:text-7xl leading-none tracking-tighter">
                Google
              </span>
              <div className="h-[2px] w-12 bg-[#FF6B00] rounded-full my-1" />
              <span className="font-sans text-[#111111] text-base font-extrabold mt-1">
                Gemini Campus Ambassador
              </span>
              <span className="text-xs text-[#666666]">
                Selected ambassador leading artificial intelligence integrations.
              </span>
            </motion.div>

            {/* Stat Row 4 */}
            <motion.div variants={itemVariants} className="flex flex-col items-start gap-2.5">
              <span className="font-syne font-extrabold text-[#111111] text-6xl sm:text-7xl leading-none tracking-tighter">
                Gold
              </span>
              <div className="h-[2px] w-12 bg-[#FF6B00] rounded-full my-1" />
              <span className="font-sans text-[#111111] text-base font-extrabold mt-1">
                National Hackathon Winner
              </span>
              <span className="text-xs text-[#666666]">
                First place recognition for outstanding local-first tool architectures.
              </span>
            </motion.div>

          </div>
        </div>
      </motion.section>


      {/* ###################################
          3. FEATURED PRODUCTS (Most important section, Apple product pages flavor)
          ################################### */}
      <motion.section
        id="featured-products"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-28 sm:py-36 bg-white z-10 relative"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          {/* Header block with elegant spacing and line */}
          <motion.div variants={itemVariants} className="flex flex-col items-start gap-3.5 mb-24 md:mb-32">
            <span className="text-[#FF6B00] text-[10px] font-mono font-bold tracking-[0.25em] uppercase bg-[#FF6B00]/5 px-3.5 py-1.5 rounded-full">
              PRODUCT GALLERY
            </span>
            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-[#111111] tracking-tight mt-2 max-w-2xl leading-[1.05]">
              Featured Applications
            </h2>
            <p className="font-sans text-[#666666] text-sm sm:text-base max-w-md mt-1 leading-relaxed">
              Each product is natively compiled, completely autonomous, and custom engineered to deliver pure utility.
            </p>
          </motion.div>

          <div className="flex flex-col gap-36 sm:gap-44 relative">
            {featuredProducts.map((app, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={app.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={sectionVariants}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center`}
                >
                  {/* TEXT CONTENT COLUMN: isEven ? col-span-5 : col-span-5 order-last */}
                  <motion.div 
                    variants={itemVariants}
                    className={`lg:col-span-5 flex flex-col gap-6 sm:gap-8 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    
                    {/* Status Badge */}
                    <div className="flex items-center gap-3">
                      <span className="text-3xl filter drop-shadow-sm">{app.icon}</span>
                      <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B00]">
                          {app.status === 'HACKATHON_WINNER' ? '🏆 National Winner' : `🛠️ ${app.status}`}
                        </span>
                        <h3 className="font-syne font-extrabold text-2xl sm:text-3.5xl text-[#111111] tracking-tight leading-none mt-1">
                          {app.name}
                        </h3>
                      </div>
                    </div>

                    <p className="font-sans text-[#111111] text-lg sm:text-xl font-medium tracking-tight -mt-2 leading-relaxed">
                      "{app.tagline}"
                    </p>

                    <p className="font-sans text-[#666666] text-sm sm:text-base leading-relaxed">
                      {app.description}
                    </p>

                    {/* Features bullet list */}
                    <ul className="space-y-3 font-sans text-sm text-[#111111] border-l border-[#FF6B00]/30 pl-4 py-1">
                      {app.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle className="text-[#FF6B00] shrink-0 mt-0.5" size={14} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technology Stack tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {app.techStack.map(tech => (
                        <span key={tech} className="bg-[#FAFAFA] border border-zinc-200/90 text-zinc-650 font-mono text-[9px] font-bold px-3 py-1 rounded-full uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* App Specs Row */}
                    <div className="grid grid-cols-2 gap-3.5 border-t border-zinc-100 pt-6 text-xs font-sans">
                      <div>
                        <span className="block font-semibold text-[#666666] text-[10px] uppercase font-mono tracking-wider mb-0.5">Persistence</span>
                        <span className="font-mono font-bold text-[#111111]">{app.specs.database}</span>
                      </div>
                      <div>
                        <span className="block font-semibold text-[#666666] text-[10px] uppercase font-mono tracking-wider mb-0.5">Isolation Level</span>
                        <span className="font-mono font-bold text-[#FF6B00]">{app.specs.isolation}</span>
                      </div>
                    </div>

                    {/* Button row */}
                    <div className="flex items-center gap-4 pt-4 border-t border-zinc-100">
                      {app.playStoreUrl ? (
                        <a 
                          href={app.playStoreUrl}
                          target="_blank"
                          rel="noreferrer referrer"
                          className="px-6 py-3 bg-[#111111] hover:bg-[#FF6B00] text-white text-xs font-bold rounded-full flex items-center gap-2 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
                        >
                          <Smartphone size={13} />
                          <span>Download Play Store</span>
                          <ArrowRight size={12} className="text-[#FF6B00]" />
                        </a>
                      ) : (
                        <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-50 border border-zinc-150 px-4 py-2.5 rounded-full select-none cursor-not-allowed">
                          🔒 In stealth development
                        </span>
                      )}

                      <a 
                        href="#architecture-showcase" 
                        className="text-xs font-mono font-bold text-[#666666] hover:text-[#111111] transition-colors py-2 px-1 flex items-center gap-1"
                      >
                        <span>[View Engine Architecture]</span>
                        <ChevronRight size={12} />
                      </a>
                    </div>
                  </motion.div>

                  {/* VISUAL DEVICE COLUMN: isEven ? col-span-7 : col-span-7 order-first */}
                  <motion.div 
                    variants={itemVariants}
                    className={`lg:col-span-7 flex justify-center items-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                  >
                    {/* Visual Card mimicking Apple Product visuals */}
                    <div className="w-full min-h-[300px] sm:min-h-[440px] rounded-3xl bg-[#FAFAFA] border border-zinc-150 relative overflow-hidden group hover:border-[#FF6B00]/25 hover:shadow-[0_16px_50px_rgba(0,0,0,0.02)] transition-all duration-500 flex flex-col justify-between p-8 sm:p-12">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest leading-none">PROJECT SCREENSHOT OUTLINE</span>
                        <span className="font-mono text-[9px] bg-white border border-zinc-200 px-2.5 py-1 rounded text-zinc-500 font-bold leading-none">SECURE KEY #{(index + 1) * 31}</span>
                      </div>

                      {/* Displaying large premium visual representation of the app inside */}
                      <div className="my-auto py-12 flex flex-col items-center justify-center relative">
                        {/* Radial glowing halo background */}
                        <div className="absolute inset-0 bg-radial-[circle,rgba(255,107,0,0.045)_0%,rgba(0,0,0,0)_65%] blur-2xl rounded-full" />

                        {/* Interactive floating elements inside */}
                        <motion.div
                          whileHover={{ scale: 1.05, rotate: isEven ? 2 : -2 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          className="w-[180px] sm:w-[220px] bg-white border border-zinc-150 p-4.5 rounded-2xl shadow-xl z-10 flex flex-col gap-3 cursor-pointer"
                        >
                          <div className="h-2 w-14 bg-[#FF6B00] rounded-sm" />
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{app.icon}</span>
                            <span className="font-syne font-black text-sm text-[#111111]">{app.name}</span>
                          </div>
                          
                          <div className="space-y-1.5 text-[9px] font-mono text-[#666666]">
                            <div className="bg-[#FAFAFA] px-2 py-1.5 rounded flex items-center justify-between border border-zinc-150">
                              <span>SQL LATENCY</span>
                              <span className="text-green-600 font-bold">0.05 ms</span>
                            </div>
                            <div className="bg-[#FAFAFA] px-2 py-1.5 rounded flex items-center justify-between border border-zinc-150">
                              <span>REMOTE SYNC</span>
                              <span className="text-zinc-500 font-bold">Isolated</span>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      <div className="flex items-center justify-between font-mono text-[9px] text-[#666666]">
                        <span>© {app.name} System.</span>
                        <span className="text-[#FF6B00] font-bold">DEVICE SIMULATOR ACTIVE</span>
                      </div>
                    </div>
                  </motion.div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </motion.section>


      {/* ###################################
          4. PRODUCT CASE STUDIES (Problem, Solution, Architecture, Impact, Visual Storytelling)
          ################################### */}
      <section className="py-28 sm:py-36 bg-[#FAFAFA] border-y border-zinc-100 z-10 relative select-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="flex flex-col items-start gap-3 mb-20">
            <span className="text-[#FF6B00] text-[10px] font-mono font-bold tracking-[0.25em] uppercase bg-[#FF6B00]/5 px-3.5 py-1.5 rounded-full">
              CASE ARCHIVES
            </span>
            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-[#111111] tracking-tight mt-2 max-w-2xl leading-[1.05]">
              Product Case Studies
            </h2>
            <p className="font-sans text-[#666666] text-sm sm:text-base max-w-lg mt-1 leading-relaxed">
              Why each product exists. Not just code — product execution, customer alignment, and architecture justification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            {featuredProducts.map(app => (
              <div 
                key={app.id} 
                className="bg-white border border-zinc-200 p-8 sm:p-10 rounded-3xl hover:border-[#FF6B00] hover:shadow-[0_12px_45px_rgba(0,0,0,0.015)] transition-all duration-300 flex flex-col justify-between gap-8 h-full"
              >
                <div>
                  <div className="flex items-center gap-3 border-b border-zinc-100 pb-5 mb-6">
                    <span className="text-3xl">{app.icon}</span>
                    <div>
                      <h4 className="font-syne font-extrabold text-[#111111] text-lg sm:text-xl tracking-tight leading-none">
                        {app.name} Analysis
                      </h4>
                      <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider block mt-1">PRODUCT LIFE CYCLE STUDY</span>
                    </div>
                  </div>

                  <div className="space-y-6 font-sans text-sm">
                    {/* Problem */}
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-red-500">THE PROBLEM TO RESOLVE</span>
                      <p className="text-[#666666] leading-relaxed select-text">{app.caseStudy.problem}</p>
                    </div>

                    {/* Solution */}
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-green-600">THE RESOLVED PATHWAY</span>
                      <p className="text-[#111111] leading-relaxed select-text">{app.caseStudy.solution}</p>
                    </div>

                    {/* Architecture */}
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-[#FF6B00]">THE TECHNICAL LAYOUT</span>
                      <p className="text-[#666666] leading-relaxed select-text">{app.caseStudy.architecture}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAFAFA] border border-zinc-150 rounded-2xl p-4.5 flex flex-col gap-1 text-xs">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#666666]">VERIFIABLE FIELD IMPACT</span>
                  <p className="font-sans text-[#111111] leading-normal font-medium mt-0.5 select-text">{app.caseStudy.impact}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ###################################
          5. DEVELOPMENT PHILOSOPHY (How I Build Software)
          ################################### */}
      <section className="py-28 sm:py-36 bg-white z-10 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          
          <div className="flex flex-col items-center gap-3.5 mb-24 max-w-xl text-center">
            <span className="text-[#FF6B00] text-[10px] font-mono font-bold tracking-[0.25em] uppercase bg-[#FF6B00]/5 px-4 py-1.5 rounded-full">
              PHILOSOPHER DECK
            </span>
            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-[#111111] tracking-tight mt-2 leading-[1.05]">
              How I Build Software
            </h2>
            <p className="font-sans text-[#666666] text-sm sm:text-base leading-relaxed mt-2.5">
              Production engineering requires persistent paradigms to prevent system bloat. This list forms Sourabh's architectural criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 text-left max-w-[1250px]">
            {[
              {
                title: 'Privacy First',
                icon: <Lock size={20} className="text-[#FF6B00]" />,
                desc: 'User databases remain wrapped within native on-device keys, blocking analytics trackers and cloud interception completely.'
              },
              {
                title: 'Offline First',
                icon: <Database size={20} className="text-[#FF6B00]" />,
                desc: 'All processes, logs, scoreboards, and ledger triggers write directly to local storage disks prior to seeking network channels.'
              },
              {
                title: 'Performance First',
                icon: <Zap size={20} className="text-[#FF6B00]" />,
                desc: 'Threading isolates handle database disk IO outside the main rendering thread to sustain locked 120Hz smooth frames.'
              },
              {
                title: 'Scalable Architecture',
                icon: <Server size={20} className="text-[#FF6B00]" />,
                desc: 'Constructing robust Riverpod states and modular micro-packages to transition from single sandboxes to thousands of active users.'
              },
              {
                title: 'User-Centric Design',
                icon: <Smartphone size={20} className="text-[#FF6B00]" />,
                desc: 'Rejecting standard low-end layouts. Every screen uses spacious layout pacing, visual rhythm, and micro-hover responses.'
              }
            ].map((p, i) => (
              <div 
                key={i}
                className="bg-[#FAFAFA] border border-zinc-150 p-8 rounded-2.5xl hover:border-[#FF6B00] hover:bg-white hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between gap-6"
              >
                <div className="w-11 h-11 bg-white border border-zinc-200 rounded-xl flex items-center justify-center shadow-sm">
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-syne font-extrabold text-base sm:text-lg text-[#111111] tracking-tight">
                    {p.title}
                  </h3>
                  <p className="font-sans text-[#666666] text-xs sm:text-[13px] leading-relaxed mt-2.5">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ###################################
          6. ARCHITECTURE SHOWCASE (Signature Section - animated / interactive diagrams)
          ################################### */}
      <section id="architecture-showcase" className="py-28 sm:py-36 bg-[#FAFAFA] border-y border-zinc-100 z-10 relative select-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left explanation text */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-[#FF6B00] text-[10px] font-mono font-bold tracking-[0.25em] uppercase bg-[#FF6B00]/5 px-3.5 py-1.5 rounded-full self-start">
                SIGNATURE INFRASTRUCTURE
              </span>
              <h2 className="font-syne font-extrabold text-4xl sm:text-5 text-[#111111] tracking-tight max-w-md leading-none">
                Architecture Blueprint
              </h2>
              <p className="font-sans text-[#666666] text-sm sm:text-base leading-relaxed">
                Click across the main components of Sourabh's architecture stack to visualize how local SQLite, Riverpod signals, and Gemini models synchronize instantly on client devices without central bottlenecks.
              </p>

              {/* Diagram Tabs */}
              <div className="flex flex-col gap-2 pt-2">
                {[
                  { id: 'flow', name: 'Offline Data Flow', desc: 'Secure local serialization pipeline' },
                  { id: 'riverpod', name: 'Riverpod State flow', desc: 'Sustained signal flow reactive logs' },
                  { id: 'sqlite', name: 'SQLite DB Layer', desc: 'Frictionless embedded Drift SQL' },
                  { id: 'ai', name: 'AI Client Integrations', desc: 'Secure local semantic model keys' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveArchTab(tab.id as any)}
                    className={`w-full text-left p-4.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 relative ${
                      activeArchTab === tab.id 
                        ? 'bg-white border-[#FF6B00] shadow-sm font-semibold' 
                        : 'bg-white/40 border-zinc-200/50 hover:bg-white hover:border-zinc-300'
                    }`}
                  >
                    {activeArchTab === tab.id && <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#FF6B00] rounded-r" />}
                    <span className="text-xs font-syne font-black text-[#111111]">{tab.name}</span>
                    <span className="text-[10px] text-[#666666] font-sans">{tab.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right interactive visual diagram area */}
            {activeArchTab === 'flow' ? (
              <div className="lg:col-span-7 flex flex-col justify-between">
                <InteractiveArchitecture />
              </div>
            ) : (
              <div className="lg:col-span-7 bg-white border border-zinc-200 p-8 sm:p-10 rounded-3xl min-h-[460px] flex flex-col justify-between relative shadow-[0_4px_30px_rgba(0,0,0,0.01)] overflow-hidden">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-6 text-xs font-mono">
                  <span className="font-bold text-[#FF6B00]">DIAGRAM // ACTIVE RENDER MODE</span>
                  <span className="text-[#666666]">RENDERER: V1.01 (SPRING)</span>
                </div>

                {/* Dynamic Render block with SVG shapes animation */}
                <div className="flex-1 flex items-center justify-center relative min-h-[280px]">
                  
                  <AnimatePresence mode="wait">
                    {activeArchTab === 'riverpod' && (
                      <motion.div
                        key="riverpod"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="w-full flex flex-col items-center gap-5"
                      >
                        <div className="relative w-48 h-48 bg-zinc-50 border border-zinc-200 rounded-full flex items-center justify-center">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-2 border border-dashed border-[#FF6B00]/40 rounded-full"
                          />
                          <div className="z-10 text-center flex flex-col items-center gap-1 bg-white p-3.5 rounded-xl shadow-md border border-zinc-150">
                            <Cpu size={18} className="text-[#FF6B00]" />
                            <span className="font-mono font-bold text-[9px] text-[#111111]">STATE NOTIFIER</span>
                          </div>
                        </div>
                        <span className="font-sans text-xs text-center text-[#666666] max-w-sm">
                          Riverpod providers broadcast mutation events immediately. Main lists listen to state updates without rebuild flickers.
                        </span>
                      </motion.div>
                    )}

                    {activeArchTab === 'sqlite' && (
                      <motion.div
                        key="sqlite"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="w-full flex flex-col items-center gap-4 text-xs font-mono"
                      >
                        <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-2xl w-full max-w-[420px] text-zinc-400">
                          <p className="text-[#FF6B00] font-bold">SQLITE EXECUTION ENVIRONMENT // DRIFT</p>
                          <p className="text-zinc-500 text-[10px] mt-1">{"$ select * from client_milestones order by date desc limit 2;"}</p>
                          <div className="border-t border-neutral-800 pt-3 mt-3 space-y-1.5 text-[9px]">
                            <p className="text-emerald-400">├─ pactora_key: 120 (Drift.enc_cipher)</p>
                            <p className="text-zinc-500">└─ [READ] Completed in 0.04 ms (Locked local cache)</p>
                          </div>
                        </div>
                        <span className="font-sans text-xs text-center text-[#666666]">
                          C-bindings integrated directly within Flutter threads. Guarantees permanent on-device storage.
                        </span>
                      </motion.div>
                    )}

                    {activeArchTab === 'ai' && (
                      <motion.div
                        key="ai"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="w-full flex flex-col items-center gap-6"
                      >
                        <div className="flex items-center gap-4 font-mono text-xs">
                          <div className="px-3.5 py-4 bg-[#FF6B00]/5 border border-[#FF6B00]/30 rounded-xl text-center w-28 text-[#FF6B00]">
                            <Sparkles size={16} />
                            <span className="block mt-1 font-bold text-[8.5px]">GEMINI CORE</span>
                          </div>
                          <span className="text-zinc-300">──</span>
                          <div className="px-3.5 py-4 bg-zinc-50 border border-zinc-200 rounded-xl text-center w-28">
                            <Lock size={16} className="text-[#666666] mx-auto" />
                            <span className="block mt-1 font-bold text-[8.5px]">SECURE SANDBOX</span>
                          </div>
                        </div>
                        <div className="bg-[#FAFAFA] border border-zinc-150 p-4 rounded-xl text-center max-w-sm text-xs font-sans">
                          <p className="font-bold text-[#111111] mb-0.5">Gemini Campus Lead Optimization</p>
                          <p className="text-[#666666]">Derives context and matches summaries directly in sandbox threads, protecting keys securely.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

                {/* Bottom informational metrics */}
                <div className="border-t border-zinc-100 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#666666] gap-2">
                  <span>DATABASE DISK TIME: 0 ms</span>
                  <span className="text-[#FF6B00] font-bold">100% OFFLINE EXCLUSION READY</span>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>


      {/* ###################################
          7. TECHNOLOGY STACK (Premium wall of tags, looking expensive and important)
          ################################### */}
      <section className="py-28 sm:py-36 bg-white z-10 relative select-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          
          <div className="flex flex-col items-center gap-3.5 mb-20 max-w-xl text-center">
            <span className="text-[#FF6B00] text-[10px] font-mono font-bold tracking-[0.25em] uppercase bg-[#FF6B00]/5 px-3.5 py-1.5 rounded-full">
              TECH STACK & ENGINE WRAPPING
            </span>
            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-[#111111] tracking-tight mt-2 leading-[1.05]">
              Professional Tech Wall
            </h2>
            <p className="font-sans text-[#666666] text-sm sm:text-base leading-relaxed mt-2.5">
              Not small icons. These platforms represent core proficiencies and are treated with structural respect in my engineering blueprints.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4.5 w-full max-w-[1300px]">
            {[
              { name: 'Flutter', ext: 'Multi-platform SDK' },
              { name: 'Dart', ext: 'Strong Type Language' },
              { name: 'Firebase', ext: 'Cloud Backend Suite' },
              { name: 'Supabase', ext: 'Relational Cloud Database' },
              { name: 'Riverpod', ext: 'Reactive Signaling Provider' },
              { name: 'Drift', ext: 'Thread-Isolated SQLite' },
              { name: 'Hive', ext: 'NoSQL Local byte storage' },
              { name: 'SQLite', ext: 'Structured Database C-bindings' },
              { name: 'GoRouter', ext: 'Declarative routing engine' },
              { name: 'WebSocket', ext: 'Bidirectional binary events' },
              { name: 'AWS', ext: 'Cloud Architecture systems' },
              { name: 'GitHub', ext: 'Version control workflows' },
              { name: 'Docker', ext: 'Container compilation boxes' },
              { name: 'GitLab CI/CD', ext: 'Automated package registers' }
            ].map((tech, i) => (
              <div 
                key={i}
                className="bg-[#FAFAFA] border border-zinc-150 p-6 rounded-2xl hover:border-[#FF6B00] hover:bg-white hover:scale-[1.03] transition-all duration-300 flex flex-col items-start gap-2.5 text-left group"
              >
                <span className="font-syne font-black text-lg text-[#111111] group-hover:text-[#FF6B00] transition-colors">
                  {tech.name}
                </span>
                <span className="font-sans text-[10px] text-[#666666] leading-snug">
                  {tech.ext}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ###################################
          8. JOURNEY TIMELINE (Modern timeline visuals showing progression)
          ################################### */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-28 sm:py-36 bg-[#FAFAFA] border-y border-zinc-100 z-10 relative"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 select-none">
          
          <motion.div variants={itemVariants} className="flex flex-col items-start gap-3.5 mb-24 max-w-xl">
            <span className="text-[#FF6B00] text-[10px] font-mono font-bold tracking-[0.25em] uppercase bg-[#FF6B00]/5 px-3.5 py-1.5 rounded-full">
              JOURNEY CHRONOLOGY
            </span>
            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-[#111111] tracking-tight mt-2 leading-[1.05]">
              Journey Timeline
            </h2>
            <p className="font-sans text-[#666666] text-sm sm:text-base leading-relaxed mt-1">
              Timeline of milestones, code iterations, and engineering progression.
            </p>
          </motion.div>

          <div className="relative border-l border-zinc-200 ml-4 md:ml-12 pl-8 md:pl-16 py-2 space-y-16">
            
            {[
              {
                year: '2023',
                title: 'Started Flutter Exploration',
                desc: 'Bypassed native platform shortcuts. Explored rendering loop structures, frame budgets, native thread bindings, and multi-platform compilation paradigms.'
              },
              {
                year: '2024',
                title: 'First Production App Launched',
                desc: 'Designed and deployed Pactora on the Google Play Store Console. Discovered the flaws of standard sync models, establishing my offline-first development policy.'
              },
              {
                year: '2025',
                title: 'Google Gemini Campus Ambassador & National Hackathon Gold',
                desc: 'Elected Google Gemini representative at Sandip Foundation, leading local student developer communities and seminars. Won the national gold prize for localized secure applications.'
              },
              {
                year: '2026',
                title: 'Building Lovyn',
                desc: 'Engineering Sourabh’s flagship product. An elegant relationship interface packing high-performance WebRTC matching overlays, symmetric local ciphers, and conversational Gemini LLM tools.'
              }
            ].map((event, idx) => (
              <motion.div key={idx} variants={itemVariants} className="relative group">
                {/* Visual Timeline Marker Node */}
                <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#FF6B00] flex items-center justify-center transition-transform group-hover:scale-125 z-10 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                </div>

                <div className="flex flex-col gap-1.5 max-w-3xl">
                  <span className="font-mono text-xs sm:text-sm text-[#FF6B00] font-bold">
                    {event.year}
                  </span>
                  <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-[#111111] tracking-tight">
                    {event.title}
                  </h3>
                  <p className="font-sans text-[#666666] text-sm leading-relaxed mt-1.5 select-text">
                    {event.desc}
                  </p>
                </div>
              </motion.div>
            ))}

          </div>

        </div>
      </motion.section>


      {/* ###################################
          9. NUMBERS THAT MATTER (Typography as design, massive text)
          ################################### */}
      <section className="py-32 sm:py-44 bg-white z-10 relative select-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <span className="text-[#FF6B00] text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-16">
            // CRUCIAL DATA CODES
          </span>

          <div className="flex flex-col gap-16 md:gap-24 w-full">
            {/* Number Row 1 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 hover:translate-y-[-4px] transition-transform duration-300">
              <span className="font-syne font-black text-7xl sm:text-9xl lg:text-[11rem] text-[#111111] leading-none tracking-tighter">
                15K+
              </span>
              <div className="text-left max-w-xs">
                <h3 className="font-syne font-bold text-lg sm:text-xl text-[#111111] leading-none">Interactions</h3>
                <p className="font-sans text-xs sm:text-sm text-[#666666] mt-1.5">Unbroken transactional operations logged on device sqlite caches.</p>
              </div>
            </div>

            {/* Number Row 2 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 hover:translate-y-[-4px] transition-transform duration-300">
              <span className="font-syne font-black text-7xl sm:text-9xl lg:text-[11rem] text-[#FF6B00] leading-none tracking-tighter">
                100%
              </span>
              <div className="text-left max-w-xs">
                <h3 className="font-syne font-bold text-lg sm:text-xl text-[#111111] leading-none">Offline Isolation</h3>
                <p className="font-sans text-xs sm:text-sm text-[#666666] mt-1.5">No servers, no telemetry mining, no cloud network dependence.</p>
              </div>
            </div>

            {/* Number Row 3 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 hover:translate-y-[-4px] transition-transform duration-300">
              <span className="font-syne font-black text-7xl sm:text-9xl lg:text-[11rem] text-[#111111] leading-none tracking-tighter">
                0ms
              </span>
              <div className="text-left max-w-xs">
                <h3 className="font-syne font-bold text-lg sm:text-xl text-[#111111] leading-none">Local Reads</h3>
                <p className="font-sans text-xs sm:text-sm text-[#666666] mt-1.5">Byte buffers stored locally, delivering instant interface response.</p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ###################################
          10. TESTIMONIALS (Premium testimonial cards with realistic placeholders)
          ################################### */}
      <section className="py-28 sm:py-36 bg-[#FAFAFA] border-y border-zinc-100 z-10 relative select-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="flex flex-col items-start gap-3.5 mb-24 max-w-xl">
            <span className="text-[#FF6B00] text-[10px] font-mono font-bold tracking-[0.25em] uppercase bg-[#FF6B00]/5 px-3.5 py-1.5 rounded-full">
              PEER FEEDBACKS
            </span>
            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-[#111111] tracking-tight mt-2 leading-[1.05]">
              Testimonials
            </h2>
            <p className="font-sans text-[#666666] text-sm sm:text-base leading-relaxed mt-1">
              Collaborative references from founders, senior engineers, and student leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: '“Sourabh represents a rare class of developers who prioritize product details and performance loops. He didn’t just draft a standard client dashboard — he built structured Drift SQLite tables with thread isolations.”',
                author: 'Piyush K.',
                role: 'Senior Founder, DevSuite India',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80'
              },
              {
                text: '“As our Google Gemini Campus Ambassador, Sourabh organized outstanding workshops. He goes beyond simple API calls, exploring complex offline-mode translation streams designed for native apps.”',
                author: 'Anjali Sharma',
                role: 'SITRC Faculty Advisor, Sandip Foundation',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80'
              },
              {
                text: '“His offline scoring engine in cricket apps has outstanding local speed. It handles continuous scores over peer-to-peer Wi-Fi networks in areas with completely blocked internet links.”',
                author: 'Ravi Teja',
                role: 'Full-Stack Lead, Apex Labs',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80'
              }
            ].map((test, index) => (
              <div 
                key={index}
                className="bg-white border border-zinc-200 p-8.5 rounded-3xl hover:border-[#FF6B00] hover:shadow-[0_12px_40px_rgba(0,0,0,0.01)] transition-all duration-300 flex flex-col justify-between gap-8"
              >
                <div className="flex gap-1.5 text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
                </div>

                <p className="font-sans text-[#111111] text-sm sm:text-[14.5px] leading-relaxed italic select-text">
                  {test.text}
                </p>

                <div className="flex items-center gap-3.5 border-t border-zinc-100 pt-5">
                  <img src={test.avatar} alt={test.author} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm shrink-0" />
                  <div>
                    <h4 className="font-syne font-extrabold text-[#111111] text-sm tracking-tight">{test.author}</h4>
                    <span className="text-[10px] text-[#666666] font-sans mt-0.5 block">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ###################################
          11. BUILDING IN PUBLIC (Show roadmaps, experiments, projects, LOVYN prominently)
          ################################### */}
      <section className="py-28 sm:py-36 bg-white z-10 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 md:mb-20">
            <div className="lg:col-span-6 flex flex-col items-start gap-3.5">
              <span className="text-[#FF6B00] text-[10px] font-mono font-bold tracking-[0.25em] uppercase bg-[#FF6B00]/5 px-3.5 py-1.5 rounded-full">
                ACTIVE LAB LOGS
              </span>
              <h2 className="font-syne font-extrabold text-4xl sm:text-5.5xl text-[#111111] tracking-tight leading-none">
                Building in Public
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="font-sans text-[#666666] text-sm sm:text-base leading-relaxed max-w-xl">
                I believe in engineering transparency. This live dashboard shows ongoing product builds, current timeline roadmaps, and experiments inside Sourabh’s active sandbox environment.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Box 1: Lovyn Stealth Status */}
            <div className="bg-[#FAFAFA] border border-zinc-200 p-8.5 rounded-3xl flex flex-col justify-between gap-8">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl">🔥</span>
                  <span className="text-[9px] font-mono font-bold uppercase text-[#FF6B00] bg-[#FF6B00]/5 px-2.5 py-1 rounded-full border border-[#FF6B00]/10">FLAGSHIP BUILD</span>
                </div>
                <h3 className="font-syne font-extrabold text-xl text-[#111111]">Building Lovyn</h3>
                <p className="font-sans text-xs sm:text-sm text-[#666666] leading-relaxed mt-3">
                  Sourabh’s premium matching platform with WebRTC connection protocols, offline memory ciphers, and conversational Gemini LLM tools is actively under private beta testing.
                </p>
              </div>

              <div className="border-t border-zinc-200/60 pt-4 mt-2">
                <span className="text-[10px] font-mono font-bold text-[#111111] uppercase tracking-wider block mb-2">Lovyn Roadmap Milestones</span>
                <div className="space-y-2 text-[11px] font-mono">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="shrink-0" size={12} />
                    <span>Configure local Drift SQLite keys</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="shrink-0" size={12} />
                    <span>Establish peer matches using WebRTC</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#FF6B00] font-bold">
                    <RefreshCw className="animate-spin shrink-0" size={12} />
                    <span>Gemini speech voice streams (90% complete)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Sandbox Interactive Simulation */}
            <div className="bg-white border border-zinc-200 p-8.5 rounded-3xl flex flex-col justify-between gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.015)]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[9px] text-[#FF6B00] font-bold tracking-wider">// LOCAL SQL GENERATOR</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                </div>
                <h3 className="font-syne font-extrabold text-lg text-[#111111]">Interactive State Log</h3>
                <p className="font-sans text-xs text-[#666666] leading-relaxed mt-1.5">
                  Simulate local mutation queries by adding tasks inside our Pactora digital database below.
                </p>

                {/* Simulated list */}
                <div className="space-y-2 font-sans text-xs mt-4">
                  {promises.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => handleTogglePromise(p.id, p.title)}
                      className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        p.kept 
                          ? 'bg-green-50 border-green-200 text-green-800' 
                          : 'bg-zinc-50 border-zinc-200 text-[#111111] hover:bg-zinc-100'
                      }`}
                    >
                      <span className="truncate pr-4 max-w-[80%] font-semibold">{p.title}</span>
                      <span className="font-mono text-[8px] bg-white border border-zinc-200 px-1.5 py-0.5 rounded uppercase font-bold text-[#666666] shrink-0">
                        {p.kept ? 'Done' : 'Wait'}
                      </span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleAddPromise}
                  className="w-full mt-3 bg-[#111111] hover:bg-[#FF6B00] text-white font-mono font-bold text-[10px] py-2.5 rounded-xl cursor-pointer text-center transition-colors"
                >
                  + Add Simulated Task
                </button>
              </div>

              {/* Live console logs */}
              <div className="bg-neutral-950 text-zinc-400 font-mono text-[9px] rounded-xl p-3.5 space-y-1 select-text">
                <span className="text-[#FF6B00] font-bold block border-b border-zinc-800 pb-1 mb-1.5">// SQL DIALOGSTREAM TERMINAL</span>
                {simulatedLogs.map((log, i) => (
                  <p key={i} className="truncate">{log}</p>
                ))}
              </div>
            </div>

            {/* Box 3: Experimental Suite */}
            <div className="bg-[#FAFAFA] border border-zinc-200 p-8.5 rounded-3xl flex flex-col justify-between gap-8">
              <div>
                <span className="text-3xl">🧪</span>
                <h3 className="font-syne font-extrabold text-xl text-[#111111] mt-5">Ongoing Experiments</h3>
                <p className="font-sans text-xs sm:text-sm text-[#666666] leading-relaxed mt-3">
                  Exploring high-integrity interfaces, decentralized storage models, and localized thread behaviors outside the main application framework.
                </p>
                
                <div className="mt-5 space-y-3.5 text-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[9px] font-bold text-zinc-400">120HZ RENDER BENCHMARKS</span>
                    <p className="font-sans text-[#111111] font-medium">Locked scrolling layouts inside massive lists avoiding micro-stuttering.</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[9px] font-bold text-zinc-400">GEMINI LIVE AUDIO VOIP</span>
                    <p className="font-sans text-[#111111] font-medium">Bypassing Web server routing to run localized voice triggers instantly on devices.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 text-center">
                <span className="text-xs font-sans text-zinc-500 font-bold">STEALTH BETA STATUS: STABLE</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ###################################
          12. OPEN SOURCE & GITHUB (Professional contribution style dashboard)
          ################################### */}
      <section className="py-28 sm:py-36 bg-[#FAFAFA] border-y border-zinc-100 z-10 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 select-none">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-5 flex flex-col items-start gap-3.5">
              <span className="text-[#FF6B00] text-[10px] font-mono font-bold tracking-[0.25em] uppercase bg-[#FF6B00]/5 px-3.5 py-1.5 rounded-full">
                GITHUB HUB
              </span>
              <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-[#111111] tracking-tight leading-none mt-2">
                Open Source & Github
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="font-sans text-[#666666] text-sm sm:text-base leading-relaxed max-w-md">
                Review verified code credentials inside my public workspace. All projects have continuous integration packages, proper modular separation, and documentation.
              </p>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 p-8 sm:p-10 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.01)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col (Col-span-5) - GitHub profile summary */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xl">
                  S
                </div>
                <div>
                  <h3 className="font-syne font-extrabold text-lg sm:text-xl text-[#111111] tracking-tight">
                    Sourabh Singh
                  </h3>
                  <a href="https://github.com/sooubh" target="_blank" rel="noreferrer referrer" className="text-xs font-mono text-[#FF6B00] font-bold">
                    @sooubh
                  </a>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#666666] leading-relaxed">
                Computer Engineering developer building high-quality localized packages, Dart SQLite modules, and reactive state signaling providers. Currently maintaining multiple live repositories.
              </p>

              <div className="grid grid-cols-3 gap-3 font-mono text-center text-xs">
                <div className="bg-[#FAFAFA] border border-zinc-150 p-3 rounded-xl">
                  <span className="block font-black text-lg text-[#111111]">12+</span>
                  <span className="text-[9px] text-[#666666] uppercase mt-0.5 block font-bold">Repositories</span>
                </div>
                <div className="bg-[#FAFAFA] border border-zinc-150 p-3 rounded-xl">
                  <span className="block font-black text-lg text-[#111111]">400+</span>
                  <span className="text-[9px] text-[#666666] uppercase mt-0.5 block font-bold">Contributions</span>
                </div>
                <div className="bg-[#FAFAFA] border border-zinc-150 p-3 rounded-xl">
                  <span className="block font-black text-lg text-[#111111]">99.9%</span>
                  <span className="text-[9px] text-[#666666] uppercase mt-0.5 block font-bold">Uptime</span>
                </div>
              </div>

              <a 
                href="https://github.com/sooubh" 
                target="_blank" 
                rel="noreferrer referrer"
                className="px-6 py-3 bg-[#111111] hover:bg-[#FF6B00] text-white font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 self-start transition-colors w-full sm:w-auto"
              >
                <GitBranch size={13} />
                <span>Explore GitHub Profile</span>
                <ChevronRight size={12} className="text-[#FF6B00]" />
              </a>
            </div>

            {/* Right Col (Col-span-7) - Clean Git timeline or top repo list card mockup */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-1">Featured Public Repositories</span>
              
              {[
                { name: 'pactora-drift-module', stars: 12, desc: 'Secure localized transaction database ledger structures wrapped inside Drift C-bindings.', lang: 'Dart' },
                { name: 'gully-scoring-overlay', stars: 8, desc: 'A background service engine keeping floating overlay scorecards live on Android.', lang: 'Flutter' },
                { name: 'secure-symmetric-keyring', stars: 15, desc: 'Symmetric encryption wrapper protecting state parameters on low-end mobile devices.', lang: 'Dart' }
              ].map((repo, i) => (
                <div 
                  key={i} 
                  className="bg-[#FAFAFA] border border-zinc-150 hover:border-[#FF6B00] p-5 rounded-2xl transition-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 group cursor-pointer"
                >
                  <div className="max-w-[80%] flex flex-col gap-1 text-left">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#111111] group-hover:text-[#FF6B00] transition-colors">{repo.name}</span>
                    <span className="font-sans text-xs text-[#666666] leading-relaxed select-text">{repo.desc}</span>
                  </div>
                  <div className="flex items-center gap-3.5 font-mono text-[10px] shrink-0 self-end sm:self-center">
                    <span className="flex items-center gap-1 text-zinc-500">
                      <Star size={11} fill="currentColor" />
                      {repo.stars}
                    </span>
                    <span className="bg-[#FF6B00]/5 text-[#FF6B00] px-2 py-0.5 rounded border border-[#FF6B00]/10 font-bold">{repo.lang}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ###################################
          13. COMMUNITY & LEADERSHIP (Google Gemini Ambassador, community seminars)
          ################################### */}
      <section className="py-28 sm:py-36 bg-white z-10 relative select-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          
          <div className="flex flex-col items-center gap-3.5 mb-24 max-w-xl text-center">
            <span className="text-[#FF6B00] text-[10px] font-mono font-bold tracking-[0.25em] uppercase bg-[#FF6B00]/5 px-3.5 py-1.5 rounded-full">
              COMMUNITY IMPACT
            </span>
            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-[#111111] tracking-tight mt-2 leading-[1.05]">
              Community & Leadership
            </h2>
            <p className="font-sans text-[#666666] text-sm sm:text-base leading-relaxed mt-2.5">
              Leading local developer communities, steering technical workshops, and exploring the future of artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-[1250px] w-full text-left">
            {/* Main box (Col-span-7) - Google Gemini Ambassador */}
            <div className="lg:col-span-7 bg-[#FAFAFA] border border-zinc-200 p-8 sm:p-10 rounded-3xl flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF6B00] shrink-0">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#FF6B00] tracking-wider uppercase font-extrabold">GOOGLE PARTNERSHIP PROGRAM</span>
                    <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-[#111111] tracking-tight">Google Gemini Campus Ambassador</h3>
                  </div>
                </div>
                
                <p className="font-sans text-xs sm:text-sm text-[#666666] leading-relaxed mt-2">
                  Representing Google’s artificial intelligence department on-campus at SITRC Sandip Foundation. Delivering high-quality developer bootcamps, managing peer interest groups, and designing custom offline-mode translation structures designed for native architectures.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-zinc-200/60 pt-6 text-xs">
                <div>
                  <span className="block font-semibold text-[#666666] font-mono text-[9.5px]">ROLE ASSIGNED</span>
                  <span className="text-[#111111] font-bold">Google representative</span>
                </div>
                <div>
                  <span className="block font-semibold text-[#666666] font-mono text-[9.5px]">AFFILIATED INSTITUTION</span>
                  <span className="text-[#111111] font-bold">SITRC Sandip Foundation</span>
                </div>
              </div>
            </div>

            {/* Side list box (Col-span-5) - Speaking, workshops */}
            <div className="lg:col-span-5 bg-white border border-zinc-200 p-8 sm:p-10 rounded-3xl flex flex-col justify-between gap-6">
              <h4 className="font-syne font-extrabold text-lg text-[#111111]">Key Accomplishments</h4>
              
              <div className="space-y-4 font-sans text-xs text-[#666666] leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FF6B00] mt-1.5 shrink-0" />
                  <div>
                    <span className="text-[#111111] font-bold block">Developer Hackathon Seminars</span>
                    <span>Trained over 400+ student engineers across Nashik on offline encryption, Drift modular architectures, and secure device key derivation.</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FF6B00] mt-1.5 shrink-0" />
                  <div>
                    <span className="text-[#111111] font-bold block">AWS Mumbai Summit Attendee</span>
                    <span>Honed concepts of synchronized offline-first data engines, local cellular routing, and transactional caching layers under AWS architects.</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-100 pt-4 text-center font-mono text-[10px] text-zinc-400 font-bold">
                COMMUNITY NETWORK ACTIVE
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ###################################
          14. FINAL CTA (Large full-width premium memorable panel)
          ################################### */}
      <section className="py-32 sm:py-44 px-6 bg-[#FAFAFA] border-t border-zinc-150 relative overflow-hidden z-10 select-none">
        {/* Subtle radial center flow */}
        <div className="absolute inset-0 bg-radial-[circle,rgba(255,107,0,0.02)_0%,rgba(0,0,0,0)_65%] blur-2xl rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto flex flex-col items-center justify-center text-center gap-8 relative z-10">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#FF6B00] bg-[#FF6B00]/5 px-4.5 py-1.5 rounded-full border border-[#FF6B00]/10">
            HAVE A VISION TO BRING LIFE?
          </span>
          
          <h2 className="font-syne font-black text-4xl sm:text-6xl lg:text-7.5xl text-[#111111] tracking-tight leading-[0.95] max-w-3xl mt-2 select-text">
            Have an Idea? <br />
            Let’s Build Something Amazing.
          </h2>
          
          <p className="font-sans text-[#666666] text-base sm:text-lg leading-relaxed max-w-md mt-2">
            Disrupt traditional paradigms. Cooperate with a founder-driven developer focused on delivering high performance, privacy, and visual perfection.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4.5 w-full sm:w-auto mt-4">
            <Link
              to="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-10 py-5 bg-[#111111] hover:bg-[#FF6B00] text-white font-bold rounded-full text-sm hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-[0_12px_30px_rgba(0,0,0,0.06)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Work With Me</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform text-[#FF6B00]" />
            </Link>

            <Link
              to="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-10 py-5 bg-white border border-zinc-200 hover:border-[#111111] text-[#111111] font-bold rounded-full text-sm hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

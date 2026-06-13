import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Sparkles, Smartphone, Award, Shield, CheckCircle, 
  ChevronDown, ChevronUp, Cpu, Database, Play, Code, Zap, 
  RefreshCw, Terminal, Activity, FileText, Heart, ShieldAlert 
} from 'lucide-react';
import FloatingPhone from '../components/FloatingPhone';
import { apps } from '../data/apps';
import TechTag from '../components/TechTag';

const featuredSpecsMap: Record<string, {
  database: string;
  autonomy: string;
  sync: string;
  noteworthy: string;
}> = {
  pactora: {
    database: 'Drift SQLite (C-bindings)',
    autonomy: '10/10 offline isolation',
    sync: 'Zero network calls, 100% Client-Side sandbox',
    noteworthy: 'Fully persistent local promise ledger with Riverpod streams'
  },
  btwus: {
    database: 'Drift Relational SQLite',
    autonomy: '10/10 offline isolation',
    sync: 'No cloud backups, no data mining',
    noteworthy: 'Local secure relation vault and relationship milestone tracker'
  },
  gullycricket: {
    database: 'Hive Binary KV Storage',
    autonomy: '9/10 local-first routing',
    sync: 'WebSocket match data broadcasts',
    noteworthy: 'Floating dynamic overlay scoreboard running background processes'
  }
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedFeaturedApps, setExpandedFeaturedApps] = useState<Record<string, boolean>>({});
  
  // Interactive Sandbox State
  const [activePlaygroundTab, setActivePlaygroundTab] = useState<'pactora' | 'btwus' | 'gullycricket'>('pactora');
  
  // Simulated Interactive States
  const [pactoraPromises, setPactoraPromises] = useState<{ id: string; title: string; kept: boolean }[]>([
    { id: '1', title: 'Complete SQLite database encryption scheme', kept: true },
    { id: '2', title: 'Compile 120Hz smooth scrolling rendering lists', kept: false },
    { id: '3', title: 'Initiate Google Play Store production release build', kept: false }
  ]);
  
  const [btwusMilestones, setBtwusMilestones] = useState<{ id: string; title: string; date: string }[]>([
    { id: '1', title: 'Our First Match on GoCrush', date: 'Oct 2025' },
    { id: '2', title: 'Shared Private Cipher Vault Keys', date: 'Feb 2026' }
  ]);
  
  const [cricketScore, setCricketScore] = useState({ runs: 42, wickets: 3, balls: 24 });
  const [playgroundLogs, setPlaygroundLogs] = useState<{ id: string; text: string; type: 'system' | 'db' | 'action' }[]>([
    { id: 'init', text: 'System diagnostics online. Sandbox loaded successfully.', type: 'system' }
  ]);

  const addLog = (text: string, type: 'system' | 'db' | 'action') => {
    const time = new Date().toLocaleTimeString();
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    setPlaygroundLogs(prev => [
      { id: uniqueId, text: `[${time}] ${text}`, type },
      ...prev.slice(0, 8) // Limit to 9 recent log events to avoid crowding
    ]);
  };

  const handleTogglePactoraPromise = (id: string, title: string) => {
    setPactoraPromises(prev => prev.map(p => {
      if (p.id === id) {
        const nextKept = !p.kept;
        addLog(`ACTION: Toggled promise "${title}" -> ${nextKept ? 'KEPT' : 'PENDING'}`, 'action');
        addLog(`DRIFT SQL: UPDATE promise_ledger SET kept = ${nextKept ? 1 : 0} WHERE id = '${id}';`, 'db');
        addLog(`DRIFT STREAMS: Broadcast updated ledger state to 1 local active stream consumer.`, 'system');
        return { ...p, kept: nextKept };
      }
      return p;
    }));
  };

  const handleAddPactoraPromise = () => {
    const titles = [
      'Implement binary state stream checkpoints',
      'Optimize on-device AES key exchange logic',
      'Verify 120Hz layout frames during scrolling',
      'Benchmark Hive storage write latency under heavy loads'
    ];
    const newTitle = titles[Math.floor(Math.random() * titles.length)];
    const newId = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    
    setPactoraPromises(prev => [...prev, { id: newId, title: newTitle, kept: false }]);
    addLog(`ACTION: Appended client-side promise task: "${newTitle}"`, 'action');
    addLog(`DRIFT SQL: INSERT INTO promise_ledger (id, title, kept) VALUES ('${newId}', '${newTitle}', 0);`, 'db');
  };

  const handleAddBtwMilestone = () => {
    const milestones = [
      { title: 'Exchanged local Offline Diary key rings', date: 'Today' },
      { title: 'Archived anniversary custom photobook', date: 'Today' },
      { title: 'Tuned personal local micro-messaging loop', date: 'Today' }
    ];
    const choice = milestones[Math.floor(Math.random() * milestones.length)];
    const newId = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setBtwusMilestones(prev => [...prev, { id: newId, ...choice }]);
    addLog(`ACTION: Logged new private relationship memory milestone`, 'action');
    addLog(`AES-256 ENGINE: Cipher key derived securely via local device keychain.`, 'system');
    addLog(`DRIFT SQL: INSERT INTO shared_vault VALUES ('${newId}', ENCRYPT('${choice.title}'), '${choice.date}');`, 'db');
  };

  const handleScoreCricket = (runs: number) => {
    setCricketScore(prev => {
      const nextRuns = prev.runs + runs;
      const nextBalls = prev.balls + 1;
      addLog(`ACTION: Scored +${runs} Run(s) on matching event overlay!`, 'action');
      addLog(`RIVERPOD STATE: ScoreStateNotifier changed -> (Runs: ${nextRuns}, Balls: ${nextBalls})`, 'system');
      addLog(`HIVE DB: Committed match record payload to local binary cache frame #24`, 'db');
      return { ...prev, runs: nextRuns, balls: nextBalls };
    });
  };

  const handleWicketCricket = () => {
    setCricketScore(prev => {
      if (prev.wickets >= 10) {
        addLog(`SYSTEM: Game over, all wickets fell. Tally locked.`, 'system');
        return prev;
      }
      const nextWickets = prev.wickets + 1;
      const nextBalls = prev.balls + 1;
      addLog(`ACTION: Out! Record bowling wicket down.`, 'action');
      addLog(`RIVERPOD STATE: Match stats broadcasted via local WebSocket loop.`, 'system');
      addLog(`HIVE DB: Serialized state frame committed immediately.`, 'db');
      return { ...prev, wickets: nextWickets, balls: nextBalls };
    });
  };

  const handleResetCricket = () => {
    setCricketScore({ runs: 0, wickets: 0, balls: 0 });
    addLog(`ACTION: Scorecard Reset. Pitch cleared.`, 'action');
    addLog(`HIVE DB: Erased binary match state tables successfully.`, 'db');
  };

  // Log active tab changes
  useEffect(() => {
    addLog(`TAB SWITCH: Navigated client context simulator output to *${activePlaygroundTab.toUpperCase()}*`, 'system');
  }, [activePlaygroundTab]);

  const toggleFeaturedAppSpecs = (appId: string) => {
    setExpandedFeaturedApps(prev => ({
      ...prev,
      [appId]: !prev[appId]
    }));
  };

  // Hook for 3D Scroll effects on the phone model (Hero section)
  const { scrollY } = useScroll();
  const phoneScale = useTransform(scrollY, [0, 600], [1, 0.75]);
  const phoneOpacity = useTransform(scrollY, [0, 500], [1, 0.25]);
  const phoneY = useTransform(scrollY, [0, 600], [0, -80]);

  // Get Top 3 featured projects
  const featuredApps = apps.filter(app => app.featured);

  // States for card 3D tilt effects
  const [tilt1, setTilt1] = useState({ x: 0, y: 0 });
  const [tilt2, setTilt2] = useState({ x: 0, y: 0 });
  const [tilt3, setTilt3] = useState({ x: 0, y: 0 });

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const maxTilt = 8;
    const tiltValue = { x: -y * maxTilt, y: x * maxTilt };

    if (cardIndex === 1) setTilt1(tiltValue);
    if (cardIndex === 2) setTilt2(tiltValue);
    if (cardIndex === 3) setTilt3(tiltValue);
  };

  const resetTilt = (cardIndex: number) => {
    const zero = { x: 0, y: 0 };
    if (cardIndex === 1) setTilt1(zero);
    if (cardIndex === 2) setTilt2(zero);
    if (cardIndex === 3) setTilt3(zero);
  };

  // Status Styling
  const getFeaturedStatusStyle = (status: string) => {
    switch (status) {
      case 'LIVE': return 'bg-emerald-50 text-emerald-700 border border-emerald-200/80';
      case 'IN DEV': return 'bg-amber-50 text-amber border border-amber/20';
      default: return 'bg-indigo-50 text-indigo-700 border border-indigo-200/80';
    }
  };

  return (
    <div ref={containerRef} className="relative z-10 w-full overflow-hidden bg-bg">
      
      {/* GLOBAL BACKGROUND METRIC GRID FRAME ACCENTS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.35] pointer-events-none z-0" />

      {/* AMBIENT GLOW BLOBS */}
      <div className="absolute top-[10%] left-[-10%] w-[35rem] h-[35rem] bg-amber-dim/50 rounded-full filter blur-[120px] mix-blend-multiply opacity-40 animate-blob-1 pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[35rem] h-[35rem] bg-orange-100 rounded-full filter blur-[120px] mix-blend-multiply opacity-40 animate-blob-2 pointer-events-none z-0" />

      {/* Hero container */}
      <header className="relative z-10 select-none">
        
        {/* 1. HERO SECTION */}
        <section className="pt-32 sm:pt-40 md:pt-48 pb-20 md:pb-28 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 md:gap-24">
          
          {/* Left: Text Content (58%) */}
          <motion.div
            initial={{ opacity: 0, y: 55 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="w-full lg:w-[58%] flex flex-col items-start gap-8"
          >
            {/* Eyebrow badge */}
            <div className="inline-block transform hover:scale-[1.03] transition-transform duration-300">
              <span className="text-amber text-[11px] font-mono font-bold tracking-[0.25em] uppercase bg-amber-dim px-4.5 py-2.5 rounded-full border border-amber/30 shadow-[0_2px_8px_rgba(234,88,12,0.06)]">
                🚀 GOOGLE GEMINI CAMPUS AMBASSADOR • NASHIK, IN
              </span>
            </div>

            {/* Ultimate Heading */}
            <h1 className="font-syne font-black text-5xl sm:text-7xl lg:text-8.5xl leading-[0.95] tracking-tight text-zinc-950 max-w-2xl">
              Building Apps <br />
              People <span className="text-amber bg-gradient-to-r from-amber to-amber-glow bg-clip-text text-transparent">Actually Use.</span>
            </h1>

            {/* Elite descriptive Subtext */}
            <p className="font-sans text-zinc-650 text-base sm:text-xl leading-relaxed max-w-xl font-normal">
              Flutter developer, system architect, and hackathon pioneer. Specializing in highly performant, 
              local-first architectures and reactive structures that run fully isolated. I ship premium apps 
              to thousands of active users.
            </p>

            {/* CTA row with outstanding spacings */}
            <div className="flex flex-wrap items-center gap-5 mt-4 w-full sm:w-auto">
              <Link
                to="/apps"
                className="w-full sm:w-auto px-10 py-5 bg-amber hover:bg-amber-glow text-white font-bold rounded-full text-base hover:scale-105 active:scale-100 transition-all duration-300 shadow-[0_10px_25px_rgba(234,88,12,0.22)] flex items-center justify-center gap-2 group/btn cursor-pointer select-text border-b-2 border-orange-700"
              >
                <span>Explore Showcase</span>
                <ArrowRight size={18} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/contact"
                className="w-full sm:w-auto px-10 py-5 border border-zinc-300 text-zinc-800 font-bold rounded-full text-base hover:border-amber hover:text-amber hover:bg-amber-dim/10 bg-white shadow-sm transition-all duration-300 flex items-center justify-center cursor-pointer outline-none"
              >
                Let's Collaborate
              </Link>
            </div>

            {/* Stat tags row with dynamic highlights */}
            <div className="flex flex-wrap items-center gap-3.5 mt-8 border-t border-zinc-200/80 pt-8 w-full max-w-xl">
              <div className="bg-white border border-zinc-200 px-5 py-3 rounded-full flex items-center gap-2.5 shadow-sm hover:border-zinc-300 transition-colors">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></span>
                <span className="text-xs text-zinc-700 font-semibold font-mono tracking-wider">6+ PRODUCTION APPS LIVE</span>
              </div>
              <div className="bg-white border border-zinc-200 px-5 py-3 rounded-full flex items-center gap-2 shadow-sm hover:border-zinc-300 transition-colors">
                <Sparkles size={13} className="text-amber" />
                <span className="text-xs text-zinc-700 font-semibold font-mono tracking-wider">PLAY STORE PUBLISHED</span>
              </div>
              <div className="bg-white border border-zinc-200 px-5 py-3 rounded-full flex items-center gap-2 shadow-sm hover:border-zinc-300 transition-colors">
                <Award size={13} className="text-indigo-600" />
                <span className="text-xs text-zinc-700 font-semibold font-mono tracking-wider">HACKATHON GOLD WINNER</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Master 3D Phone Model (42%) */}
          <motion.div
            style={{
              scale: phoneScale,
              opacity: phoneOpacity,
              y: phoneY,
            }}
            className="w-full lg:w-[42%] h-[420px] sm:h-[520px] lg:h-[620px] flex items-center justify-center relative select-none"
          >
            <div className="absolute inset-0 bg-radial-[circle,rgba(234,88,12,0.06)_0%,rgba(0,0,0,0)_65%] blur-3xl rounded-full" />
            <FloatingPhone />
          </motion.div>
        </section>
      </header>

      {/* 2. STATS BAR SECTION */}
      <section className="w-full bg-white/80 border-y border-zinc-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.015)] backdrop-blur-md relative z-10 select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-105px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200"
        >
          {[
            { value: '15,000+', label: 'Active User Interactions' },
            { value: '0.0ms', label: 'Local SQLite Sync Latency' },
            { value: 'SITRC', label: 'CE Sandip Foundation • Nashik' },
            { value: 'AWS', label: 'Summit Attendee & Cloud Architect' }
          ].map((stat, idx) => (
            <div 
              key={stat.label} 
              className={`flex flex-col items-center lg:items-start text-center lg:text-left justify-center ${
                idx > 0 ? 'pt-8 lg:pt-0 lg:pl-12' : 'pb-0'
              }`}
            >
              <span className="font-syne font-black text-4xl lg:text-5xl text-amber leading-none tracking-tighter bg-gradient-to-r from-amber to-orange-700 bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span 
                className="font-sans text-zinc-550 text-sm font-semibold tracking-wide mt-2.5 uppercase text-[11px]"
                dangerouslySetInnerHTML={{ __html: stat.label }}
              />
            </div>
          ))}
        </motion.div>
      </section>

      {/* 3. FEATURED APPS SECTION */}
      <section className="py-28 md:py-36 px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Headings with wide margins */}
        <div className="flex flex-col items-start gap-3 mb-16 md:mb-20">
          <span className="text-amber text-[11px] font-bold tracking-[0.25em] uppercase bg-amber-dim px-3.5 py-1.5 rounded-full border border-amber/20 shadow-sm">
            PRODUCTION ARCHITECTURE SHOWCASE
          </span>
          <h2 className="font-syne font-black text-4xl sm:text-5.5xl text-zinc-950 tracking-tight leading-none mt-2">
            My Featured Applications
          </h2>
          <div className="w-16 h-1 w-20 bg-amber rounded-full mt-3" />
        </div>

        {/* Alternate Side Slide Entries with Expandable Technical Drawer */}
        <div className="flex flex-col gap-16 select-none">
          {featuredApps.map((app, index) => {
            const isEven = index % 2 === 0;
            const tilt = index === 0 ? tilt1 : index === 1 ? tilt2 : tilt3;
            const isExpanded = !!expandedFeaturedApps[app.id];
            const spec = featuredSpecsMap[app.id] || {
              database: 'Drift & SQLite persistence layer',
              autonomy: '9/10 Client Autonomy',
              sync: 'Local device keychains and storage streams',
              noteworthy: 'Custom background services and isolated state pools'
            };
            
            return (
              <motion.div
                key={app.id}
                initial={{ 
                  opacity: 0, 
                  scale: 0.92, 
                  rotateX: 10,
                  rotateY: isEven ? 8 : -8,
                  y: 50 
                }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateX: 0,
                  rotateY: 0,
                  y: 0 
                }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ 
                  type: 'spring',
                  stiffness: 75,
                  damping: 15,
                  mass: 0.95,
                  delay: index * 0.05
                }}
                style={{ transformStyle: 'preserve-3d', transformPerspective: 1200 }}
              >
                <div
                  onMouseMove={(e) => handleTilt(e, index + 1)}
                  onMouseLeave={() => resetTilt(index + 1)}
                  className="bg-white border border-zinc-200/90 hover:border-amber rounded-2xl md:rounded-3xl p-8 md:p-12 flex flex-col-reverse lg:flex-row items-stretch justify-between gap-10 md:gap-14 transition-all duration-300 group shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_45px_rgba(234,88,12,0.06)] relative overflow-visible"
                  style={{
                    transform: isExpanded ? 'none' : `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: isExpanded ? 'border-color 0.3s, background-color 0.3s' : 'border-color 0.3s, transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.3s, box-shadow 0.3s',
                  }}
                >
                  {/* Decorative faint background glow */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-radial-[circle,rgba(234,88,12,0.02)_0%,rgba(0,0,0,0)_70%] pointer-events-none" />

                  {/* Left Side: Info (60%) */}
                  <div className="w-full lg:w-[60%] flex flex-col justify-between items-start gap-8">
                    <div className="flex flex-col items-start gap-4 w-full">
                      <div className="flex items-center gap-4.5">
                        <span className="text-4xl filter drop-shadow-md">{app.icon}</span>
                        <h3 className="font-syne font-black text-3xl sm:text-4xl text-zinc-950 tracking-tight group-hover:text-amber transition-colors duration-300">
                          {app.name}
                        </h3>
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-widest font-extrabold shadow-sm ${getFeaturedStatusStyle(app.status)}`}>
                        {app.status}
                      </span>
                      
                      <p className="font-sans text-zinc-650 text-base sm:text-lg leading-relaxed mt-2.5">
                        {app.description}
                      </p>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                      {/* Collapsible Tech Specifications Section for Home Cards */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="overflow-hidden border-t border-dashed border-zinc-200 pt-6 mt-3"
                          >
                            <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-amber-700 mb-4 flex items-center gap-2">
                              <Sparkles size={12} className="text-amber" />
                              Technical Spec Integration Details
                            </h4>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-600 font-sans">
                              <div className="bg-zinc-50 border border-zinc-200/50 p-3.5 rounded-xl">
                                <span className="block font-semibold text-zinc-400 text-[10px] uppercase font-mono tracking-wider mb-1">Local Client Persistence</span>
                                <span className="font-mono font-bold text-zinc-800">{spec.database}</span>
                              </div>
                              <div className="bg-zinc-50 border border-zinc-200/50 p-3.5 rounded-xl">
                                <span className="block font-semibold text-zinc-400 text-[10px] uppercase font-mono tracking-wider mb-1">On-Device Autonomy</span>
                                <span className="font-mono font-bold text-zinc-800 text-amber">{spec.autonomy}</span>
                              </div>
                              <div className="bg-zinc-50 border border-zinc-200/50 p-3.5 rounded-xl">
                                <span className="block font-semibold text-zinc-400 text-[10px] uppercase font-mono tracking-wider mb-1">Security & Sync Syncing</span>
                                <span className="font-sans text-zinc-700 font-semibold">{spec.sync}</span>
                              </div>
                              <div className="bg-zinc-50 border border-zinc-200/50 p-3.5 rounded-xl">
                                <span className="block font-semibold text-zinc-400 text-[10px] uppercase font-mono tracking-wider mb-1">Custom Architecture Achievement</span>
                                <span className="font-sans text-zinc-700 font-semibold">{spec.noteworthy}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Stack Tags */}
                      <div className="flex flex-wrap gap-2 pt-2 relative z-20">
                        {app.tags.map(tag => (
                          <TechTag key={tag} tag={tag} />
                        ))}
                      </div>

                      {/* Action Row */}
                      <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-zinc-100">
                        {/* PlayStore Button */}
                        {app.playStoreUrl && (
                          <a
                            href={app.playStoreUrl}
                            target="_blank"
                            rel="no-referrer noreferrer"
                            className="bg-zinc-950 hover:bg-zinc-850 hover:scale-[1.02] border border-zinc-950 text-xs font-bold px-6 py-3 rounded-full text-white flex items-center gap-2 transition-all duration-300 shadow-md select-text"
                          >
                            <span>Google Play Store</span>
                            <ArrowRight size={13} className="text-amber" />
                          </a>
                        )}

                        <button
                          onClick={() => toggleFeaturedAppSpecs(app.id)}
                          className="flex items-center gap-1.5 text-xs font-mono tracking-wider font-extrabold text-zinc-500 hover:text-amber transition-colors duration-200 cursor-pointer py-2 px-1 rounded-lg"
                        >
                          <span>{isExpanded ? '[- CLOSE TECH ARCHITECTURE]' : '[+ OPEN TECH ARCHITECTURE]'}</span>
                          {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Mock Visual placeholder gradient (40%) */}
                  <div className="w-full lg:w-[36%] min-h-[220px] lg:min-h-auto rounded-xl md:rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/40 to-white border border-zinc-200 flex items-center justify-center relative overflow-hidden group-hover:border-amber/30 transition-all duration-500">
                    <div className="absolute inset-0 bg-radial-[circle,rgba(234,88,12,0.06)_0%,rgba(0,0,0,0)_60%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="text-8xl group-hover:scale-115 group-hover:rotate-6 transition-transform duration-500 ease-out select-none filter drop-shadow-[0_15px_15px_rgba(234,88,12,0.15)]">
                      {app.icon}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="w-full flex items-center justify-center mt-16 md:mt-20">
          <Link
            to="/apps"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-amber hover:text-orange-600 font-syne font-black text-xl transition-colors group cursor-pointer"
          >
            <span>View Complete Production Sandbox</span>
            <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform duration-200 text-amber" />
          </Link>
        </div>
      </section>

      {/* 4. BRAND NEW SECTION: THE LIVE CLIENT-SIDE PLAYGROUND BOX */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto border-t border-zinc-200/80 relative z-10 select-none bg-zinc-50/50 rounded-3xl mb-12 border border-zinc-100">
        
        {/* Interactive Sandbox Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 px-4">
          <div className="flex flex-col items-start gap-2 max-w-2xl">
            <span className="text-amber text-[10px] font-bold tracking-[0.3em] uppercase bg-amber-dim px-3.5 py-1.5 rounded-full border border-amber/15 shadow-sm">
              LIVE APP PLAYGROUND CONSOLE
            </span>
            <h2 className="font-syne font-black text-4xl sm:text-5.5xl text-zinc-950 tracking-tight leading-none mt-2">
              Run Local Database Syncs
            </h2>
            <p className="font-sans text-zinc-600 text-base leading-relaxed mt-4">
              All my applications are 100% cloud-autonomous, meaning database triggers execute in binary memory or local SQLite binding. 
              Click the selectors below to interact with simulated client states and review compilation queries live!
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono bg-white border border-zinc-200 p-3 rounded-xl shadow-sm self-start shrink-0">
            <Activity className="text-amber animate-pulse" size={14} />
            <span className="text-zinc-600">Client Engine Status: Active sandbox</span>
          </div>
        </div>

        {/* Console layout row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* List of tabs: Left 4 cols */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            {[
              { id: 'pactora', name: 'Pactora SQLite Ledger', desc: 'Secure promise ledger utilizing Drift offline C-bindings.', badge: 'O-N SECURE', icon: '🤝' },
              { id: 'btwus', name: 'BtwUs Crypt Vault', desc: 'Symmetric encryptions to record private anniversary milestones.', badge: 'AES-256', icon: '💑' },
              { id: 'gullycricket', name: 'Gully Cricket Scoring', desc: 'Hive direct byte buffers and dynamic scoreboard layers.', badge: '120HZ COMPLIANT', icon: '🏏' }
            ].map(tab => {
              const isActive = activePlaygroundTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePlaygroundTab(tab.id as any)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-2 relative ${
                    isActive 
                      ? 'bg-white border-amber shadow-[0_10px_25px_rgba(234,88,12,0.05)] translate-x-1.5' 
                      : 'bg-white/40 border-zinc-200/60 hover:bg-white hover:border-zinc-300'
                  }`}
                >
                  {/* Selection Glow Indicator bar */}
                  {isActive && <div className="absolute left-0 top-6 bottom-6 w-1 bg-amber rounded-r-md" />}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-syne font-black text-zinc-900 group-hover:text-amber flex items-center gap-2">
                      <span className="text-lg">{tab.icon}</span>
                      {tab.name}
                    </span>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-dim px-2 rounded-full border border-amber/10">{tab.badge}</span>
                  </div>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed">{tab.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Interactive Screen Simulator: Middle 4 cols */}
          <div className="lg:col-span-4 flex items-center justify-center">
            
            {/* Visual Phone border chassis */}
            <div className="w-[290px] h-[480px] bg-zinc-950 rounded-[44px] p-3 border-4 border-zinc-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] relative overflow-hidden flex flex-col select-none">
              
              {/* Camera Notch island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-30 flex items-center justify-between px-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-900/80"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-950/40"></span>
              </div>

              {/* Front UI container */}
              <div className="flex-1 rounded-[32px] bg-zinc-900 text-white p-4 pt-8 overflow-y-auto font-sans relative z-10 select-none scrollbar-none flex flex-col justify-between">
                
                {/* Simulated Screen Dynamic Routing Render */}
                <div>
                  
                  {/* APP TARGET NAME BAR */}
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                    <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-500 font-bold">
                      {activePlaygroundTab === 'pactora' ? 'Pactora DB' : activePlaygroundTab === 'btwus' ? 'BtwUs Crypt' : 'Gully Live'}
                    </span>
                    <span className="text-[10px] font-mono text-green-400">● Isolated</span>
                  </div>

                  {/* 1. Pactora Ledger UI Screen */}
                  {activePlaygroundTab === 'pactora' && (
                    <div className="space-y-3 animate-fade-in text-xs">
                      <h4 className="font-syne font-bold text-white text-sm mb-1">On-Device Promise Log</h4>
                      <p className="text-zinc-500 text-[10px]">Unbroken records inside app isolated index:</p>
                      
                      <div className="space-y-2">
                        {pactoraPromises.map(p => (
                          <div 
                            key={p.id}
                            onClick={() => handleTogglePactoraPromise(p.id, p.title)}
                            className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                              p.kept 
                                ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300' 
                                : 'bg-zinc-800/50 border-zinc-700/80 text-zinc-300 hover:bg-zinc-800'
                            }`}
                          >
                            <span className="max-w-[75%] truncate leading-snug">{p.title}</span>
                            {p.kept ? (
                              <span className="font-mono text-[9px] bg-emerald-900 px-1.5 py-0.5 rounded text-emerald-200">Kept</span>
                            ) : (
                              <span className="font-mono text-[9px] bg-zinc-700 px-1.5 py-0.5 rounded text-zinc-400">Wait</span>
                            )}
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={handleAddPactoraPromise}
                        className="w-full bg-amber hover:bg-amber-glow text-white text-[10px] font-mono font-bold py-2 rounded-lg mt-3 text-center cursor-pointer transition-all shadow"
                      >
                        + Create Random Commitment
                      </button>
                    </div>
                  )}

                  {/* 2. BtwUs Vault Memory UI */}
                  {activePlaygroundTab === 'btwus' && (
                    <div className="space-y-3 animate-fade-in text-xs">
                      <h4 className="font-syne font-bold text-white text-sm mb-1 flex items-center gap-1">
                        <Heart className="text-pink-500 fill-pink-500 animate-pulse" size={13} />
                        Romantic Vault Entries
                      </h4>
                      <p className="text-zinc-500 text-[10px]">Symmetric local AES memory array:</p>
                      
                      <div className="space-y-2">
                        {btwusMilestones.map(m => (
                          <div 
                            key={m.id}
                            className="bg-purple-950/30 border border-purple-900/50 p-2.5 rounded-xl flex flex-col gap-0.5 relative overflow-hidden"
                          >
                            <span className="font-semibold text-purple-200 truncate pr-8 leading-snug">{m.title}</span>
                            <span className="text-[9px] text-purple-400 font-mono italic">{m.date}</span>
                            <Shield className="absolute right-2.5 top-1/2 -translate-y-1/2 text-purple-500/30" size={12} />
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={handleAddBtwMilestone}
                        className="w-full bg-purple-700 hover:bg-purple-600 text-white text-[10px] font-mono font-bold py-2 rounded-lg mt-4 text-center cursor-pointer transition-all shadow"
                      >
                        + Crypt new Anniversary Note
                      </button>
                    </div>
                  )}

                  {/* 3. Gully Cricket UI Screen */}
                  {activePlaygroundTab === 'gullycricket' && (
                    <div className="space-y-3 animate-fade-in text-xs">
                      <h4 className="font-syne font-bold text-white text-sm mb-1">Gully Match Overlay</h4>
                      
                      {/* Interactive score widget */}
                      <div className="bg-zinc-800 border border-zinc-700 p-3 rounded-xl flex flex-col items-center gap-1.5 text-center my-2">
                        <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">MOCK CRICKET BOARD</span>
                        <div className="text-2xl font-mono font-black text-amber">
                          {cricketScore.runs} <span className="text-zinc-400 text-lg">/ {cricketScore.wickets}</span>
                        </div>
                        <span className="text-[9px] text-zinc-500 font-mono font-semibold">({cricketScore.balls} Balls Bowls • Rate: {cricketScore.balls > 0 ? ((cricketScore.runs * 6) / cricketScore.balls).toFixed(1) : '0.0'})</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <button 
                          onClick={() => handleScoreCricket(4)}
                          className="bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] font-mono leading-none py-2 rounded"
                        >
                          +4 Runs
                        </button>
                        <button 
                          onClick={() => handleScoreCricket(6)}
                          className="bg-indigo-700 hover:bg-indigo-600 text-white text-[10px] font-mono leading-none py-2 rounded"
                        >
                          +6 Runs
                        </button>
                        <button 
                          onClick={handleWicketCricket}
                          className="bg-red-700 hover:bg-red-600 text-white text-[10px] font-mono leading-none py-2 rounded"
                        >
                          Bowl Out!
                        </button>
                        <button 
                          onClick={handleResetCricket}
                          className="bg-zinc-700 hover:bg-zinc-600 text-white text-[10px] font-mono leading-none py-2 rounded"
                        >
                          Reset Board
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom status display */}
                <div className="pt-2 border-t border-zinc-800 text-[9px] text-zinc-600 flex items-center justify-between font-mono">
                  <span>Battery State: Safe</span>
                  <span>100% Offline</span>
                </div>

              </div>

              {/* Ambient device bottom slot */}
              <div className="w-16 h-1 bg-zinc-800 rounded-full mx-auto my-1 absolute bottom-1.5 left-1/2 -translate-x-1/2"></div>
            </div>

          </div>

          {/* Code Log Terminal Output Viewer: Right 4 cols */}
          <div className="lg:col-span-4 flex flex-col border border-zinc-800 rounded-3xl bg-zinc-950 p-6 font-mono text-xs text-zinc-400 shadow-xl relative overflow-hidden">
            
            {/* Header tab */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3.5 mb-4">
              <span className="font-bold text-amber text-[10px] tracking-wider uppercase flex items-center gap-1.5">
                <Terminal size={12} className="text-amber-600 animate-pulse" />
                Live Client Stream Logs
              </span>
              <span className="text-[9px] text-zinc-600">Local-first diagnostics</span>
            </div>

            {/* Simulated scroll list */}
            <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[350px] leading-relaxed scrollbar-none">
              <AnimatePresence initial={false}>
                {playgroundLogs.map((log) => {
                  let badgeColor = 'text-amber';
                  if (log.type === 'db') badgeColor = 'text-green-400';
                  if (log.type === 'system') badgeColor = 'text-blue-400';
                  
                  return (
                    <motion.div 
                      key={log.id} 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[11px] border-b border-zinc-900/60 pb-1.5 last:border-0 select-text"
                    >
                      <span className={`${badgeColor} font-bold mr-1.5`}>
                        {log.type === 'db' ? '└─[SQL]' : log.type === 'system' ? '└─[SYS]' : '└─[ACT]'}
                      </span>
                      <span className="text-zinc-300 font-mono">{log.text}</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Clear button */}
            <button
              onClick={() => setPlaygroundLogs([{ id: 'init', text: 'System logs flushed securely.', type: 'system' }])}
              className="text-right text-[10px] text-zinc-600 hover:text-amber cursor-pointer mt-4 transition-colors font-mono uppercase"
            >
              [ Flush Logs Cache ]
            </button>

          </div>

        </div>

      </section>

      {/* 5. NEW BENTO GRID: ENGINEERING PHILOSOPHY & TOOLKIT */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-200/80 relative z-10">
        
        {/* Headings */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20 px-2">
          <div className="flex flex-col items-start gap-2 max-w-xl">
            <span className="text-amber text-[10px] font-bold tracking-[0.3em] uppercase bg-amber-dim px-3.5 py-1.5 rounded-full border border-amber/15 shadow-sm">
              ENGINEERING PHILOSOPHY & METRICS
            </span>
            <h2 className="font-syne font-black text-4xl sm:text-5.5xl text-zinc-950 tracking-tight mt-2.5">
              Production Standard Ideology
            </h2>
            <div className="w-16 h-1 bg-amber rounded-full mt-2" />
          </div>
          <p className="font-sans text-zinc-650 text-base leading-relaxed max-w-sm mt-3 lg:mt-0 select-none">
            I refuse sandbox shortcuts. Every widget, state model, and background channel must align with professional store deployments.
          </p>
        </div>

        {/* Bento Board Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none font-sans mt-4">
          
          {/* Card 1: Col-span-2 - Offline First */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 bg-white hover:bg-white/95 border border-zinc-200 rounded-3xl p-8 hover:border-amber hover:shadow-[0_15px_35px_rgba(234,88,12,0.04)] transition-all duration-300 flex flex-col justify-between gap-8 group"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/50 flex items-center justify-center text-xl text-amber group-hover:scale-110 transition-transform duration-300">
                <Database size={20} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200/50">
                100% OFFLINE SECURE
              </span>
            </div>
            <div>
              <h3 className="font-syne font-bold text-xl sm:text-2.5xl text-zinc-950 group-hover:text-amber transition-colors">
                The Offline-First Supremacy
              </h3>
              <p className="text-zinc-650 text-sm sm:text-base leading-relaxed mt-3">
                Excessive cloud reliance degrades cellular battery life, introduces connection blockers, and endangers user data privacy. 
                My application systems isolate processing pipelines locally. By binding thread-safe libraries like SQLite or Hive, data writes 
                stay strictly on-device, processing responsive transactions instantly.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-100">
              {['Dart Drift', 'SQLite Bevels', 'Hive Binary Cells', 'AES Encrypter Keyrings'].map(tag => (
                <span key={tag} className="text-[10px] font-mono bg-zinc-50 border border-zinc-200 text-zinc-600 px-3 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Col-span-1 - Ambassador */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white hover:bg-white/95 border border-zinc-200 rounded-3xl p-8 hover:border-amber hover:shadow-[0_15px_35px_rgba(234,88,12,0.04)] transition-all duration-300 flex flex-col justify-between gap-6 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/50 flex items-center justify-center text-xl text-amber group-hover:scale-110 transition-transform duration-300">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-syne font-bold text-xl text-zinc-950 group-hover:text-amber transition-colors">
                Gemini Campus Ambassador
              </h3>
              <p className="text-zinc-650 text-sm leading-relaxed mt-2.5">
                Representing Google Gemini at Sandip Foundation allows me to explore offline-capable AI models. I design systems integrating speech VoIP loops, dynamic on-device translation streams, and intelligent text filters directly inside high-performance client frameworks.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100">
              {['Gemini Live SDK', 'Audio Streaming', 'ML验证', 'Campus Lead'].map(tag => (
                <span key={tag} className="text-[10px] font-mono bg-zinc-50 border border-zinc-200 text-zinc-600 px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Col-span-1 - State */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white hover:bg-white/95 border border-zinc-200 rounded-3xl p-8 hover:border-amber hover:shadow-[0_15px_35px_rgba(234,88,12,0.04)] transition-all duration-300 flex flex-col justify-between gap-6 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/50 flex items-center justify-center text-xl text-amber group-hover:scale-110 transition-transform duration-300">
              <Cpu size={20} />
            </div>
            <div>
              <h3 className="font-syne font-bold text-xl text-zinc-950 group-hover:text-amber transition-colors">
                Reactive Thread-Isolates
              </h3>
              <p className="text-zinc-650 text-sm leading-relaxed mt-2.5">
                Securing a sustained 120Hz smooth scrolling experience requires routing heavy database processes outside the UI loop. 
                I map modular Dart threading isolates, live caching buffers, and Riverpod streaming states to avoid render stutters completely.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100">
              {['Riverpod State', 'Multi-Thread Isolate', 'Binary Caches', 'WebSocket Streams'].map(tag => (
                <span key={tag} className="text-[10px] font-mono bg-zinc-50 border border-zinc-200 text-zinc-600 px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Col-span-2 - Production Ready */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 bg-white hover:bg-white/95 border border-zinc-200 rounded-3xl p-8 hover:border-amber hover:shadow-[0_15px_35px_rgba(234,88,12,0.04)] transition-all duration-300 flex flex-col justify-between gap-8 group"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/50 flex items-center justify-center text-xl text-amber group-hover:scale-110 transition-transform duration-300">
                <Smartphone size={20} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/50">
                PRODUCTION HARDENED
              </span>
            </div>
            <div>
              <h3 className="font-syne font-bold text-xl sm:text-2.5xl text-zinc-950 group-hover:text-amber transition-colors">
                Full-Lifecycle Revenue Compliance
              </h3>
              <p className="text-zinc-650 text-sm sm:text-base leading-relaxed mt-3">
                A premium design requires clean monetization hooks. I structure custom Google AdMob adaptive display card overlays, 
                multi-tier membership pipelines utilizing RevenueCat SDK endpoints, and direct transactional subscription handlers, 
                aligning flawless aesthetics with sustainable production deployments.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-100">
              {['AdMob SDK', 'RevenueCat Hooks', 'PlayStore Release', 'GDPR Integrity'].map(tag => (
                <span key={tag} className="text-[10px] font-mono bg-zinc-50 border border-zinc-200 text-zinc-600 px-3 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 6. ABOUT STRIP SECTION */}
      <section className="py-28 md:py-36 px-6 max-w-7xl mx-auto border-t border-zinc-200/80 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Left: resume details info (55%) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold bg-zinc-100 px-3 py-1 rounded-md">
              BACKGROUND PROFILE
            </span>
            <h2 className="font-syne font-black text-4xl sm:text-5.5xl text-zinc-950 tracking-tight mt-1">
              Who builds this stuff?
            </h2>
            <div className="font-sans text-zinc-650 text-base leading-relaxed flex flex-col gap-5 mt-4">
              <p>
                I am <span className="text-zinc-950 font-extrabold underline decoration-amber decoration-2">Sooubh (Sourabh Singh)</span>, 
                a Computer Engineering researcher and developer at SITRC Sandip Foundation, Nashik. My core dedication is creating clean 
                native mobile ecosystems that treat user data with the ultimate respect.
              </p>
              <p>
                As a persistent builder, my routine focus centers around Flutter-first local environments, persistent database engines, 120Hz scrolling 
                interfaces, dynamic WebSocket scoring integrations, and secure edge computation loops.
              </p>
              <p>
                Beyond serving as Sandip Foundation's Google Gemini Campus Ambassador, I attended AWS Summit Mumbai 2026, which honed my concepts 
                of cloud sync architectures. Every project I deploy is fully real, documented, and responsive.
              </p>
            </div>
          </div>

          {/* Right: Code Block mock (45%) */}
          <div className="lg:col-span-5 h-full w-full">
            <motion.div 
              initial={{ rotate: 1 }}
              whileHover={{ rotate: 0, scale: 1.01 }}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-8 font-mono text-xs sm:text-sm text-zinc-300 shadow-2xl relative overflow-hidden"
            >
              <div className="flex gap-1.5 mb-6 border-b border-zinc-800/80 pb-5">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
              </div>
              
              <div className="space-y-1.5 sm:space-y-2 select-text">
                <p><span className="text-rose-400">const</span> <span className="text-amber font-bold">sooubh</span> = &#123;</p>
                <p className="pl-5 text-zinc-400">
                  <span className="text-sky-400">primaryStack</span>: [
                  <span className="text-emerald-400">'Flutter (Android/iOS)'</span>, 
                  <span className="text-emerald-400">'Dart'</span>, 
                  <span className="text-emerald-400">'SQLite'</span>
                  ],
                </p>
                <p className="pl-5 text-zinc-400">
                  <span className="text-sky-400">loves</span>: <span className="text-emerald-400">'offline-first autonomy 📱'</span>,
                </p>
                <p className="pl-5 text-zinc-400">
                  <span className="text-sky-400">academicInstitution</span>: <span className="text-emerald-400">'SITRC Sandip Foundation'</span>,
                </p>
                <p className="pl-5 text-zinc-400">
                  <span className="text-sky-400">baseLocation</span>: <span className="text-emerald-400">'Nashik, India 🇮🇳'</span>,
                </p>
                <p className="pl-5 text-zinc-400">
                  <span className="text-sky-400">currentStatus</span>: <span className="text-emerald-400">'Shipping production tools'</span>,
                </p>
                <p>&#125;;</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER SECTION */}
      <section className="py-28 md:py-36 px-6 border-t border-zinc-200/80 bg-zinc-950 text-white relative overflow-hidden z-10">
        
        {/* Subtle warm center radial highlight */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-80"
          style={{
            background: 'radial-gradient(circle at center, rgba(234,88,12,0.12) 0%, rgba(0,0,0,0) 55%)',
          }}
        />

        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center gap-8 relative select-none">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-zinc-400 font-bold bg-zinc-800 px-4.5 py-2 rounded-full border border-zinc-700 shadow-sm">
            HAVE A PRODUCTION VENTURE?
          </span>
          <h2 className="font-syne font-black text-4xl sm:text-6xl text-white tracking-tight leading-none mt-2.5">
            Let's build something real.
          </h2>
          <p className="font-sans text-zinc-400 text-lg leading-relaxed max-w-lg select-none">
            Avoid the standard cookie-cutter layouts. I construct high-integrity architectures 
            fully customized to sustain actual app store scales.
          </p>

          <Link
            to="/contact"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-10 py-5 bg-amber hover:bg-amber-glow text-white font-bold rounded-full text-base hover:scale-105 transition-transform duration-300 shadow-2xl mt-4 flex items-center justify-center gap-2 cursor-pointer select-text"
          >
            <span>Get in Touch</span>
            <ArrowRight size={16} className="text-zinc-950 font-bold" />
          </Link>
        </div>
      </section>
    </div>
  );
}

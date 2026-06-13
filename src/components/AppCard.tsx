import { useRef, useState } from 'react';
import { ArrowUpRight, Github, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { AppItem } from '../data/apps';
import { motion, AnimatePresence } from 'motion/react';
import TechTag from './TechTag';

const appDetailsMap: Record<string, {
  dbModel: string;
  syncMechanism: string;
  autonomyRating: string;
  monetization: string;
  notableFeature: string;
}> = {
  pactora: {
    dbModel: 'Drift SQLite (C-bindings)',
    syncMechanism: 'Strict client-only sandbox, 0 network requests',
    autonomyRating: '10/10 Total Autonomy',
    monetization: 'AdMob Interstitials & Banner placements',
    notableFeature: 'Relational database schema for promise tracking without accounts'
  },
  btwus: {
    dbModel: 'Drift Relational SQLite',
    syncMechanism: 'Strict client-only sandbox, 0 server requests',
    autonomyRating: '10/10 Total Autonomy',
    monetization: 'None, fully free offline sandbox',
    notableFeature: 'Encrypted offline memory records and relationship milestones'
  },
  gocrush: {
    dbModel: 'Firestore Local Persistent Cache + SQL',
    syncMechanism: 'Firebase reactive streams + offline automatic resumption',
    autonomyRating: '7/10 Cloud Sync',
    monetization: 'RevenueCat subscription framework + AdMob integrated',
    notableFeature: 'On-device face verification using ML Kit models with custom weights'
  },
  lovingo: {
    dbModel: 'Firebase Persistent Document Cache',
    syncMechanism: 'Full-duplex audio stream via Gemini Live API',
    autonomyRating: '6/10 Live Stream Sync',
    monetization: 'App Store In-App Purchases + Dynamic AdMob anchors',
    notableFeature: 'Continuous low-latency voice-to-voice interaction pipeline'
  },
  gullycricket: {
    dbModel: 'Hive binary documents (high speed KV)',
    syncMechanism: 'Local network WebSockets peer matches broadcast',
    autonomyRating: '9/10 Local-First matching',
    monetization: 'Rewarded dynamic video integrations via AdMob',
    notableFeature: 'Floating background overlay overlay-score service running worker tasks'
  },
  careai: {
    dbModel: 'Safe AES Encrypted local secure storage',
    syncMechanism: 'Local Gemini reasoning models + Firebase private endpoints',
    autonomyRating: '8/10 Encrypted Hybrid',
    monetization: 'None (academic hackathon showcase project)',
    notableFeature: 'Enforces local state keys with secure hardware-backed crypto layers'
  }
};

interface AppCardProps {
  app: AppItem;
  index: number;
}

export default function AppCard({ app, index }: AppCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isExpanded) return; // Disable tilt when expanded for easier reading
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card boundaries
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    
    const maxTilt = 8; // Max tilt degrees
    setTilt({
      x: -y * maxTilt, // tilt X based on relative Y
      y: x * maxTilt,  // tilt Y based on relative X
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Badge stylings based on App Status
  const getStatusStyle = (status: AppItem['status']) => {
    switch (status) {
      case 'LIVE':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'IN DEV':
        return 'bg-amber-50 text-amber border border-amber-200';
      case 'HACKATHON':
        return 'bg-purple-50 text-purple-700 border border-purple-200';
      default:
        return 'bg-zinc-100 text-zinc-600 border border-zinc-200';
    }
  };

  const extraDetails = appDetailsMap[app.id] || {
    dbModel: 'Drift & Local Database persistence',
    syncMechanism: 'Local client pipeline',
    autonomyRating: '8/10 Autonomy',
    monetization: 'Unmonetized',
    notableFeature: 'Custom background widget operations'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateX: 15, y: 55 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ 
        type: 'spring',
        stiffness: 80,
        damping: 16,
        mass: 0.9,
        delay: index * 0.05
      }}
      style={{ transformStyle: 'preserve-3d', transformPerspective: 1200 }}
      className="perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative bg-white/70 hover:bg-white/90 backdrop-blur-md border border-[#E4E4E7] rounded-3xl p-6 overflow-visible transition-all duration-300 group hover:border-amber cursor-pointer flex flex-col justify-between h-full shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(217,119,6,0.05)]"
        style={{
          transform: isExpanded ? 'none' : `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered && !isExpanded ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s, background-color 0.3s',
        }}
      >
        {/* Glow behind card on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(circle at 50% 10%, rgba(217,119,6,0.06) 0%, rgba(0,0,0,0) 60%)',
          }}
        />

        {/* Card Header Content */}
        <div>
          <div className="flex items-center justify-between">
            {/* Round Placeholder App Icon */}
            <div className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-200/60 flex items-center justify-center text-3xl group-hover:scale-105 group-hover:border-amber/50 transition-all duration-300">
              {app.icon}
            </div>

            {/* Status Badge */}
            <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold ${getStatusStyle(app.status)}`}>
              {app.status}
            </span>
          </div>

          {/* App Title */}
          <h3 className="font-syne font-bold text-xl text-zinc-900 mt-5 select-none tracking-tight group-hover:text-amber transition-colors duration-300">
            {app.name}
          </h3>

          {/* Tagline */}
          <p className="font-sans font-medium text-amber text-xs mt-1 font-mono uppercase tracking-wider">
            {app.tagline}
          </p>

          {/* Short Description */}
          <p className="font-sans text-zinc-600 text-sm leading-relaxed mt-3 select-none">
            {app.description}
          </p>
        </div>

        {/* Card Footer Content */}
        <div className="mt-6">
          {/* Tech stack Tags list */}
          <div className="flex flex-wrap gap-1.5 mb-5 relative z-20">
            {app.tags.map((tag) => (
              <TechTag key={tag} tag={tag} />
            ))}
          </div>

          {/* Collapsible Tech Specifications Section */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-t border-dashed border-zinc-200 mt-2 pt-4 mb-4"
              >
                <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-amber-700 mb-3 flex items-center gap-1.5 select-none">
                  <Sparkles size={12} className="text-amber-650" />
                  Technical Specifications
                </h4>
                
                <div className="space-y-2 text-xs font-sans">
                  <div className="grid grid-cols-5 border-b border-zinc-100 pb-1.5">
                    <span className="col-span-2 text-zinc-400 font-medium">Database:</span>
                    <span className="col-span-3 text-zinc-800 font-mono font-medium truncate">{extraDetails.dbModel}</span>
                  </div>
                  <div className="grid grid-cols-5 border-b border-zinc-100 pb-1.5">
                    <span className="col-span-2 text-zinc-400 font-medium">Sync Engine:</span>
                    <span className="col-span-3 text-zinc-800 font-mono font-medium truncate" title={extraDetails.syncMechanism}>{extraDetails.syncMechanism}</span>
                  </div>
                  <div className="grid grid-cols-5 border-b border-zinc-100 pb-1.5">
                    <span className="col-span-2 text-zinc-400 font-medium">Autonomy:</span>
                    <span className="col-span-3 text-amber font-mono font-bold">{extraDetails.autonomyRating}</span>
                  </div>
                  <div className="grid grid-cols-5 border-b border-zinc-100 pb-1.5">
                    <span className="col-span-2 text-zinc-400 font-medium">Monetization:</span>
                    <span className="col-span-3 text-zinc-800 font-mono font-medium truncate">{extraDetails.monetization}</span>
                  </div>
                  <div className="grid grid-cols-5 pt-0.5">
                    <span className="col-span-2 text-zinc-400 font-medium">Unique Spec:</span>
                    <span className="col-span-3 text-zinc-750 font-medium leading-relaxed">{extraDetails.notableFeature}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Row */}
          <div className="border-t border-border-default/85 pt-4 flex items-center justify-between gap-2">
            {/* PlayStore Button or Muted Details */}
            <div className="flex items-center gap-4">
              {app.playStoreUrl ? (
                <a
                  href={app.playStoreUrl}
                  target="_blank"
                  rel="no-referrer noreferrer"
                  className="flex items-center gap-1 text-sm font-medium text-amber hover:text-amber-glow transition-colors duration-200 group/link select-text"
                >
                  <span className="font-bold">Play Store</span>
                  <ArrowUpRight size={15} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                </a>
              ) : (
                <span className="text-xs text-zinc-400 font-mono uppercase tracking-widest flex items-center gap-1 select-none font-semibold">
                  <Sparkles size={11} className="animate-spin text-amber" /> In Dev
                </span>
              )}

              {/* Collapsible details toggle button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="flex items-center gap-1 text-[11px] font-mono tracking-wider font-bold text-zinc-500 hover:text-amber transition-colors duration-200 cursor-pointer"
              >
                <span>{isExpanded ? 'Hide Specs' : 'Show Specs'}</span>
                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            </div>

            {/* GitHub Repo Button */}
            {app.githubUrl ? (
              <a
                href={app.githubUrl}
                target="_blank"
                rel="no-referrer noreferrer"
                className="p-1.5 rounded-lg bg-zinc-100/80 border border-zinc-200 text-zinc-600 hover:text-amber hover:border-amber transition-all duration-200 flex items-center justify-center select-text"
                title="View Source on GitHub"
              >
                <Github size={16} />
              </a>
            ) : (
              <span className="text-xs text-zinc-450 font-bold font-mono">PROPRIETARY</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

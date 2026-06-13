import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, Code, Database, RefreshCw, Zap, ArrowRight, Cpu, Award, Sparkles, Activity, Shield 
} from 'lucide-react';

interface TechTagProps {
  tag: string;
}

const techMap: Record<string, { 
  icon: React.ReactNode; 
  desc: string; 
  color: string;
  bg: string;
}> = {
  'Flutter': {
    icon: <Smartphone size={11} className="text-amber-600" />,
    desc: 'Drive responsive 120Hz native animations and high-performance cross-platform view states.',
    color: 'border-amber-200 text-amber-850',
    bg: 'bg-amber-50/70'
  },
  'Dart': {
    icon: <Code size={11} className="text-orange-600" />,
    desc: 'Highly optimized strongly-typed engine power behind local isolates and streams.',
    color: 'border-orange-200 text-orange-850',
    bg: 'bg-orange-50/70'
  },
  'Drift': {
    icon: <Database size={11} className="text-teal-600" />,
    desc: 'Reactive local SQLite query builder with stream updates for sub-millisecond data pipelines.',
    color: 'border-teal-205 text-teal-850',
    bg: 'bg-teal-50/75'
  },
  'SQLite': {
    icon: <Database size={11} className="text-blue-600" />,
    desc: 'Relational local database engine facilitating highly isolated offline-first user data storage.',
    color: 'border-blue-200 text-blue-850',
    bg: 'bg-blue-50/70'
  },
  'Riverpod': {
    icon: <RefreshCw size={11} className="text-indigo-600" />,
    desc: 'Unidirectional compile-safe state manager feeding caches cleanly through the widget layers.',
    color: 'border-indigo-200 text-indigo-850',
    bg: 'bg-indigo-50/70'
  },
  'AdMob': {
    icon: <Zap size={11} className="text-yellow-600" />,
    desc: 'Integrated AdMob hooks for safe on-device impressions, utilizing banner overlays.',
    color: 'border-yellow-250 text-yellow-850',
    bg: 'bg-yellow-50/70'
  },
  'GoRouter': {
    icon: <ArrowRight size={11} className="text-pink-600" />,
    desc: 'Advanced declarative path-matching router facilitating deep-linking offline state paths.',
    color: 'border-pink-200 text-pink-850',
    bg: 'bg-pink-50/70'
  },
  'Firebase': {
    icon: <Database size={11} className="text-amber-500" />,
    desc: 'Offline persistent document cache synchronization engine with instant resumption logs.',
    color: 'border-amber-200 text-amber-900',
    bg: 'bg-amber-50/60'
  },
  'ML Kit': {
    icon: <Cpu size={11} className="text-purple-600" />,
    desc: 'On-device neural face coordinates mapping pipelines executing real-time verification offline.',
    color: 'border-purple-200 text-purple-850',
    bg: 'bg-purple-50/70'
  },
  'RevenueCat': {
    icon: <Award size={11} className="text-emerald-600" />,
    desc: 'Store subscription manager mapping multi-tier subscription layers with cached signatures.',
    color: 'border-emerald-200 text-emerald-850',
    bg: 'bg-emerald-50/70'
  },
  'Gemini API': {
    icon: <Sparkles size={11} className="text-violet-600" />,
    desc: 'Low-latency full-duplex VoIP audio pipes and client generative interaction interfaces.',
    color: 'border-violet-200 text-violet-850',
    bg: 'bg-violet-50/70'
  },
  'Gemini AI': {
    icon: <Sparkles size={11} className="text-indigo-500" />,
    desc: 'Running advanced smart classifications and dynamic companion prompts completely locally.',
    color: 'border-indigo-205 text-indigo-850',
    bg: 'bg-indigo-50/65'
  },
  'IAP': {
    icon: <Award size={11} className="text-green-600" />,
    desc: 'Google Play Billing integration verifying in-app purchases with fallback validation steps.',
    color: 'border-green-200 text-green-850',
    bg: 'bg-green-50/60'
  },
  'Hive': {
    icon: <Database size={11} className="text-sky-600" />,
    desc: 'Ultra-fast transactional binary structures mapping key-value local state preferences.',
    color: 'border-sky-200 text-sky-850',
    bg: 'bg-sky-50/70'
  },
  'WebSocket': {
    icon: <Activity size={11} className="text-red-500" />,
    desc: 'Simplex match event broadcast loops running parallel socket handlers.',
    color: 'border-red-200 text-red-850',
    bg: 'bg-red-50/65'
  },
  'AES Encryption': {
    icon: <Shield size={11} className="text-purple-700" />,
    desc: 'Cryptographic security layer securing private diary records directly inside sandbox cells.',
    color: 'border-purple-200/80 text-purple-900',
    bg: 'bg-purple-50/60'
  }
};

export default function TechTag({ tag }: TechTagProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tech = techMap[tag] || {
    icon: <Code size={11} className="text-zinc-500" />,
    desc: 'Robust development framework integrated for responsive, native operations.',
    color: 'border-zinc-200 text-zinc-700',
    bg: 'bg-zinc-100/80'
  };

  return (
    <div 
      className="relative z-10"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 border ${tech.color} ${tech.bg} rounded-full text-[10px] font-mono font-bold tracking-wide cursor-help shadow-sm hover:border-amber transition-colors duration-250 select-none`}
      >
        <span>{tech.icon}</span>
        <span>{tag}</span>
      </motion.div>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ x: '-50%' }}
            className="absolute bottom-full left-1/2 mb-3 w-64 p-3.5 bg-zinc-950 text-white border border-zinc-800 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.45)] z-50 pointer-events-none text-left"
          >
            {/* Visual tiny arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-950 pointer-events-none" />

            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded-lg bg-zinc-900 border border-zinc-800">{tech.icon}</span>
              <span className="font-syne font-black text-xs text-amber tracking-tight font-sans">
                {tag}
              </span>
            </div>
            
            <p className="font-sans text-[11px] leading-relaxed text-zinc-300 font-normal">
              {tech.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

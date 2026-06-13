import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, RotateCcw, Smartphone, Database, Cpu, Zap, 
  Activity, CheckCircle2, ChevronRight, Server, Terminal, Lock
} from 'lucide-react';

type FlowStep = 'idle' | 'ui_dispatch' | 'riverpod_process' | 'sqlite_write' | 'sqlite_commit' | 'riverpod_stream' | 'ui_rebuild';
type ActionType = 'commit_promise' | 'record_run' | 'save_anniversary';

interface LogEntry {
  time: string;
  sender: 'FLUTTER' | 'RIVERPOD' | 'SQLITE';
  message: string;
}

export default function InteractiveArchitecture() {
  const [activeStep, setActiveStep] = useState<FlowStep>('idle');
  const [actionType, setActionType] = useState<ActionType>('commit_promise');
  const [speed, setSpeed] = useState<number>(1); // Speed multiplier: 0.5, 1, 1.5
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    { time: '0.00ms', sender: 'FLUTTER', message: 'System ready. Waiting for user payload event...' }
  ]);
  const [dataCount, setDataCount] = useState<number>(3); // Mock state elements count
  
  // Custom interactive data log items
  const actionConfig = {
    commit_promise: {
      title: 'Pactora Promise',
      dataLabel: 'Active Promises',
      actionVerb: 'Commit Responsibility',
      sql: "INSERT INTO promises (id, title, status) VALUES ('p_109', 'Verify hardware keystore', 0);",
      riverpodEvent: 'AddPromiseEvent',
      successMessage: 'Keystore integrity checked. Ledger updated successfully!'
    },
    record_run: {
      title: 'Cricket Run',
      dataLabel: 'Recorded Runs',
      actionVerb: 'Score Ball (6 Runs)',
      sql: "UPDATE match_scoreboard SET runs = runs + 6, ball_count = ball_count + 1 WHERE match_id = 9;",
      riverpodEvent: 'ScoreBallEvent',
      successMessage: 'Runs verified. Dynamic local scoreboards refreshed.'
    },
    save_anniversary: {
      title: 'Lovyn Heartbeat',
      dataLabel: 'Synchronized Dates',
      actionVerb: 'Record Relationship Moment',
      sql: "INSERT INTO love_chronicles (moment_id, type, epoch) VALUES ('m_882', 'Anniversary', 17812903);",
      riverpodEvent: 'SaveChronicleEvent',
      successMessage: 'Passphrase symmetric wrap applied. Encrypted local page flushed.'
    }
  };

  const addLog = (sender: 'FLUTTER' | 'RIVERPOD' | 'SQLITE', message: string, offsetMs: number) => {
    const formattedTime = `${(offsetMs / speed).toFixed(2)}ms`;
    setLogs(prev => [
      { time: formattedTime, sender, message },
      ...prev.slice(0, 15) // Keep top 15 logs
    ]);
  };

  // Run the sequence step-by-step
  useEffect(() => {
    if (!isPlaying) return;

    const currentMultiplier = 1 / speed;
    let timeouts: NodeJS.Timeout[] = [];

    const triggerStep = (step: FlowStep, delayMs: number, onEnter?: () => void) => {
      const pid = setTimeout(() => {
        setActiveStep(step);
        if (onEnter) onEnter();
      }, delayMs * currentMultiplier);
      timeouts.push(pid);
    };

    // 0ms: IDLE to DISPATCH
    setActiveStep('ui_dispatch');
    setLogs([]); // Reset logs for high clarity
    addLog('FLUTTER', `User pressed "${actionConfig[actionType].actionVerb}" button. Initializing reactive pipeline...`, 0);

    // Step 1: UI Dispatch
    triggerStep('riverpod_process', 550, () => {
      addLog('RIVERPOD', `Riverpod [Notifier] intercepts Event: "${actionConfig[actionType].riverpodEvent}"`, 550);
      addLog('RIVERPOD', `StateNotifier transitions state to [LOADING]. UI listeners notified.`, 750);
    });

    // Step 2: Riverpod Process to Database Write
    triggerStep('sqlite_write', 1400, () => {
      addLog('SQLITE', `Compiling secure Drift SQLite transaction statement.`, 1400);
      addLog('SQLITE', `C-bindings: Sending thread isolation write payload...`, 1600);
      addLog('SQLITE', `QUERY: ${actionConfig[actionType].sql}`, 1800);
    });

    // Step 3: SQLite Commit
    triggerStep('sqlite_commit', 2400, () => {
      addLog('SQLITE', `Drift internal transaction thread successfully locks database binary.`, 2400);
      addLog('SQLITE', `Flushed state chunk to secure local sector disk (PDev). 1 row affected.`, 2650);
    });

    // Step 4: Stream Invalidation & Notification
    triggerStep('riverpod_stream', 3300, () => {
      addLog('RIVERPOD', `Drift table stream observer triggers auto-invalidation.`, 3300);
      addLog('RIVERPOD', `StreamProvider emits new reactive data collection. Loading -> Data state.`, 3600);
    });

    // Step 5: View Rebuild
    triggerStep('ui_rebuild', 4200, () => {
      setDataCount(prev => prev + 1);
      addLog('FLUTTER', `Flutter View rebuilds with 120Hz smooth transition.`, 4200);
      addLog('FLUTTER', `SUCCESS: ${actionConfig[actionType].successMessage}`, 4450);
    });

    // Complete pipeline
    const finalPid = setTimeout(() => {
      setIsPlaying(false);
      setActiveStep('idle');
    }, 5000 * currentMultiplier);
    timeouts.push(finalPid);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isPlaying, actionType, speed]);

  const handleStartPipeline = () => {
    if (isPlaying) return;
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep('idle');
    setLogs([
      { time: '0.00ms', sender: 'FLUTTER', message: 'System reset. Ready to launch another pipeline.' }
    ]);
  };

  // Node highlighting helpers
  const isSelected = (step: FlowStep) => activeStep === step;
  const isFlutterGlow = activeStep === 'ui_dispatch' || activeStep === 'ui_rebuild';
  const isRiverpodGlow = activeStep === 'riverpod_process' || activeStep === 'riverpod_stream';
  const isSQLiteGlow = activeStep === 'sqlite_write' || activeStep === 'sqlite_commit';

  return (
    <div id="interactive-architect-widget" className="w-full bg-[#111111] text-[#EEEEEE] border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 lg:gap-8 select-none shadow-[0_24px_60px_rgba(0,0,0,0.55)] relative overflow-hidden">
      
      {/* Absolute futuristic decoration lines */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B00]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#FF6B00]/2 rounded-full blur-2xl pointer-events-none" />

      {/* Title & Speed Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-ping" />
            <h3 className="font-syne font-extrabold text-lg sm:text-xl text-white uppercase tracking-tight">
              Reactive Live Visualizer
            </h3>
          </div>
          <p className="text-xs text-zinc-400 font-sans max-w-md">
            Click an action below to watch simulated bytes flow between Flutter, Riverpod state models, and local SQLite tables with 100% cloud-isolated speed.
          </p>
        </div>

        {/* Speed multiplier selector */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1 text-xs font-mono self-start sm:self-center">
          <span className="text-zinc-500 px-2 uppercase font-bold text-[9px] tracking-wider">SPEED:</span>
          {( [0.5, 1, 2] ).map(s => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2.5 py-1 rounded transition-colors font-bold ${
                speed === s 
                  ? 'bg-[#FF6B00] text-white' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Action Trigger Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(['commit_promise', 'record_run', 'save_anniversary'] as ActionType[]).map(type => (
          <button
            key={type}
            disabled={isPlaying}
            onClick={() => setActionType(type)}
            className={`px-4 py-3 rounded-xl border text-left flex flex-col gap-1.5 transition-all outline-none ${
              actionType === type 
                ? 'bg-[#FF6B00]/5 border-[#FF6B00] text-white shadow-[0_4px_12px_rgba(255,107,0,0.15)] font-bold' 
                : 'bg-[#18181B] border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            } ${isPlaying ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              {type === 'commit_promise' ? '🔐 Offline Ledger' : type === 'record_run' ? '🏏 Live scoring' : '🔥 Stealth Couple'}
            </span>
            <span className="text-xs font-syne font-black transition-colors">
              {actionConfig[type].title}
            </span>
          </button>
        ))}
      </div>

      {/* SVG Animation Block */}
      <div className="relative w-full bg-[#161619] border border-zinc-850 rounded-2xl py-6 px-1 flex flex-col items-center justify-center min-h-[320px] overflow-hidden">
        
        {/* Step progress line badge */}
        <div className="absolute top-3 left-4 bg-zinc-900/80 border border-zinc-800 px-3 py-1 rounded-full text-[9px] font-mono text-zinc-400 flex items-center gap-1.5 z-20">
          <Activity size={10} className="text-[#FF6B00] animate-pulse" />
          <span>STAGE: {activeStep.toUpperCase()}</span>
        </div>

        {/* The Main Dynamic SVG */}
        <svg 
          viewBox="0 0 600 240" 
          className="w-full max-w-[560px] h-auto font-sans z-10"
        >
          <defs>
            {/* Soft glows */}
            <filter id="orange-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Linear gradients for lines */}
            <linearGradient id="gradient-to-right" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#808080" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#808080" stopOpacity="0.3" />
            </linearGradient>
            
            <linearGradient id="gradient-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* BACKGROUND CONNECTOR PATHS */}
          {/* Path 1: Flutter UI -> Riverpod StateNotifier */}
          <path 
            className="transition-all duration-350"
            d="M 125 100 Q 200 45 275 80" 
            stroke={activeStep === 'ui_dispatch' ? '#FF6B00' : '#444446'} 
            strokeWidth={activeStep === 'ui_dispatch' ? '3' : '1.5'}
            strokeDasharray={activeStep === 'ui_dispatch' ? '0' : '5 4'}
            fill="none" 
          />

          {/* Path 2: Riverpod StateNotifier -> SQLite DB write */}
          <path 
            className="transition-all duration-350"
            d="M 325 80 Q 400 45 475 100" 
            stroke={activeStep === 'sqlite_write' ? '#FF6B00' : '#444446'} 
            strokeWidth={activeStep === 'sqlite_write' ? '3' : '1.5'}
            strokeDasharray={activeStep === 'sqlite_write' ? '0' : '5 4'}
            fill="none" 
          />

          {/* Path 3: SQLite table invalidated -> Riverpod StreamProvider */}
          <path 
            className="transition-all duration-350"
            d="M 475 140 Q 400 195 325 160" 
            stroke={activeStep === 'riverpod_stream' ? '#FF6B00' : '#444446'} 
            strokeWidth={activeStep === 'riverpod_stream' ? '3' : '1.5'}
            strokeDasharray={activeStep === 'riverpod_stream' ? '0' : '5 4'}
            fill="none" 
          />

          {/* Path 4: Riverpod StreamProvider -> Flutter UI rebuild */}
          <path 
            className="transition-all duration-350"
            d="M 275 160 Q 200 195 125 140" 
            stroke={activeStep === 'ui_rebuild' ? '#FF6B00' : '#444446'} 
            strokeWidth={activeStep === 'ui_rebuild' ? '3' : '1.5'}
            strokeDasharray={activeStep === 'ui_rebuild' ? '0' : '5 4'}
            fill="none" 
          />


          {/* SIGNAL FLOWING PARTICLES (Drawn only during corresponding steps) */}
          <AnimatePresence>
            {activeStep === 'ui_dispatch' && (
              <motion.path
                d="M 125 100 Q 200 45 275 80"
                stroke="#FF6B00"
                strokeWidth="4.5"
                fill="none"
                strokeDasharray="40 180"
                initial={{ strokeDashoffset: 180 }}
                animate={{ strokeDashoffset: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 / speed, ease: 'easeInOut' }}
              />
            )}
            
            {activeStep === 'sqlite_write' && (
              <motion.path
                d="M 325 80 Q 400 45 475 100"
                stroke="#FF6B00"
                strokeWidth="4.5"
                fill="none"
                strokeDasharray="40 180"
                initial={{ strokeDashoffset: 180 }}
                animate={{ strokeDashoffset: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85 / speed, ease: 'easeInOut' }}
              />
            )}

            {activeStep === 'riverpod_stream' && (
              <motion.path
                d="M 475 140 Q 400 195 325 160"
                stroke="#FF6B00"
                strokeWidth="4.5"
                fill="none"
                strokeDasharray="40 180"
                initial={{ strokeDashoffset: 180 }}
                animate={{ strokeDashoffset: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75 / speed, ease: 'easeInOut' }}
              />
            )}

            {activeStep === 'ui_rebuild' && (
              <motion.path
                d="M 275 160 Q 200 195 125 140"
                stroke="#FF6B00"
                strokeWidth="4.5"
                fill="none"
                strokeDasharray="40 180"
                initial={{ strokeDashoffset: 180 }}
                animate={{ strokeDashoffset: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65 / speed, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>


          {/* ======================================= */}
          {/* NODE A: FLUTTER UI LAYER (LEFT)         */}
          {/* ======================================= */}
          <g transform="translate(45, 40)">
            {/* Shadow & Glow */}
            {isFlutterGlow && (
              <rect x="-8" y="-8" width="96" height="156" rx="16" fill="#FF6B00" opacity="0.15" filter="url(#orange-glow)" />
            )}
            {/* Phone Base frame */}
            <rect 
              x="0" y="0" width="80" height="140" rx="12" 
              fill="#18181B" 
              stroke={isFlutterGlow ? '#FF6B00' : '#2D2D30'} 
              strokeWidth={isFlutterGlow ? '2' : '1'} 
              className="transition-colors duration-300"
            />
            {/* Phone notch */}
            <rect x="25" y="4" width="30" height="6" rx="3" fill="#2D2D30" />
            
            {/* Phone Inner UI Card */}
            <g transform="translate(8, 20)">
              {/* Flutter title */}
              <text x="0" y="8" fill="#FF6B00" fontSize="8" fontWeight="bold" fontFamily="monospace">FLUTTER UI</text>
              <line x1="0" y1="12" x2="64" y2="12" stroke="#2D2D30" strokeWidth="1" />
              
              {/* Event trigger button mock */}
              <rect 
                x="0" y="18" width="64" height="15" rx="3" 
                fill={activeStep === 'ui_dispatch' ? '#FF6B00' : '#27272A'} 
                className="transition-colors duration-200"
              />
              <text 
                x="32" y="28" textAnchor="middle" 
                fill={activeStep === 'ui_dispatch' ? '#FFFFFF' : '#A1A1AA'} 
                fontSize="6" fontWeight="bold"
              >
                {activeStep === 'ui_dispatch' ? 'DISPATCHING...' : actionConfig[actionType].actionVerb.slice(0, 16)}
              </text>

              {/* Stats metric inside view */}
              <rect x="0" y="40" width="64" height="24" rx="4" fill="#212124" />
              <text x="6" y="50" fill="#71717A" fontSize="5.5" fontWeight="bold">{actionConfig[actionType].dataLabel.toUpperCase()}</text>
              <text x="6" y="60" fill="#FFFFFF" fontSize="10" fontWeight="extrabold" className="transition-all">
                {dataCount}
              </text>
              
              {/* Green indicator shown during update */}
              {activeStep === 'ui_rebuild' && (
                <circle cx="54" cy="52" r="3" fill="#22C55E" className="animate-pulse" />
              )}

              {/* Bottom design elements */}
              <line x1="0" y1="72" x2="64" y2="72" stroke="#2D2D30" />
              <rect x="0" y="78" width="64" height="6" rx="2" fill="#212124" />
              <rect x="0" y="88" width="45" height="5" rx="2" fill="#212124" />
              <rect width="8" height="8" rx="4" x="56" y="86" fill="#FF6B00" opacity={activeStep === 'ui_rebuild' ? '1' : '0.15'} />
            </g>
          </g>


          {/* ======================================= */}
          {/* NODE B: RIVERPOD SYSTEM (MIDDLE)        */}
          {/* ======================================= */}
          
          {/* Sub-Node B1: Riverpod Input StateNotifier */}
          <g transform="translate(300, 80)">
            {activeStep === 'riverpod_process' && (
              <circle cx="0" cy="0" r="38" fill="#FF6B00" opacity="0.1" filter="url(#orange-glow)" />
            )}
            <circle 
              cx="0" cy="0" r="30" 
              fill="#18181B" 
              stroke={activeStep === 'riverpod_process' ? '#FF6B00' : '#2D2D30'} 
              strokeWidth={activeStep === 'riverpod_process' ? '2.5' : '1.5'} 
              className="transition-colors duration-300"
            />
            {/* Hexagon detail */}
            <polygon points="0,-12 10.4,-6 10.4,6 0,12 -10.4,6 -10.4,-6" fill="none" stroke="#2A2A2D" strokeWidth="1" />
            <Cpu size={14} x="-7" y="-7" className={activeStep === 'riverpod_process' ? 'text-[#FF6B00] animate-[#animate-pulse-slow]' : 'text-zinc-500'} />
            
            <text x="0" y="16" fill="#A1A1AA" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">RIVERPOD</text>
            <text x="0" y="23" fill={activeStep === 'riverpod_process' ? '#FF6B00' : '#71717A'} fontSize="5.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">STATE NOTIFIER</text>
          </g>

          {/* Sub-Node B2: Riverpod Output StreamProvider */}
          <g transform="translate(300, 160)">
            {activeStep === 'riverpod_stream' && (
              <circle cx="0" cy="0" r="36" fill="#FF6B00" opacity="0.1" filter="url(#orange-glow)" />
            )}
            <circle 
              cx="0" cy="0" r="28" 
              fill="#18181B" 
              stroke={activeStep === 'riverpod_stream' ? '#FF6B00' : '#2D2D30'} 
              strokeWidth={activeStep === 'riverpod_stream' ? '2.5' : '1.5'} 
              className="transition-colors duration-300"
            />
            <Activity size={14} x="-7" y="-7" className={activeStep === 'riverpod_stream' ? 'text-emerald-400' : 'text-zinc-500'} />
            <text x="0" y="14" fill="#A1A1AA" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">RIVERPOD</text>
            <text x="0" y="21" fill={activeStep === 'riverpod_stream' ? '#22C55E' : '#71717A'} fontSize="5.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">STREAM OBSERVER</text>
          </g>

          {/* Internal Riverpod State sync beam */}
          <line 
            x1="300" y1="110" x2="300" y2="132" 
            stroke={isRiverpodGlow ? '#FF6B00' : '#2D2D30'} 
            strokeWidth="1.5" 
            strokeDasharray={isRiverpodGlow ? '0' : '4 3'}
          />


          {/* ======================================= */}
          {/* NODE C: DRIFT SQLITE ENGINE (RIGHT)     */}
          {/* ======================================= */}
          <g transform="translate(475, 55)">
            {/* Database Container Ring Glow */}
            {isSQLiteGlow && (
              <rect x="-8" y="-8" width="91" height="121" rx="14" fill="#FF6B00" opacity="0.08" filter="url(#orange-glow)" />
            )}
            
            {/* Server Frame border */}
            <rect 
              x="0" y="0" width="75" height="105" rx="8" 
              fill="#18181B" 
              stroke={isSQLiteGlow ? '#FF6B00' : '#2D2D30'} 
              strokeWidth={isSQLiteGlow ? '2' : '1'} 
              className="transition-colors duration-300"
            />
            
            {/* Tiny server LED nodes */}
            <circle cx="12" cy="12" r="3" fill="#FF6B00" opacity={isSQLiteGlow ? '1' : '0.2'} className="transition-opacity duration-300" />
            <circle cx="22" cy="12" r="3" fill="#22C55E" opacity={activeStep === 'sqlite_commit' ? '1' : '0.2'} />
            
            <text x="36" y="14" fill="white" fontSize="7.5" fontWeight="bold" fontFamily="monospace">Drift SQLite</text>
            <line x1="8" y1="22" x2="67" y2="22" stroke="#2D2D30" strokeWidth="1" />

            {/* Cylinder Vector Graphic representing database */}
            <g transform="translate(26, 42)" className="transition-transform duration-300">
              {/* Cylinder Back shadow */}
              <ellipse cx="12" cy="6" rx="12" ry="4" fill="#2A2A2F" stroke="#3F3F46" />
              
              <path d="M 0 6 L 0 25 A 12 4 0 0 0 24 25 L 24 6 Z" fill="#212124" stroke="#3F3F46" />
              <ellipse cx="12" cy="25" rx="12" ry="4" fill="#212124" stroke="#3F3F46" />
              
              {/* Glowing active center slice */}
              <ellipse 
                cx="12" cy="15" rx="12" ry="4" 
                fill={activeStep === 'sqlite_commit' ? '#FF6B00' : '#2D2D30'} 
                fillOpacity={activeStep === 'sqlite_commit' ? '0.7' : '0.2'} 
                stroke={activeStep === 'sqlite_commit' ? '#FFBB80' : '#3F3F46'}
                className="transition-all duration-300"
              />
              <Database size={12} x="6" y="5" className={isSQLiteGlow ? 'text-[#FF6B00]' : 'text-zinc-650'} />
            </g>

            {/* SQL Terminal text line */}
            <rect x="8" y="80" width="59" height="18" rx="3" fill="#09090B" stroke="#1F1F23" strokeWidth="1" />
            
            {activeStep === 'sqlite_write' ? (
              <text x="12" y="91" fill="#FF6B00" fontSize="5" fontWeight="bold" fontFamily="monospace">DRIFT: WRITE...</text>
            ) : activeStep === 'sqlite_commit' ? (
              <text x="12" y="91" fill="#22C55E" fontSize="5" fontWeight="bold" fontFamily="monospace" className="animate-pulse">FLUSHING DISK</text>
            ) : (
              <text x="12" y="91" fill="#52525B" fontSize="5" fontWeight="bold" fontFamily="monospace">DB SLEEPING</text>
            )}
            
            {/* Mini byte blocks blinking */}
            <rect x="52" y="85" width="4" height="4" fill={activeStep === 'sqlite_commit' ? '#22C55E' : '#27272A'} />
            <rect x="58" y="85" width="4" height="4" fill={activeStep === 'sqlite_commit' ? '#22C55E' : '#27272A'} />
            <rect x="52" y="91" width="4" height="4" fill={activeStep === 'sqlite_write' ? '#FF6B00' : '#27272A'} />
            <rect x="58" y="91" width="4" height="4" fill={activeStep === 'sqlite_write' ? '#FF6B00' : '#27272A'} />
          </g>

        </svg>

        {/* Play/Control floating widgets */}
        <div className="absolute bottom-4 flex items-center gap-3">
          <button
            onClick={isPlaying ? handleReset : handleStartPipeline}
            className={`cursor-pointer px-5 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all shadow-md mt-2 outline-none ${
              isPlaying 
                ? 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700' 
                : 'bg-white hover:bg-[#FF6B00] text-black hover:text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <RotateCcw size={12} />
                <span>Abort/Reset</span>
              </>
            ) : (
              <>
                <Play size={12} fill="currentColor" />
                <span>Simulate Flow</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terminal log stream of binary logs */}
      <div className="bg-[#0D0D10] border border-zinc-850 rounded-xl p-4 font-mono text-[10px] flex flex-col gap-1.5 h-[140px] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-zinc-855 pb-2 mb-1.5">
          <div className="flex items-center gap-1 text-zinc-500 font-bold uppercase text-[9px]">
            <Terminal size={12} className="text-[#FF6B00]" />
            <span>REAL-TIME TRANSACTION LEDGER</span>
          </div>
          <span className="text-[8px] text-zinc-600">ISOLATION: MONOTONIC</span>
        </div>

        <div className="flex flex-col gap-1 select-text">
          <AnimatePresence>
            {logs.map((log, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-2 leading-relaxed"
              >
                <span className="text-zinc-600 select-none shrink-0">[{log.time}]</span>
                <span className={`font-bold select-none shrink-0 ${
                  log.sender === 'FLUTTER' ? 'text-blue-400' : log.sender === 'RIVERPOD' ? 'text-cyan-400' : 'text-amber-400'
                }`}>
                  [{log.sender}]
                </span>
                <span className="text-zinc-300 break-all">{log.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Highlights checklist on what they are seeing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-zinc-850 pt-5 text-xs text-zinc-400">
        <div className="flex items-start gap-2">
          <CheckCircle2 size={13} className="text-[#FF6B00] mt-0.5 shrink-0" />
          <div>
            <span className="block font-bold text-white mb-0.5">Flutter Threading</span>
            <span>Renders view states purely at 120Hz while offloading SQLite disk operations cleanly.</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 size={13} className="text-[#FF6B00] mt-0.5 shrink-0" />
          <div>
            <span className="block font-bold text-white mb-0.5">Reactive Signals</span>
            <span>Riverpod StreamProvider maintains open listeners to automatically emit sqlite file modifications.</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 size={13} className="text-[#FF6B00] mt-0.5 shrink-0" />
          <div>
            <span className="block font-bold text-white mb-0.5">Hardware Cryptography</span>
            <span>Encrypts byte packets using AES-256 before writing down any data chunks into Drift.</span>
          </div>
        </div>
      </div>

    </div>
  );
}

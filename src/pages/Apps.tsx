import { useState } from 'react';
import { apps } from '../data/apps';
import AppCard from '../components/AppCard';
import { motion, AnimatePresence } from 'motion/react';

type FilterType = 'ALL' | 'LIVE' | 'IN DEV' | 'HACKATHON';

export default function Apps() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'ALL' },
    { label: 'Live', value: 'LIVE' },
    { label: 'In Development', value: 'IN DEV' },
    { label: 'Hackathon', value: 'HACKATHON' },
  ];

  // Filter application listings
  const filteredApps = apps.filter((app) => {
    if (activeFilter === 'ALL') return true;
    return app.status === activeFilter;
  });

  return (
    <div className="relative z-10 w-full min-h-screen pt-24 pb-20 px-6">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto text-center py-16 md:py-20 select-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber font-bold">
            THE APPS
          </span>
          <h1 className="font-syne font-extrabold text-4xl sm:text-5.5xl text-zinc-950 tracking-tight">
            Everything I've Built
          </h1>
          <p className="font-sans text-zinc-600 text-sm sm:text-base leading-relaxed max-w-md">
            Every app here is real, published, and crafted solo. Built offline-first to respect 
            user autonomy.
          </p>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <section className="max-w-7xl mx-auto flex items-center justify-center mb-12 select-none">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white border border-border-default rounded-full shadow-sm"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider font-semibold uppercase transition-all duration-300 outline-none cursor-pointer ${
                  isActive
                    ? 'bg-amber text-white shadow-md shadow-amber/10'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* App Grid */}
      <section className="max-w-7xl mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app, index) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <AppCard app={app} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredApps.length === 0 && (
          <div className="w-full text-center py-24 select-none">
            <p className="text-[#525252] font-mono text-sm uppercase tracking-widest leading-loose">
              NO APPS FOUND MATCHING CRITERIA
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

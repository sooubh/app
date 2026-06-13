import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

interface ContactCardProps {
  label: string;
  value: string;
  link: string;
  icon: React.ReactNode;
}

export default function ContactCard({ label, value, link, icon }: ContactCardProps) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="no-referrer noreferrer"
      whileHover={{ y: -3 }}
      className="flex items-center justify-between p-5 bg-surface border border-border-default hover:border-amber hover:bg-surface-alt rounded-2xl transition-all duration-300 group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
    >
      <div className="flex items-center gap-4">
        {/* Rounded Icon badge wrapper */}
        <div className="w-11 h-11 rounded-full bg-surface-alt border border-border-default flex items-center justify-center text-amber group-hover:scale-105 group-hover:border-amber/50 transition-all duration-300">
          {icon}
        </div>

        {/* Labels info */}
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
            {label}
          </span>
          <span className="block text-zinc-800 font-medium text-sm md:text-base mt-0.5 group-hover:text-amber transition-colors duration-200">
            {value}
          </span>
        </div>
      </div>

      {/* Floating external link indicator arrow */}
      <div className="p-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-400 opacity-60 group-hover:opacity-100 group-hover:text-amber transition-all duration-300 flex items-center justify-center">
        <ExternalLink size={14} />
      </div>
    </motion.a>
  );
}

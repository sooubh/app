import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-6 text-center select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6"
      >
        <h1 className="font-syne font-extrabold text-9xl text-amber leading-none tracking-tighter drop-shadow-lg animate-pulse-slow">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="font-syne font-bold text-2xl text-white">
            This page doesn't exist.
          </h2>
          <p className="font-sans text-text-secondary text-sm max-w-xs mx-auto">
            The path you are looking for has either sailed off or does not exist.
          </p>
        </div>
        <Link
          to="/"
          className="bg-surface hover:bg-surface-alt border border-border-default hover:border-amber text-sm font-medium px-6 py-3 rounded-full text-white hover:text-amber transition-all duration-300 flex items-center gap-2 group shadow-md"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  );
}

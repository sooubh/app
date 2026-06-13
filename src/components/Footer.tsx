import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-default bg-white/40 position-relative py-12 px-6 z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-4">
        {/* Logo Icon */}
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-amber flex items-center justify-center font-bold text-white text-lg transition-transform duration-300 group-hover:scale-105">
            S
          </div>
        </Link>
        <p className="text-center text-xs tracking-wider uppercase text-zinc-600">
          SOOUBH · SHAPING MOBILE INTERFACES
        </p>
        <p className="text-center text-xs text-zinc-400 font-mono mt-1">
          Built with React & ThreeJS by Sooubh &bull; Nashik &bull; 2026
        </p>
      </div>
    </footer>
  );
}

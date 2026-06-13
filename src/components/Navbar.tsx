import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001
  });

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Apps', path: '/apps' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav id="navbar" className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border-default">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber via-orange-500 to-orange-600 origin-left z-[60]"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          onClick={handleLinkClick}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-amber flex items-center justify-center font-bold text-white text-lg transition-transform duration-300 group-hover:scale-105">
            S
          </div>
          <span className="font-syne font-bold text-xl text-zinc-900 tracking-tight group-hover:text-amber transition-colors duration-300">
            sooubh
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleLinkClick}
                className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-300`}
                style={{ color: isActive ? '#EA580C' : '#52525B' }}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-amber"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 rounded-lg bg-surface border border-border-default cursor-pointer"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-surface border-b border-border-default overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleLinkClick}
                    className={`text-base font-syne font-medium py-2 transition-colors duration-300 border-b border-border-default/50 last:border-b-0 flex items-center justify-between ${
                      isActive ? 'text-amber' : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-amber" />}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

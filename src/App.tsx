import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Home from './pages/Home';
import Apps from './pages/Apps';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import CursorGlow from './components/CursorGlow';
import AmbientBackground from './components/AmbientBackground';

function KeyboardShortcutNavigator() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in input or editable elements
      const target = event.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
         target.tagName === 'TEXTAREA' ||
         target.isContentEditable)
      ) {
        return;
      }

      // Ignore with modifier keys to avoid disrupting browser shortcuts
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
        return;
      }

      const key = event.key.toLowerCase();
      if (key === 'h') {
        navigate('/');
      } else if (key === 'a') {
        navigate('/apps');
      } else if (key === 'c') {
        navigate('/contact');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/apps"
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <Apps />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <Contact />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <NotFound />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <KeyboardShortcutNavigator />
      <div className="relative min-h-screen bg-bg text-zinc-800 font-sans overflow-x-hidden selection:bg-amber/20 selection:text-amber flex flex-col justify-between">
        {/* Dynamic fluid gradient colored background blobs */}
        <AmbientBackground />

        {/* Particle Canvas Under-layer */}
        <ParticleBackground />


        {/* Global Cursor Glowing blur follower */}
        <CursorGlow />

        {/* Page top Navigation bar */}
        <Navbar />

        {/* Active router content holder */}
        <main className="flex-grow w-full relative z-10 flex flex-col pt-4">
          <AnimatedRoutes />
        </main>

        {/* Application footer boundaries */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Instagram, Linkedin, Smartphone, Send, CheckCircle2, ChevronRight, MessageSquareCode } from 'lucide-react';
import ContactCard from '../components/ContactCard';
import AbstractSphere from '../components/AbstractSphere';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  const contacts = [
    {
      label: 'Email',
      value: 'sourabh3527@gmail.com',
      link: 'mailto:sourabh3527@gmail.com',
      icon: <Mail size={18} />,
    },
    {
      label: 'GitHub',
      value: 'github.com/sooubh',
      link: 'https://github.com/sooubh',
      icon: <Github size={18} />,
    },
    {
      label: 'Instagram',
      value: '@sooubh (Reels + Content)',
      link: 'https://instagram.com/sooubh',
      icon: <Instagram size={18} />,
    },
    {
      label: 'LinkedIn',
      value: 'Sourabh Singh',
      link: 'https://linkedin.com/in/sooubh',
      icon: <Linkedin size={18} />,
    },
    {
      label: 'Play Store',
      value: 'My Published Apps',
      link: 'https://play.google.com/store/apps/developer?id=sooubh',
      icon: <Smartphone size={18} />,
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setFormState('sending');
    setTimeout(() => {
      setFormState('success');
      setName('');
      setEmail('');
      setMessage('');
    }, 1800);
  };

  // Staggered sequence for Info grid & main headers
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95, rotateX: 8 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotateX: 0,
      transition: { 
        type: 'spring',
        stiffness: 90,
        damping: 14,
        mass: 0.85 
      } 
    },
  } as const;

  // Staggered sequence specifically for Form fields
  const formContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2, // Let form slide shortly after headers
      }
    }
  } as const;

  const formFieldVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 0.8
      }
    }
  } as const;

  return (
    <div className="relative z-10 w-full min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col justify-center select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column (Info Grid & Headers - 5 cols) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Header Texts */}
          <div className="flex flex-col items-start gap-3">
            <motion.span 
              variants={itemVariants}
              className="text-amber text-[10.5px] font-extrabold tracking-[0.2em] uppercase bg-orange-50 px-4 py-2 rounded-full border border-orange-100 shadow-sm"
              id="contact-badge"
            >
              LET'S CONNECT
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="font-syne font-extrabold text-4xl sm:text-5.5xl text-zinc-950 tracking-tight"
              id="contact-title"
            >
              Find me here.
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="font-sans text-zinc-550 text-sm sm:text-[14.5px] leading-relaxed max-w-md select-none mt-1"
              id="contact-desc"
            >
              Whether you're a recruiter, a fellow builder, or someone with a wild app idea 
              &mdash; reach out. Let's make something functional.
            </motion.p>
          </div>

          {/* Staggered Vertical Contact Cards (with Framer staggered entrance) */}
          <div className="flex flex-col gap-3 w-full" id="contact-cards-grid">
            {contacts.map((contact) => (
              <motion.div key={contact.label} variants={itemVariants}>
                <ContactCard
                  label={contact.label}
                  value={contact.value}
                  link={contact.link}
                  icon={contact.icon}
                />
              </motion.div>
            ))}
          </div>

          {/* Availability Strip */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 bg-white border border-zinc-200 rounded-[1.25rem] px-5 py-4 self-start shadow-[0_4px_16px_rgba(0,0,0,0.01)] select-none"
            id="availability-strip"
          >
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </div>
            <span className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-wider text-green-600 font-bold">
              Open to freelance, collabs, and internships
            </span>
          </motion.div>
        </motion.div>

        {/* Right Column (Form Panel with integrated Sphere - 7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 65, damping: 15, mass: 1, delay: 0.15 }}
          className="lg:col-span-7 bg-white/90 backdrop-blur-md border border-zinc-200/90 rounded-[2rem] p-8 md:p-10 shadow-[0_12px_45px_rgba(0,0,0,0.015)] relative overflow-hidden flex flex-col md:flex-row gap-8 items-stretch"
          id="interactive-form-grid"
        >
          {/* Background radial highlight */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-50/100 to-orange-50/20 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none z-0" />

          {/* Form Content Structure (55% space) */}
          <div className="w-full md:w-[58%] flex flex-col justify-between relative z-10">
            <AnimatePresence mode="wait">
              {formState !== 'success' ? (
                <motion.form
                  key="contact-form"
                  variants={formContainerVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                  onSubmit={handleFormSubmit}
                  className="flex flex-col gap-5 w-full h-full justify-center"
                  id="actual-form-element"
                >
                  <motion.div variants={formFieldVariants} className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber" />
                      <h2 className="font-syne font-black text-xl text-zinc-950">
                        Drop a line
                      </h2>
                    </div>
                    <p className="font-sans text-zinc-550 text-xs">
                      Send a message instantly and secure local channel synchronization.
                    </p>
                  </motion.div>

                  {/* Name field */}
                  <motion.div variants={formFieldVariants} className="flex flex-col">
                    <label className="block text-[10px] uppercase tracking-wider text-zinc-400 font-extrabold mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-zinc-200 focus:border-amber focus:ring-2 focus:ring-amber/10 rounded-xl px-4 py-3 text-sm text-zinc-850 placeholder:text-zinc-450 outline-none transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.015)]"
                      id="form-input-name"
                    />
                  </motion.div>

                  {/* Email field */}
                  <motion.div variants={formFieldVariants} className="flex flex-col">
                    <label className="block text-[10px] uppercase tracking-wider text-zinc-400 font-extrabold mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-zinc-200 focus:border-amber focus:ring-2 focus:ring-amber/10 rounded-xl px-4 py-3 text-sm text-zinc-850 placeholder:text-zinc-450 outline-none transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.015)]"
                      id="form-input-email"
                    />
                  </motion.div>

                  {/* Message field */}
                  <motion.div variants={formFieldVariants} className="flex flex-col">
                    <label className="block text-[10px] uppercase tracking-wider text-zinc-400 font-extrabold mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="What are we building?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white border border-zinc-200 focus:border-amber focus:ring-2 focus:ring-amber/10 rounded-xl px-4 py-3 text-sm text-zinc-850 placeholder:text-zinc-450 outline-none transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.015)] resize-none"
                      id="form-input-message"
                    />
                  </motion.div>

                  {/* Submit button */}
                  <motion.div variants={formFieldVariants} className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={formState === 'sending'}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-3.5 px-6 font-sans text-sm font-bold shadow-md hover:shadow-lg hover:shadow-orange-100 flex items-center justify-center gap-2 group transition-all duration-300 relative overflow-hidden"
                      id="form-submit-btn"
                    >
                      {formState === 'sending' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span className="tracking-wide">Broadcasting packet...</span>
                        </>
                      ) : (
                        <>
                          <span className="tracking-wide">Initiate Signal</span>
                          <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 90, damping: 15 }}
                  className="flex flex-col items-center justify-center text-center gap-5 w-full h-full py-8 px-4"
                  id="form-success-element"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm relative">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: [0.5, 1.1, 1], opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                    >
                      <CheckCircle2 size={36} />
                    </motion.div>
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-400/20 animate-ping" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="font-syne font-black text-2xl text-zinc-950">
                      Transmission logged
                    </h2>
                    <p className="font-sans text-zinc-550 text-sm max-w-sm leading-relaxed">
                      Your signal has was received successfully. Payload packed and bound for client-sync delivery loops.
                    </p>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-150 rounded-xl p-3.5 flex items-center gap-2 w-full text-left">
                    <MessageSquareCode className="text-amber shrink-0" size={16} />
                    <span className="font-mono text-[9.5px] text-zinc-500 leading-normal">
                      FEEDBACK ENGINE: broadcast payload (MIME: form-data) serialized in block #{(Math.floor(Math.random() * 8000) + 1200)}
                    </span>
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => setFormState('idle')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-2 text-zinc-500 hover:text-zinc-800 font-sans text-xs font-bold border border-zinc-200/90 rounded-lg px-4.5 py-2.5 hover:bg-zinc-50 transition-all duration-200 flex items-center gap-1.5 group"
                    id="form-reset-btn"
                  >
                    <span>Send another transmission</span>
                    <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Three.js Canvas Section (42% space) */}
          <div className="w-full md:w-[42%] flex flex-col items-center justify-center relative min-h-[240px] md:min-h-[380px] self-center bg-zinc-50/50 border border-zinc-150/75 rounded-2xl overflow-hidden shadow-inner select-none pointer-events-auto">
            <div className="absolute inset-x-0 top-4 text-center z-10 pointer-events-none select-none">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-400 font-extrabold">
                Interactive Core Orbs
              </span>
            </div>
            <div className="w-full h-full flex items-center justify-center relative">
              <AbstractSphere />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


import { motion } from 'motion/react';
import { Mail, Github, Instagram, Linkedin, Smartphone } from 'lucide-react';
import ContactCard from '../components/ContactCard';
import AbstractSphere from '../components/AbstractSphere';

export default function Contact() {
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

  const parentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  } as const;

  return (
    <div className="relative z-10 w-full min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col justify-center select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column (55% space) */}
        <div className="lg:col-span-7 flex flex-col gap-8 order-2 lg:order-1">
          {/* Header Texts */}
          <div className="flex flex-col items-start gap-3">
            <span className="text-amber text-[10px] font-bold tracking-[0.2em] uppercase bg-amber-dim px-3.5 py-1.5 rounded-full border border-amber/20 shadow-sm">
              LET'S CONNECT
            </span>
            <h1 className="font-syne font-extrabold text-4xl sm:text-5.5xl text-zinc-950 tracking-tight">
              Find me here.
            </h1>
            <p className="font-sans text-zinc-650 text-sm sm:text-base leading-relaxed max-w-md select-none mt-1">
              Whether you're a recruiter, a fellow builder, or someone with a wild app idea 
              &mdash; reach out. Let's make something functional.
            </p>
          </div>

          {/* Stacked Vertical Contact Cards (with Framer staggered entrance) */}
          <motion.div
            variants={parentVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-3 w-full"
          >
            {contacts.map((contact) => (
              <motion.div key={contact.label} variants={childVariants}>
                <ContactCard
                  label={contact.label}
                  value={contact.value}
                  link={contact.link}
                  icon={contact.icon}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Availability Strip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex items-center gap-3 bg-white border border-[#E4E4E7] rounded-xl px-5 py-3.5 self-start shadow-sm select-none"
          >
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-green-600 font-bold">
              Open to freelance, collabs, and internships
            </span>
          </motion.div>
        </div>

        {/* Right Column (45% space) - Three.js Abstract Sphere */}
        <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2 h-[320px] lg:h-[500px] relative select-none">
          <div className="absolute inset-0 bg-radial-[circle,rgba(217,119,6,0.05)_0%,rgba(0,0,0,0)_65%] blur-3xl rounded-full pointer-events-none" />
          <div className="w-full h-full flex items-center justify-center">
            <AbstractSphere />
          </div>
        </div>
      </div>
    </div>
  );
}

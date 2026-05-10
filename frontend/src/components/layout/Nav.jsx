import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const links = [
  { id: 'about', label: 'About' },
  { id: 'current-work', label: 'Now' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['hero', ...links.map((l) => l.id)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    // A section counts as "active" once its top crosses the upper third of
    // the viewport and it still occupies the middle band — feels natural while
    // scrolling without flickering between adjacent sections.
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-ink/60 border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="relative inline-grid place-items-center w-8 h-8 rounded-full bg-gradient-to-br from-neural-500 to-synapse-500 shadow-[0_0_20px_-2px_rgba(6,182,212,0.6)]">
            <span className="absolute inset-0 rounded-full animate-pulse-slow bg-gradient-to-br from-neural-500/50 to-synapse-500/50 blur-md" />
            <span className="relative font-mono text-[10px] font-bold">AK</span>
          </span>
          <span className="font-display font-semibold tracking-tight">
            Ashish<span className="text-neural-300">.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`relative px-3 py-2 text-sm rounded-full transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-neural-100/80 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-neural-500/25 to-synapse-500/25 border border-neural-300/30 shadow-[0_0_18px_-4px_rgba(6,182,212,0.5)]"
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            );
          })}
        </nav>

        <a href="#contact" className="btn-ghost !py-2 !px-4 text-sm">
          Let's talk
        </a>
      </div>
    </motion.header>
  );
}

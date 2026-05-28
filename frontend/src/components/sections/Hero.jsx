import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { profile } from '../../data/portfolio.js';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-10"
    >
      <div className="relative max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="section-label mb-6"
        >
          
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
        >
          {profile.name.split(' ').map((w, i) => (
            <span key={i} className="inline-block mr-3">
              {i === 1 ? <span className="neon-text">{w}</span> : w}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-6 text-lg md:text-xl text-neural-100/90 font-mono"
        >
          {profile.roles.map((r, i) => (
            <span key={r}>
              {r}
              {i < profile.roles.length - 1 && (
                <span className="mx-3 text-neural-300/60">|</span>
              )}
            </span>
          ))}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-6 text-base md:text-lg text-neural-50/90 max-w-2xl mx-auto italic"
        >
          "{profile.tagline}"
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-6 text-sm md:text-base text-neural-100/70 max-w-2xl mx-auto"
        >
          {profile.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#about" className="btn-primary">
            Explore Me <ArrowRight size={18} />
          </a>
          <a href="#projects" className="btn-ghost">
            See projects
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2"
        >
          <div className="w-[2px] h-16 bg-gradient-to-b from-neural-300 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}

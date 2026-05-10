import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import { currentWork } from '../../data/portfolio.js';

export default function CurrentWork() {
  return (
    <section id="current-work" className="relative py-32 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          // eyebrow="02 — Now"
          title="The brain cracks open."
          subtitle="A holographic dashboard emerges."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative glass rounded-3xl p-8 md:p-10 overflow-hidden"
        >
          {/* Decorative scanlines + glow */}
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute inset-0 grid-bg" />
          </div>
          <div className="pointer-events-none absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-neural-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-synapse-500/20 blur-3xl" />

          <div className="relative">
            <p className="section-label">// Current real-world work</p>
            <h3 className="mt-3 font-display text-3xl md:text-4xl font-semibold">
              {currentWork.title}
            </h3>
            <p className="mt-2 text-neural-100/80">{currentWork.subtitle}</p>
            <p className="mt-6 text-neural-100/90 leading-relaxed max-w-3xl">
              {currentWork.description}
            </p>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentWork.highlights.map((h, i) => (
                <motion.div
                  key={h}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="flex items-start gap-2 text-sm text-neural-100/90"
                >
                  <Activity size={14} className="mt-1 text-neural-300 shrink-0" />
                  <span>{h}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {currentWork.stack.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-8 italic text-neural-50/90">"{currentWork.tagline}"</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

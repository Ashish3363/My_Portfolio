import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import { about } from '../../data/portfolio.js';

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          // eyebrow="01 — About"
          title={about.heading}
        />

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 glass lift-card rounded-2xl p-8"
          >
            <p className="text-neural-100/90 leading-relaxed">{about.body}</p>

            <p className="mt-6 text-neural-100/70 text-sm">I enjoy building systems that combine:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {about.pillars.map((p) => (
                <span key={p} className="chip">
                  {p}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h3 className="section-label mb-4">Education timeline</h3>
            <ol className="relative border-l border-white/15 pl-6 space-y-6">
              {about.education.map((e, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[33px] top-1 grid place-items-center w-6 h-6 rounded-full bg-gradient-to-br from-neural-500 to-synapse-500 shadow-[0_0_15px_-2px_rgba(6,182,212,0.6)]">
                    <GraduationCap size={12} />
                  </span>
                  <p className="font-display text-lg font-semibold">{e.degree}</p>
                  <p className="text-neural-100/80 text-sm">{e.school}</p>
                  <p className="text-neural-300/80 text-xs font-mono mt-1">{e.years}</p>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

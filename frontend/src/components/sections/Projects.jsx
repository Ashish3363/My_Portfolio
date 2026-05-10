import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import { projects } from '../../data/portfolio.js';

function ProjectCard({ p, i }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      className="group relative glass rounded-2xl p-6 overflow-hidden hover:border-white/25 transition"
    >
      <div
        className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${p.accent} opacity-25 blur-3xl group-hover:opacity-40 transition`}
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-neural-300" />
          <span className="section-label">project · {String(i + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
          {p.title}
        </h3>
        <p className="mt-2 text-neural-100/80 text-sm leading-relaxed">{p.blurb}</p>

        <ul className="mt-5 space-y-2">
          {p.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-neural-100/85">
              <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-neural-300 shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>

        <p className="mt-6 italic text-neural-50/90 text-sm">"{p.tagline}"</p>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          // eyebrow="03 — AI Projects Lab"
          title="Project cards float out like memories."
          subtitle="Each one is a working system — built, debugged, and shipped."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Briefcase, ExternalLink } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import { experience } from '../../data/portfolio.js';

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          // eyebrow="04 — Experience"
          title="Internship"
        />

        <ol className="relative border-l border-white/15 pl-8 space-y-8 max-w-3xl mx-auto">
          {experience.map((e, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative glass lift-card rounded-2xl p-6"
            >
              <span className="absolute -left-[44px] top-6 grid place-items-center w-8 h-8 rounded-full bg-gradient-to-br from-neural-500 to-synapse-500 shadow-[0_0_18px_-2px_rgba(6,182,212,0.6)]">
                <Briefcase size={14} />
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-semibold">{e.company}</h3>
                <span className="text-xs font-mono text-neural-300/80">{e.period}</span>
              </div>
              <p className="text-neural-100/80 text-sm">{e.role}</p>
              {e.description && (
                <p className="mt-4 text-neural-100/85 text-sm leading-relaxed">
                  {e.description}
                </p>
              )}
              {e.link && (
                <a
                  href={e.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono text-neural-300 hover:text-white transition"
                >
                  View certificate <ExternalLink size={12} />
                </a>
              )}
              <p className="mt-4 text-neural-100/60 text-xs font-mono">// worked on</p>
              <ul className="mt-2 grid sm:grid-cols-2 gap-x-4 gap-y-2">
                {e.work.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm text-neural-100/90">
                    <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-synapse-400 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

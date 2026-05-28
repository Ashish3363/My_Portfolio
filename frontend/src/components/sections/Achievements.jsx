import { motion } from 'framer-motion';
import { Trophy, ExternalLink } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import { achievements } from '../../data/portfolio.js';

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-32 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          // eyebrow="06 — Achievement Vault"
          title="Certifications"
          // subtitle="Certifications and badges, earned along the way."
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {achievements.map((a, i) => {
            const Wrapper = a.link ? motion.a : motion.div;
            const wrapperProps = a.link
              ? { href: a.link, target: '_blank', rel: 'noreferrer' }
              : {};
            return (
              <Wrapper
                key={a.title}
                {...wrapperProps}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative glass lift-card rounded-2xl p-6 group block"
              >
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/30 to-fuchsia-500/30 border border-white/10 group-hover:scale-105 transition">
                    <Trophy size={18} className="text-amber-300" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold leading-tight">{a.title}</p>
                    <p className="text-xs text-neural-100/60 font-mono">{a.issuer}</p>
                  </div>
                  {a.link && (
                    <ExternalLink
                      size={14}
                      className="text-neural-100/50 group-hover:text-neural-300 transition shrink-0"
                    />
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

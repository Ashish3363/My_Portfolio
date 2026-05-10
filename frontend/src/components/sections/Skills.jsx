import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader.jsx';
import { skills } from '../../data/portfolio.js';

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          // eyebrow="05 — Neural Network"
          title="Skills, as a network of nodes."
          subtitle="Brain transforms into floating neurons."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((g, i) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-neural-300 to-synapse-400 shadow-[0_0_10px_rgba(95,214,255,0.7)]" />
                <h3 className="font-display text-lg font-semibold">{g.group}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="chip hover:border-neural-300/60 hover:text-white transition"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

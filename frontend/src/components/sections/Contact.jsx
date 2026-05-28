import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, FileDown, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import { profile } from '../../data/portfolio.js';

const initial = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ state: 'error', msg: 'Please fill in all fields.' });
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!accessKey) {
      setStatus({
        state: 'error',
        msg: 'Contact form is not configured yet. Please email me directly.',
      });
      return;
    }

    setStatus({ state: 'loading', msg: '' });
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio contact from ${form.name}`,
          from_name: 'Ashish Portfolio',
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Delivery failed');
      }
      setStatus({
        state: 'success',
        msg: 'Message sent. I will get back to you soon.',
      });
      setForm(initial);
    } catch (err) {
      setStatus({
        state: 'error',
        msg: 'Could not deliver the message. Please email me directly.',
      });
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          // eyebrow="07 — Contact Portal"
          title="Let's build intelligent systems together."
          // subtitle="The brain becomes pure light."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="glass lift-card rounded-2xl p-8"
          >
            <h3 className="font-display text-xl font-semibold mb-1">Reach out</h3>
            <p className="text-sm text-neural-100/70">
              Open to opportunities, collaborations, and hard problems.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/[0.04] transition"
              >
                <Mail size={18} className="text-neural-300" />
                <span className="font-mono text-sm">{profile.email}</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/[0.04] transition"
              >
                <Github size={18} className="text-neural-300" />
                <span className="font-mono text-sm">GitHub</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/[0.04] transition"
              >
                <Linkedin size={18} className="text-neural-300" />
                <span className="font-mono text-sm">LinkedIn</span>
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/[0.04] transition"
              >
                <FileDown size={18} className="text-neural-300" />
                <span className="font-mono text-sm">Resume</span>
              </a>
            </div>

            <p className="mt-10 text-center italic text-neural-50/80 text-sm">
              {/* "This is not just a portfolio. This is how my mind builds the future." */}
            </p>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="glass lift-card rounded-2xl p-8 flex flex-col gap-4"
          >
            <label className="block">
              <span className="section-label">Your name</span>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="mt-2 w-full bg-black/40 border border-white/10 focus:border-neural-300/60 rounded-xl px-4 py-3 outline-none transition"
                placeholder="Ashish"
                autoComplete="name"
              />
            </label>
            <label className="block">
              <span className="section-label">Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                className="mt-2 w-full bg-black/40 border border-white/10 focus:border-neural-300/60 rounded-xl px-4 py-3 outline-none transition"
                placeholder="you@gmail.com"
                autoComplete="email"
              />
            </label>
            <label className="block">
              <span className="section-label">Message</span>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={onChange}
                className="mt-2 w-full bg-black/40 border border-white/10 focus:border-neural-300/60 rounded-xl px-4 py-3 outline-none transition resize-none"
                placeholder="Tell me about the problem you'd like to solve."
              />
            </label>

            <button
              type="submit"
              disabled={status.state === 'loading'}
              className="btn-primary justify-center disabled:opacity-60"
            >
              <Send size={16} />
              {status.state === 'loading' ? 'Sending…' : 'Send a message'}
            </button>

            {status.state === 'success' && (
              <p className="flex items-center gap-2 text-emerald-300 text-sm">
                <CheckCircle2 size={16} /> {status.msg}
              </p>
            )}
            {status.state === 'error' && (
              <p className="flex items-center gap-2 text-rose-300 text-sm">
                <AlertCircle size={16} /> {status.msg}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

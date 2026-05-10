import { profile } from '../../data/portfolio.js';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-neural-100/60 font-mono">
          © {new Date().getFullYear()} {profile.name}. Built with React, Three.js & FastAPI.
        </p>
        <p className="text-xs text-neural-100/40 font-mono italic">
          "This is not just a portfolio. This is how my mind builds the future."
        </p>
      </div>
    </footer>
  );
}

import { useEffect, useState } from 'react';
import Nav from './components/layout/Nav.jsx';
import BrainBackdrop from './components/layout/BrainBackdrop.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import CurrentWork from './components/sections/CurrentWork.jsx';
import Projects from './components/sections/Projects.jsx';
import Experience from './components/sections/Experience.jsx';
import Skills from './components/sections/Skills.jsx';
import Achievements from './components/sections/Achievements.jsx';
import Contact from './components/sections/Contact.jsx';
import Footer from './components/layout/Footer.jsx';

export default function App() {
  // Global scroll progress (0..1) drives "brain openness" in the backdrop.
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative">
      <BrainBackdrop progress={progress} />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <CurrentWork />
        <Projects />
        <Experience />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

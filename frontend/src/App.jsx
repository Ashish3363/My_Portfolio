import Nav from './components/layout/Nav.jsx';
import SpaceBackdrop from './components/layout/SpaceBackdrop.jsx';
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
  return (
    <div className="relative">
      <SpaceBackdrop />
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

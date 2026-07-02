import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { scrollToId } from '../utils/scroll';
import Hero from '../components/sections/Hero/Hero';
import About from '../components/sections/About/About';
import Skills from '../components/sections/Skills/Skills';
import Projects from '../components/sections/Projects/Projects';
import Education from '../components/sections/Education/Education';
import Contact from '../components/sections/Contact/Contact';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // Если пришли с другой страницы с указанием секции — плавно проскроллим к ней.
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return undefined;
    const timer = setTimeout(() => scrollToId(target), 80);
    navigate(location.pathname, { replace: true, state: null });
    return () => clearTimeout(timer);
  }, [location, navigate]);

  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
    </main>
  );
}

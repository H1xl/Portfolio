import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, useAnimationControls } from 'framer-motion';

import { useLanguage } from './context/LanguageContext';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import AuroraBackground from './components/ui/AuroraBackground/AuroraBackground';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';

// Прокрутка наверх при смене маршрута (кроме перехода к конкретной секции).
function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (!location.state?.scrollTo) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state]);
  return null;
}

// Небольшой fade контента при переключении языка.
function LangFade({ children }) {
  const { lang } = useLanguage();
  const controls = useAnimationControls();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    controls.start({
      opacity: [0.35, 1],
      transition: { duration: 0.4, ease: 'easeOut' },
    });
  }, [lang, controls]);

  return <motion.div animate={controls}>{children}</motion.div>;
}

export default function App() {
  return (
    <>
      <AuroraBackground />
      <ScrollManager />
      <Header />
      <LangFade>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </LangFade>
    </>
  );
}

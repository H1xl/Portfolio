import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

import { useLanguage } from '../../../context/LanguageContext';
import { scrollToId } from '../../../utils/scroll';
import AnimatedThemeToggler from '../../ui/AnimatedThemeToggler/AnimatedThemeToggler';
import LangToggle from '../../ui/LangToggle/LangToggle';
import Button from '../../ui/Button/Button';
import styles from './Header.module.scss';

const NAV_IDS = ['about', 'skills', 'projects', 'education', 'contact'];

export default function Header() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const reduce = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Закрываем меню при смене маршрута
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const handleNav = useCallback(
    (id) => {
      setMenuOpen(false);
      if (location.pathname === '/') {
        scrollToId(id);
      } else {
        navigate('/', { state: { scrollTo: id } });
      }
    },
    [location.pathname, navigate]
  );

  const goHome = useCallback(() => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: reduce ? 'auto' : 'smooth',
      });
    } else {
      navigate('/');
    }
  }, [location.pathname, navigate, reduce]);

  const navItems = NAV_IDS.map((id) => ({ id, label: t.nav[id] }));

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`.trim()}>
      <div className={`container ${styles.inner}`}>
        <button className={styles.logo} onClick={goHome} aria-label={t.nav.logoAria}>
          <span className={styles.logoText}>H1xl</span>
          <span className={styles.cursor} aria-hidden="true">
            _
          </span>
        </button>

        <nav className={styles.nav} aria-label="primary">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.navLink}
              onClick={() => handleNav(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className={styles.controls}>
          <LangToggle />
          <AnimatedThemeToggler />
          <Button
            className={styles.cta}
            size="sm"
            onClick={() => handleNav('contact')}
          >
            {t.nav.cta}
          </Button>
          <button
            type="button"
            className={styles.burger}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            <nav className={styles.mobileNav} aria-label="mobile">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.mobileLink}
                  onClick={() => handleNav(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <Button variant="primary" onClick={() => handleNav('contact')}>
              {t.nav.cta}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

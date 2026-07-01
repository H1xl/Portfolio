import { useCallback } from 'react';
import { flushSync } from 'react-dom';
import { FiSun, FiMoon } from 'react-icons/fi';

import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import styles from './AnimatedThemeToggler.module.scss';

// Переключатель темы с круговым reveal через View Transitions API.
export default function AnimatedThemeToggler() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const label = isDark ? t.theme.toLight : t.theme.toDark;

  const onClick = useCallback(
    async (e) => {
      const next = isDark ? 'light' : 'dark';
      const applyTheme = () => {
        document.documentElement.setAttribute('data-theme', next);
        setTheme(next);
      };

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!document.startViewTransition || reduce) {
        applyTheme();
        return;
      }

      const x = e.clientX;
      const y = e.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        flushSync(applyTheme);
      });

      try {
        await transition.ready;
      } catch {
        return;
      }

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 480,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    },
    [isDark, setTheme]
  );

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <span className={styles.icon}>{isDark ? <FiSun /> : <FiMoon />}</span>
    </button>
  );
}

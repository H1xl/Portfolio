import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './SparklesText.module.scss';

export default function SparklesText({ children, count = 14, className = '' }) {
  const reduce = useReducedMotion();

  const sparkles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i += 1) {
      arr.push({
        top: `${Math.round(Math.random() * 100)}%`,
        left: `${Math.round(Math.random() * 100)}%`,
        size: 10 + Math.round(Math.random() * 12),
        delay: `${(Math.random() * 1.6).toFixed(2)}s`,
        duration: `${(0.9 + Math.random() * 1.1).toFixed(2)}s`,
      });
    }
    return arr;
  }, [count]);

  return (
    <span className={`${styles.wrap} ${className}`.trim()}>
      {!reduce &&
        sparkles.map((s, i) => (
          <span
            key={i}
            className={styles.sparkle}
            aria-hidden="true"
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z" />
            </svg>
          </span>
        ))}
      <span className={styles.text}>{children}</span>
    </span>
  );
}

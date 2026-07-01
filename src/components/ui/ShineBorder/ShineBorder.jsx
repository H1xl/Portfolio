import styles from './ShineBorder.module.scss';

// Анимированная «сияющая» рамка (в духе Magic UI Shine Border).
export default function ShineBorder({
  children,
  className = '',
  borderWidth = 1.5,
  duration = 9,
}) {
  return (
    <div
      className={`${styles.shine} ${className}`.trim()}
      style={{
        '--shine-width': `${borderWidth}px`,
        '--shine-duration': `${duration}s`,
      }}
    >
      {children}
    </div>
  );
}

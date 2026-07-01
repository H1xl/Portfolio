import styles from './AuroraBackground.module.scss';

// Живой пастельный фон из дрейфующих орбов-боке (сигнатурный элемент).
export default function AuroraBackground() {
  return (
    <div className={styles.aurora} aria-hidden="true">
      <span className={`${styles.orb} ${styles.orb1}`} />
      <span className={`${styles.orb} ${styles.orb2}`} />
      <span className={`${styles.orb} ${styles.orb3}`} />
      <span className={`${styles.orb} ${styles.orb4}`} />
    </div>
  );
}

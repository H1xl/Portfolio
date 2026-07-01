import Reveal from '../Reveal/Reveal';
import styles from './SectionHeader.module.scss';

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  id,
}) {
  return (
    <Reveal className={`${styles.header} ${styles[align] || ''}`.trim()}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </Reveal>
  );
}

import { FaQuoteLeft } from 'react-icons/fa';

import { useLanguage } from '../../../context/LanguageContext';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import Reveal from '../../ui/Reveal/Reveal';
import styles from './About.module.scss';

export default function About() {
  const { t } = useLanguage();
  const about = t.about;

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader eyebrow={about.eyebrow} title={about.title} />

        <div className={styles.grid}>
          <Reveal className={styles.textCol}>
            <p className={styles.lead}>{about.lead}</p>
            {about.paragraphs.map((p, i) => (
              <p key={i} className={styles.para}>
                {p}
              </p>
            ))}
            <blockquote className={styles.quote}>
              <FaQuoteLeft className={styles.quoteIcon} aria-hidden="true" />
              {about.quote}
            </blockquote>
          </Reveal>

          <Reveal className={styles.statsCol} delay={0.1}>
            {about.stats.map((s, i) => (
              <div key={i} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

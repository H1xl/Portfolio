import { FaGraduationCap } from 'react-icons/fa';

import { useLanguage } from '../../../context/LanguageContext';
import { education } from '../../../data/education';
import { resolveAsset } from '../../../utils/asset';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import Reveal from '../../ui/Reveal/Reveal';
import styles from './Education.module.scss';

const photoVar = (image) => ({
  '--edu-photo': image ? `url(${resolveAsset(image)})` : 'none',
});

export default function Education() {
  const { t, lang } = useLanguage();
  const { formal, courses } = education;

  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeader eyebrow={t.education.eyebrow} title={t.education.title} />

        <div className={styles.grid}>
          <Reveal className={styles.col}>
            <h3 className={styles.colTitle}>{t.education.formalTitle}</h3>
            <div className={styles.card} style={photoVar(formal.image)}>
              <span className={styles.icon} aria-hidden="true">
                <FaGraduationCap />
              </span>
              <span className={styles.period}>{formal.period}</span>
              <h4 className={styles.institution}>{formal.institution[lang]}</h4>
              <p className={styles.specialty}>{formal.specialty[lang]}</p>
              <span className={styles.degree}>{formal.degree[lang]}</span>
            </div>
          </Reveal>

          <Reveal className={styles.col} delay={0.1}>
            <h3 className={styles.colTitle}>{t.education.coursesTitle}</h3>
            <ul className={styles.courseList}>
              {courses.map((c, i) => (
                <li key={i} className={styles.course} style={photoVar(c.image)}>
                  <span className={styles.courseYear}>{c.year}</span>
                  <span className={styles.courseInfo}>
                    <span className={styles.courseTitle}>{c.title[lang]}</span>
                    <span className={styles.coursePlatform}>
                      {c.platform[lang]}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

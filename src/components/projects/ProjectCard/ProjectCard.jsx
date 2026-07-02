import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

import { useLanguage } from '../../../context/LanguageContext';
import { resolveAsset } from '../../../utils/asset';
import styles from './ProjectCard.module.scss';

export default function ProjectCard({ project, onOpen, index = 0 }) {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const extraTech = project.tech.length - 4;

  return (
    <motion.button
      type="button"
      layout
      className={styles.card}
      onClick={() => onOpen(project)}
      onMouseMove={handleMove}
      aria-label={`${project.title[lang]} — ${t.projectsSection.details}`}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: reduce ? 0 : 0.45,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={reduce ? undefined : { y: -6 }}
    >
      <span className={`${styles.preview} ${styles[`accent${project.accent}`]}`} aria-hidden="true">
        {project.image ? (
          <img
            className={styles.previewImg}
            src={resolveAsset(project.image)}
            alt=""
            loading="lazy"
          />
        ) : (
          <span className={styles.glyph}>&lt;/&gt;</span>
        )}
      </span>

      <span className={styles.body}>
        <span className={styles.badges}>
          {project.categories.map((c) => (
            <span key={c} className={styles.badge}>
              {t.categories[c]}
            </span>
          ))}
        </span>

        <span className={styles.title}>{project.title[lang]}</span>
        <span className={styles.desc}>{project.short[lang]}</span>

        <span className={styles.tags}>
          {project.tech.slice(0, 4).map((techName) => (
            <span key={techName} className={styles.tag}>
              {techName}
            </span>
          ))}
          {extraTech > 0 && <span className={styles.tag}>+{extraTech}</span>}
        </span>

        <span className={styles.more}>
          {t.projectsSection.details}
          <FiArrowRight aria-hidden="true" />
        </span>
      </span>

      <span className={styles.sheen} aria-hidden="true" />
    </motion.button>
  );
}

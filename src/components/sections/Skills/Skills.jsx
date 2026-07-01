import { useLanguage } from '../../../context/LanguageContext';
import { skillCategories } from '../../../data/skills';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import Reveal from '../../ui/Reveal/Reveal';
import styles from './Skills.module.scss';

// Размер карточки в бенто-сетке по порядку категорий:
// languages, frontend, styling, backend, tools
const SPANS = [2, 4, 3, 3, 6];

export default function Skills() {
  const { t, lang } = useLanguage();

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          subtitle={t.skills.subtitle}
        />

        <div className={styles.bento}>
          {skillCategories.map((cat, ci) => (
            <Reveal
              key={cat.id}
              className={`${styles.card} ${styles[`span${SPANS[ci] || 3}`]}`}
              delay={ci * 0.05}
            >
              <h3 className={styles.catTitle}>{cat.label[lang]}</h3>
              <div className={styles.pins}>
                {cat.items.map((item) => {
                  const { Icon } = item;
                  return (
                    <span
                      key={item.name}
                      className={styles.pin}
                      style={item.color ? { '--icon': item.color } : undefined}
                    >
                      <span className={styles.pinIcon}>
                        <Icon aria-hidden="true" />
                      </span>
                      <span className={styles.pinName}>{item.name}</span>
                    </span>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

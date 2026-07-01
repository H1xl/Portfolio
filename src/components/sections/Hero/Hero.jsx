import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiMail } from 'react-icons/fi';

import { useLanguage } from '../../../context/LanguageContext';
import { SITE } from '../../../data/config';
import { scrollToId } from '../../../utils/scroll';
import Button from '../../ui/Button/Button';
import SocialLinks from '../../ui/SocialLinks/SocialLinks';
import IconCloud from '../../ui/IconCloud/IconCloud';
import SparklesText from '../../ui/SparklesText/SparklesText';
import Typewriter from '../../ui/Typewriter/Typewriter';
import styles from './Hero.module.scss';

export default function Hero() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="hero" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.text}>
          <motion.span className={styles.chip} {...rise(0)}>
            <span className={styles.dot} aria-hidden="true" />
            {t.hero.available}
          </motion.span>

          <motion.span className={`eyebrow ${styles.eyebrow}`} {...rise(0.06)}>
            {t.hero.eyebrow}
          </motion.span>

          <motion.h1 className={styles.title} {...rise(0.12)}>
            <span className={styles.line}>{t.hero.roleLine1}</span>
            <span className={`${styles.line} ${styles.roleWord}`}>
              <SparklesText count={16}>
                <span className="gradient-text">
                  <Typewriter text={t.hero.roleLine2} />
                </span>
              </SparklesText>
              <span className={styles.caret} aria-hidden="true" />
            </span>
          </motion.h1>

          <motion.p className={styles.slogan} {...rise(0.2)}>
            {t.hero.slogan}
          </motion.p>
          <motion.p className={styles.subtitle} {...rise(0.26)}>
            {t.hero.subtitle}
          </motion.p>

          <motion.div className={styles.actions} {...rise(0.34)}>
            <Button
              onClick={() => scrollToId('projects')}
              iconRight={<FiArrowRight aria-hidden="true" />}
            >
              {t.hero.ctaProjects}
            </Button>

            {SITE.resumeUrl ? (
              <Button
                as="a"
                variant="ghost"
                href={SITE.resumeUrl}
                download
                icon={<FiDownload aria-hidden="true" />}
              >
                {t.hero.ctaResume}
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => scrollToId('contact')}
                icon={<FiMail aria-hidden="true" />}
              >
                {t.hero.ctaContact}
              </Button>
            )}
          </motion.div>

          <motion.div {...rise(0.42)}>
            <SocialLinks />
          </motion.div>
        </div>

        <motion.div
          className={styles.visual}
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <IconCloud />
        </motion.div>
      </div>
    </section>
  );
}

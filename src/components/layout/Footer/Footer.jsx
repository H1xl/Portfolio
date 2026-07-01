import { useNavigate, useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';

import { useLanguage } from '../../../context/LanguageContext';
import { SITE } from '../../../data/config';
import { scrollToId } from '../../../utils/scroll';
import SocialLinks from '../../ui/SocialLinks/SocialLinks';
import styles from './Footer.module.scss';

const NAV_IDS = ['about', 'skills', 'projects', 'education', 'contact'];

export default function Footer() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const reduce = useReducedMotion();

  const handleNav = (id) => {
    if (location.pathname === '/') scrollToId(id);
    else navigate('/', { state: { scrollTo: id } });
  };

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });

  const year = 2026;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <button className={styles.logo} onClick={toTop} aria-label={t.nav.logoAria}>
            <span className={styles.logoText}>H1xl</span>
            <span className={styles.cursor} aria-hidden="true">
              _
            </span>
          </button>
          <p className={styles.tagline}>{t.footer.tagline}</p>
          <p className={styles.made}>
            {t.footer.madePre}{' '}
            <FaHeart className={styles.heart} aria-hidden="true" />{' '}
            {t.footer.madePost}
          </p>
        </div>

        <nav className={styles.col} aria-label="footer">
          <h4 className={styles.colTitle}>{t.footer.navTitle}</h4>
          {NAV_IDS.map((id) => (
            <button
              key={id}
              type="button"
              className={styles.link}
              onClick={() => handleNav(id)}
            >
              {t.nav[id]}
            </button>
          ))}
        </nav>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t.footer.contactsTitle}</h4>
          <a className={styles.link} href={`mailto:${SITE.links.email}`}>
            {SITE.links.email}
          </a>
          <a
            className={styles.link}
            href={SITE.links.telegram}
            target="_blank"
            rel="noreferrer noopener"
          >
            @H1xlBit
          </a>
          <a
            className={styles.link}
            href={SITE.links.github}
            target="_blank"
            rel="noreferrer noopener"
          >
            github.com/H1xl
          </a>
          <SocialLinks className={styles.socials} />
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>
          © {year} {SITE.name} · {t.footer.rights}
        </p>
        <button
          type="button"
          className={styles.toTop}
          onClick={toTop}
          aria-label={t.footer.backToTop}
        >
          <FiArrowUp aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}

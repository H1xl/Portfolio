import { useLanguage } from '../../../context/LanguageContext';
import styles from './LangToggle.module.scss';

const LANGS = ['ru', 'en'];

export default function LangToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className={styles.toggle} role="group" aria-label={t.language.switch}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          className={`${styles.opt} ${lang === code ? styles.active : ''}`.trim()}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

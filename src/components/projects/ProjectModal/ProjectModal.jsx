import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

import { useLanguage } from '../../../context/LanguageContext';
import { resolveAsset } from '../../../utils/asset';
import Modal from '../../ui/Modal/Modal';
import Button from '../../ui/Button/Button';
import Tag from '../../ui/Tag/Tag';
import styles from './ProjectModal.module.scss';

export default function ProjectModal({ project, isOpen, onClose }) {
  const { t, lang } = useLanguage();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="pm-title"
      describedBy="pm-desc"
      closeLabel={t.modal.close}
    >
      {project && (
        <div className={styles.content}>
          <div
            className={`${styles.preview} ${styles[`accent${project.accent}`]}`}
            aria-hidden="true"
          >
            {project.image ? (
              <img
                className={styles.previewImg}
                src={resolveAsset(project.image)}
                alt=""
              />
            ) : (
              <span className={styles.glyph}>&lt;/&gt;</span>
            )}
          </div>

          <div className={styles.badges}>
            {project.categories.map((c) => (
              <span key={c} className={styles.badge}>
                {t.categories[c]}
              </span>
            ))}
          </div>

          <h3 id="pm-title" className={styles.title}>
            {project.title[lang]}
          </h3>
          <p id="pm-desc" className={styles.desc}>
            {project.long[lang]}
          </p>

          <h4 className={styles.subhead}>{t.modal.stack}</h4>
          <div className={styles.tags}>
            {project.tech.map((techName) => (
              <Tag key={techName}>{techName}</Tag>
            ))}
          </div>

          <h4 className={styles.subhead}>{t.modal.links}</h4>
          <div className={styles.links}>
            {project.links.github && (
              <Button
                as="a"
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                icon={<FaGithub aria-hidden="true" />}
              >
                {t.modal.github}
              </Button>
            )}

            {project.links.live ? (
              <Button
                as="a"
                variant="ghost"
                href={project.links.live}
                target="_blank"
                rel="noreferrer noopener"
                icon={<FiExternalLink aria-hidden="true" />}
              >
                {t.modal.live}
              </Button>
            ) : (
              <p className={styles.noLink}>{t.modal.noLink}</p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import { useLanguage } from '../../../context/LanguageContext';
import { useProjects } from '../../../hooks/useProjects';
import Reveal from '../../ui/Reveal/Reveal';
import Button from '../../ui/Button/Button';
import ProjectCard from '../../projects/ProjectCard/ProjectCard';
import ProjectModal from '../../projects/ProjectModal/ProjectModal';
import styles from './Projects.module.scss';

export default function Projects() {
  const { t } = useLanguage();
  const { featured } = useProjects();
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);

  const openModal = (p) => {
    setActive(p);
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal className={styles.head}>
          <div className={styles.headText}>
            <span className="eyebrow">{t.projectsSection.eyebrow}</span>
            <h2 className={styles.title}>{t.projectsSection.title}</h2>
            <p className={styles.subtitle}>{t.projectsSection.subtitle}</p>
          </div>
          <Button
            as={Link}
            to="/projects"
            variant="primary"
            className={styles.viewAll}
            iconRight={<FiArrowRight aria-hidden="true" />}
          >
            {t.projectsSection.viewAll}
          </Button>
        </Reveal>

        <div className={styles.grid}>
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={openModal} />
          ))}
        </div>
      </div>

      <ProjectModal project={active} isOpen={open} onClose={closeModal} />
    </section>
  );
}

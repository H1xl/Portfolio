import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiSearch, FiX } from 'react-icons/fi';

import { useLanguage } from '../context/LanguageContext';
import { useProjects } from '../hooks/useProjects';
import { categoryOrder } from '../data/projects';
import Button from '../components/ui/Button/Button';
import ProjectCard from '../components/projects/ProjectCard/ProjectCard';
import ProjectModal from '../components/projects/ProjectModal/ProjectModal';
import styles from './ProjectsPage.module.scss';

export default function ProjectsPage() {
  const { t, lang } = useLanguage();
  const { projects } = useProjects();
  const p = t.projectsPage;

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);

  const openModal = (proj) => {
    setActive(proj);
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((pr) => {
      const inCat = category === 'all' || (pr.categories || []).includes(category);
      const inQuery =
        !q ||
        (pr.title?.ru || '').toLowerCase().includes(q) ||
        (pr.title?.en || '').toLowerCase().includes(q);
      return inCat && inQuery;
    });
  }, [query, category, projects]);

  const n = filtered.length;
  const pluralWord = (() => {
    if (lang === 'ru') {
      const m10 = n % 10;
      const m100 = n % 100;
      if (m10 === 1 && m100 !== 11) return p.foundOne;
      if (m10 >= 2 && m10 <= 4 && !(m100 >= 12 && m100 <= 14)) return p.foundFew;
      return p.foundMany;
    }
    return n === 1 ? p.foundOne : p.foundMany;
  })();

  const resetFilters = () => {
    setQuery('');
    setCategory('all');
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <Button
          as={Link}
          to="/"
          variant="ghost"
          size="sm"
          icon={<FiArrowLeft aria-hidden="true" />}
          className={styles.back}
        >
          {p.back}
        </Button>

        <header className={styles.header}>
          <span className="eyebrow">{p.eyebrow}</span>
          <h1 className={styles.title}>{p.title}</h1>
          <p className={styles.subtitle}>{p.subtitle}</p>
        </header>

        <div className={styles.controls}>
          <div className={styles.search}>
            <FiSearch aria-hidden="true" className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={p.search}
              aria-label={p.search}
            />
            {query && (
              <button
                type="button"
                className={styles.clearSearch}
                onClick={() => setQuery('')}
                aria-label={p.clear}
              >
                <FiX aria-hidden="true" />
              </button>
            )}
          </div>

          <div className={styles.filters} role="group" aria-label={p.title}>
            {categoryOrder.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`${styles.chip} ${category === cat ? styles.chipActive : ''}`.trim()}
                aria-pressed={category === cat}
                onClick={() => setCategory(cat)}
              >
                {t.categories[cat]}
              </button>
            ))}
          </div>
        </div>

        <p className={styles.count} aria-live="polite">
          {p.found} {n} {pluralWord}
        </p>

        {n > 0 ? (
          <motion.div layout className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {filtered.map((proj, i) => (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  index={i}
                  onOpen={openModal}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className={styles.empty}>
            <p>{p.empty}</p>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              {p.clear}
            </Button>
          </div>
        )}
      </div>

      <ProjectModal project={active} isOpen={open} onClose={closeModal} />
    </main>
  );
}

import { useState, useEffect } from 'react';
import { SITE } from '../data/config';
import { projects as localProjects } from '../data/projects';

// Кэш на уровне модуля — чтобы не грузить повторно при переходах между страницами.
let cache = null;

// База источника (директория URL) — для относительных путей превью.
function assetsBaseOf(url) {
  return url.replace(/[^/]*(\?.*)?$/, '');
}

// Относительные превью резолвим относительно источника проектов
// (изображения лежат в том же репозитории), абсолютные — как есть.
function normalize(list, base) {
  return list.map((p) => {
    const img = p.image;
    if (!img || /^https?:\/\//i.test(img) || img.startsWith('data:')) return p;
    return { ...p, image: base + String(img).replace(/^\//, '') };
  });
}

async function loadRemote(url) {
  if (/\.js(\?.*)?$/i.test(url)) {
    const mod = await import(/* @vite-ignore */ url);
    const arr = mod.projects || mod.default;
    if (!Array.isArray(arr)) throw new Error('Ожидался массив projects в JS-модуле');
    return arr;
  }
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const arr = Array.isArray(data) ? data : data && data.projects;
  if (!Array.isArray(arr)) throw new Error('Некорректный формат projects.json');
  return arr;
}

// Проекты: если задан SITE.projectsUrl — грузим из него в рантайме (JS-модуль или JSON),
// вместе с превью из того же репозитория; иначе — локальные данные. При любой ошибке
// остаёмся на локальных, чтобы сайт всегда работал.
export function useProjects() {
  const [projects, setProjects] = useState(cache || localProjects);
  const [loading, setLoading] = useState(Boolean(SITE.projectsUrl) && !cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!SITE.projectsUrl || cache) return undefined;
    let alive = true;
    setLoading(true);

    loadRemote(SITE.projectsUrl)
      .then((arr) => {
        const norm = normalize(arr, assetsBaseOf(SITE.projectsUrl));
        cache = norm;
        if (alive) setProjects(norm);
      })
      .catch((e) => {
        if (alive) setError(e);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  const featured = projects.filter((p) => p.featured);
  return { projects, featured, loading, error };
}

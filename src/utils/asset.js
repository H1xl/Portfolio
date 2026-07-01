// Возвращает корректный путь к ассету: внешние URL как есть,
// локальные пути — с префиксом base (для GitHub Pages в подкаталоге).
export function resolveAsset(path) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path) || path.startsWith('data:')) return path;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}

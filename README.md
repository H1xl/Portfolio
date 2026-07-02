# Portfolio — H1xl

Персональный сайт-портфолио **Александра Хоменко (H1xl)**, Frontend / Fullstack разработчика.
Одностраничное приложение на React с двумя языками (RU/EN), светлой и тёмной темами,
анимациями и подгрузкой проектов из внешнего источника.

🔗 **Live:** https://h1xl.github.io/portfolio

---

## ✨ Возможности

- **Двуязычность (RU / EN)** — переключение языка на лету через контекст, с плавным fade-переходом контента.
- **Светлая / тёмная тема** — выбор сохраняется в `localStorage`, учитывается системное предпочтение (`prefers-color-scheme`). Тема применяется ещё до первой отрисовки, без «мигания».
- **Проекты из внешнего источника** — список проектов и превью подгружаются в рантайме из отдельного репозитория (JSON или JS-модуль). При недоступности источника используются локальные данные, чтобы сайт всегда работал.
- **Форма обратной связи** — отправка сообщений через [EmailJS](https://www.emailjs.com/) (ключи задаются через переменные окружения).
- **Анимации и эффекты** — на базе [Framer Motion](https://www.framer.com/motion/): aurora-фон, reveal-анимации, typewriter, sparkles, shine border, вращающееся облако иконок.
- **SEO и соцсети** — метатеги Open Graph / Twitter, JSON-LD (schema.org Person), манифест PWA.
- **Адаптивная вёрстка** и модульные стили на Sass (CSS Modules).

## 🛠️ Технологии

| Категория      | Стек                                                    |
| -------------- | ------------------------------------------------------- |
| Ядро           | React 19, React Router 7                                |
| Сборка         | Vite 8                                                  |
| Стили          | Sass, CSS Modules                                       |
| Анимации       | Framer Motion                                           |
| Иконки         | react-icons                                             |
| Формы / почта  | @emailjs/browser                                        |
| Деплой         | gh-pages (GitHub Pages)                                 |

## 📁 Структура проекта

```
portfolio/
├── public/                 # Статические ресурсы (иконки, превью, manifest, robots)
├── index.html              # HTML-шаблон: метатеги, шрифты, инициализация темы/языка
├── vite.config.js          # Конфигурация Vite (base для GitHub Pages)
└── src/
    ├── main.jsx            # Точка входа
    ├── App.jsx             # Роутинг, менеджер прокрутки, fade при смене языка
    ├── components/
    │   ├── layout/         # Header, Footer
    │   ├── sections/       # Hero, About, Skills, Projects, Education, Contact
    │   ├── projects/       # ProjectCard, ProjectModal
    │   └── ui/             # Кнопки, тумблеры, модалка, декоративные эффекты и т.п.
    ├── context/            # LanguageContext, ThemeContext
    ├── pages/              # Home, ProjectsPage
    ├── hooks/              # useProjects (загрузка проектов из источника)
    ├── data/               # config, content, projects, skills, education
    ├── styles/             # Глобальные стили, миксины, reset, типографика
    └── utils/              # scroll, asset
```

## 🚀 Запуск

Требуется Node.js 18+.

```bash
# Установка зависимостей
npm install

# Режим разработки (http://localhost:5173)
npm run dev

# Production-сборка
npm run build

# Локальный предпросмотр собранного билда
npm run preview
```

## ⚙️ Конфигурация

Основные настройки сайта (имя, роль, ссылки, источник проектов) находятся в
[src/data/config.js](src/data/config.js).

### Переменные окружения (EmailJS)

Для работы формы обратной связи создайте файл `.env.local` в корне проекта:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Файл `.env.local` не коммитится в репозиторий. Если ключи не заданы, форма
корректно отработает деградацию (см. `isEmailJsConfigured` в конфиге).

### Внешний источник проектов

В `SITE.projectsUrl` указывается URL с данными проектов (JSON или JS-модуль).
Относительные пути к превью резолвятся относительно источника. Если поле пустое
или источник недоступен, используются локальные данные из
[src/data/projects.js](src/data/projects.js).

## 📦 Деплой

Проект публикуется на **GitHub Pages** через `gh-pages`:

```bash
npm run deploy
```

Скрипт `predeploy` автоматически выполняет сборку, после чего содержимое `dist`
публикуется в ветку `gh-pages`. Базовый путь публикации (`/portfolio/`) задан в
[vite.config.js](vite.config.js).

## 📄 Лицензия

Проект приватный (персональное портфолио). Все права на контент принадлежат автору.

---

**Автор:** Александр Хоменко (H1xl)
[GitHub](https://github.com/H1xl) · [Telegram](https://t.me/H1xlBit)

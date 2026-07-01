// ЗАГЛУШКИ проектов — замени на свои. Поля title/short/long переведены (ru/en).
// categories: 'commercial' | 'pet' | 'design' | 'api' | 'learning' (можно несколько)
// links.github / links.live: строка-URL или null. Если null — в модалке покажется
// сообщение «поддержка проекта завершена».
// featured: true — попадает в блок «Избранные» на главной (нужно 3).
// accent: 0..5 — пресет градиента для превью-карточки (если image не задан).
// image: путь к скриншоту-превью, напр. '/projects/foo.png' (файл в public/projects/)
//        или внешний URL. null/отсутствует — показывается градиентная заглушка «</>».

export const projects = [
  {
    id: 'analytics-dashboard',
    featured: true,
    accent: 0,
    image: null, // напр. '/projects/analytics.png'
    title: { ru: 'Аналитическая панель', en: 'Analytics Dashboard' },
    short: {
      ru: 'Админ-панель с аналитикой и управлением данными в реальном времени.',
      en: 'Admin panel with real-time analytics and data management.',
    },
    long: {
      ru: 'Платформа для визуализации бизнес-метрик: интерактивные графики, фильтры, таблицы и экспорт отчётов. Реализованы авторизация, роли пользователей и обновление данных в реальном времени.',
      en: 'A platform for visualizing business metrics: interactive charts, filters, tables and report export. Includes auth, user roles and real-time data updates.',
    },
    tech: ['React', 'TypeScript', 'Redux Toolkit', 'REST API', 'Recharts'],
    categories: ['commercial', 'api', 'design'],
    links: { github: 'https://github.com/H1xl', live: 'https://github.com/H1xl' },
  },
  {
    id: 'shoply-ecommerce',
    featured: true,
    accent: 1,
    title: { ru: 'Shoply — интернет-магазин', en: 'Shoply — e-commerce' },
    short: {
      ru: 'Интернет-магазин с корзиной, фильтрами и оформлением заказа.',
      en: 'Online store with cart, filters and checkout flow.',
    },
    long: {
      ru: 'Магазин с каталогом, поиском, фильтрацией по параметрам, корзиной, избранным и оформлением заказа. Данные и авторизация — на Supabase, интерфейс адаптивный.',
      en: 'A shop with catalog, search, faceted filtering, cart, wishlist and checkout. Data and auth powered by Supabase, fully responsive UI.',
    },
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    categories: ['commercial', 'api'],
    links: { github: 'https://github.com/H1xl', live: null },
  },
  {
    id: 'taskflow',
    featured: true,
    accent: 2,
    title: { ru: 'TaskFlow — доски задач', en: 'TaskFlow — task boards' },
    short: {
      ru: 'Приложение для управления задачами с досками и drag-and-drop.',
      en: 'Task management app with boards and drag-and-drop.',
    },
    long: {
      ru: 'Канбан-доски с колонками, перетаскиванием карточек, метками и фильтрами. Состояние приложения на Zustand, серверная часть на Node.js.',
      en: 'Kanban boards with columns, drag-and-drop cards, labels and filters. App state on Zustand, backend on Node.js.',
    },
    tech: ['React', 'TypeScript', 'Zustand', 'Node.js'],
    categories: ['commercial'],
    links: { github: 'https://github.com/H1xl', live: 'https://github.com/H1xl' },
  },
  {
    id: 'weather-app',
    featured: false,
    accent: 3,
    title: { ru: 'Погода', en: 'Weather App' },
    short: {
      ru: 'Прогноз погоды по геолокации с почасовой детализацией.',
      en: 'Geolocation-based weather forecast with hourly details.',
    },
    long: {
      ru: 'Небольшое приложение прогноза погоды: определение города по геолокации, почасовой и недельный прогноз, анимированные иконки. Данные — из открытого погодного API.',
      en: 'A small weather app: city detection by geolocation, hourly and weekly forecast, animated icons. Data from an open weather API.',
    },
    tech: ['React', 'REST API', 'CSS Modules'],
    categories: ['pet', 'api', 'learning'],
    links: { github: 'https://github.com/H1xl', live: null },
  },
  {
    id: 'portfolio-site',
    featured: false,
    accent: 4,
    title: { ru: 'Сайт-портфолио', en: 'Portfolio site' },
    short: {
      ru: 'Личный сайт-портфолио с анимациями и переключением тем.',
      en: 'Personal portfolio site with animations and theme switching.',
    },
    long: {
      ru: 'Одностраничный сайт-портфолио на React с glassmorphism-дизайном, плавными анимациями на Framer Motion, светлой и тёмной темами и поддержкой двух языков.',
      en: 'A single-page React portfolio with glassmorphism design, smooth Framer Motion animations, light/dark themes and bilingual support.',
    },
    tech: ['React', 'Framer Motion', 'Sass'],
    categories: ['pet', 'design'],
    links: { github: 'https://github.com/H1xl', live: 'https://github.com/H1xl' },
  },
  {
    id: 'chat-realtime',
    featured: false,
    accent: 5,
    title: { ru: 'Realtime-чат', en: 'Realtime Chat' },
    short: {
      ru: 'Чат в реальном времени с комнатами и уведомлениями.',
      en: 'Real-time chat with rooms and notifications.',
    },
    long: {
      ru: 'Чат на WebSocket: комнаты, список онлайн-участников, индикатор набора текста и уведомления. Клиент на React, сервер на Node.js и Express.',
      en: 'A WebSocket chat: rooms, online users list, typing indicator and notifications. React client, Node.js + Express server.',
    },
    tech: ['React', 'Node.js', 'Express', 'WebSocket'],
    categories: ['pet', 'api', 'learning'],
    links: { github: 'https://github.com/H1xl', live: null },
  },
  {
    id: 'ui-kit',
    featured: false,
    accent: 0,
    title: { ru: 'UI-кит компонентов', en: 'Component UI Kit' },
    short: {
      ru: 'Библиотека переиспользуемых компонентов с документацией.',
      en: 'A library of reusable components with docs.',
    },
    long: {
      ru: 'Набор доступных UI-компонентов (кнопки, инпуты, модалки, тосты) с единой дизайн-системой, темизацией и документацией в Storybook.',
      en: 'A set of accessible UI components (buttons, inputs, modals, toasts) with a shared design system, theming and Storybook docs.',
    },
    tech: ['React', 'Styled Components', 'Storybook'],
    categories: ['design', 'learning'],
    links: { github: 'https://github.com/H1xl', live: null },
  },
  {
    id: 'movies-explorer',
    featured: false,
    accent: 1,
    title: { ru: 'Кинопоиск проектов', en: 'Movies Explorer' },
    short: {
      ru: 'Поиск фильмов с сохранением избранного.',
      en: 'Movie search with a saved favorites list.',
    },
    long: {
      ru: 'Приложение для поиска фильмов через внешний API: фильтры по жанрам, страницы деталей и сохранение избранного в локальном хранилище.',
      en: 'A movie search app powered by an external API: genre filters, detail pages and favorites saved in local storage.',
    },
    tech: ['React', 'REST API', 'Tailwind CSS'],
    categories: ['pet', 'api'],
    links: { github: null, live: null },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

// Порядок и состав фильтров на странице «Все проекты»
export const categoryOrder = ['all', 'commercial', 'pet', 'design', 'api', 'learning'];

export const projects = [
  {
    id: 'promo-24ttl',
    featured: true,
    accent: 0,
    image: '/projects/24TTL-promo.png',
    title: { ru: 'Промо-лендинг 24TTL', en: 'Landing Page 24TTL' },
    short: {
      ru: 'Промо-лендинг для сбора заявок бизнес-партнёров с автоматизацией обработки данных.',
      en: 'Landing page for collecting business partner applications with automated data processing.',
    },
    long: {
      ru: 'Разработал и поддерживал промо-лендинг для новогодней маркетинговой кампании компании. Цель проекта — автоматизировать сбор заявок от бизнес-партнёров и сократить ручную обработку данных. Спроектировал адаптивные формы сбора данных с клиентской валидацией, интегрировал frontend с backend API. После запуска 3 месяца поддерживал проект: дорабатывал интерфейс по обратной связи, устранял дефекты.',
      en: 'Developed and maintained a landing page for the company’s New Year marketing campaign. The goal of the project was to automate the collection of applications from business partners and reduce manual data processing. Designed adaptive data collection forms with client-side validation, integrated frontend with backend API. After the launch, supported the project for 3 months: refined the interface based on feedback, fixed bugs.',
    },
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    categories: ['commercial', 'design'],
    links: { github: null, live: null },
  },
  {
    id: 'your-project',
    featured: true,
    accent: 1,
    image: null,
    title: { ru: 'Здесь может быть ваш проект', en: 'Your project may be here' },
    short: {
      ru: 'Готов к сотрудничеству и новым задачам. Свяжитесь со мной!',
      en: 'Ready for collaboration and new challenges. Get in touch!',
    },
    long: {
      ru: 'Могу помочь с разработкой веб-приложений, лендингов, SPA, PWA, интеграцией с API и базами данных. Опыт работы с React, Next.js, TypeScript, Tailwind CSS, Supabase и другими технологиями.',
      en: 'I can assist with web application development, landing pages, SPA, PWA, API integration, and databases. Experienced with React, Next.js, TypeScript, Tailwind CSS, Supabase, and other technologies.',
    },
    tech: [ 'React', 'TypeScript', 'Tailwind CSS' ],
    categories: ['commercial'],
    links: { github: null, live: null },
  },
  {
    id: 'sitiy-zver',
    featured: true,
    accent: 2,
    image: '/projects/sitiy-zver.jpg',
    title: { ru: 'Интернет-магазин зоотоваров - «Сытый зверь»', en: 'Pet Supplies E-commerce - «Sated Beast»' },
    short: {
      ru: 'E-commerce платформа с нуля для сети зоотоваров — первый онлайн-канал продаж компании. Полный fullstack-цикл: от каталога и API до продакшена.',
      en: 'E-commerce platform built from scratch for a pet supplies chain — the company’s first online sales channel. Full fullstack cycle: from catalog and API to production.',
    },
    long: {
      ru: 'Разработал интернет-магазин с нуля для сети зоотоваров в Ставропольском и Краснодарском крае — первый онлайн-канал продаж компании. Взял на себя весь стек: React/TypeScript на фронтенде, ASP.NET Core (C#) на бэкенде, PostgreSQL для хранения данных. Спроектировал и реализовал REST API (20+ эндпоинтов), бизнес-логику и модели данных, участвовал в проектировании архитектуры приложения. После релиза 6 месяцев поддерживал продукт: устранял дефекты, внедрял новые требования.',
      en: 'Developed an e-commerce platform from scratch for a pet supplies chain — the company’s first online sales channel. Full fullstack cycle: from catalog and API to production.',
    },
    tech: ['React', 'TypeScript', 'Redux Toolkit', 'ASP.NET Core', 'C#', 'PostgreSQL', 'Rest API', 'Tailwind CSS', 'JWT'],
    categories: ['commercial', 'design', 'api'],
    links: { github: null, live: null },
  }
];

export const featuredProjects = projects.filter((p) => p.featured);

// Порядок и состав фильтров на странице «Все проекты»
export const categoryOrder = ['all', 'commercial', 'pet', 'design', 'api', 'learning'];

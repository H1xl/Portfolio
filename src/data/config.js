export const SITE = {
  name: 'H1xl',
  fullName: { ru: 'Александр Хоменко', en: 'Alexander Khomenko' },
  role: {
    ru: 'Frontend / Fullstack разработчик',
    en: 'Frontend / Fullstack developer',
  },

  avatarUrl: 'https://github.com/H1xl.png?size=240',

  // Внешний источник проектов (см. docs/PROJECTS_REPO.md). Пусто — локальные данные.
  projectsUrl: '',

  links: {
    github: 'https://github.com/H1xl',
    telegram: 'https://t.me/H1xlBit',
    email: 'alexandrhomenko.business@yandex.ru',
    linkedin: '',
  },

  resumeUrl: '',

  // EmailJS (см. docs/EMAIL_SETUP.md)
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  },
};

export const isEmailJsConfigured = () =>
  Boolean(
    SITE.emailjs.serviceId && SITE.emailjs.templateId && SITE.emailjs.publicKey
  );

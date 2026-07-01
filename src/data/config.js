// Основные настройки сайта. Правь здесь имя, ссылки, резюме и ключи EmailJS.
export const SITE = {
  name: 'H1xl',
  fullName: { ru: 'Александр Хоменко', en: 'Alexander Khomenko' },
  role: {
    ru: 'Frontend / Fullstack разработчик',
    en: 'Frontend / Fullstack developer',
  },

  links: {
    github: 'https://github.com/H1xl',
    telegram: 'https://t.me/H1xlBit',
    email: 'alexandrhomenko.business@yandex.ru',
    linkedin: '', // укажи ссылку на профиль LinkedIn (пока пусто)
  },

  // Чтобы включить кнопку «Скачать резюме»: положи файл в public/ (например resume.pdf)
  // и укажи '/resume.pdf', либо вставь внешнюю ссылку. Пустая строка — кнопка ведёт к контактам.
  resumeUrl: '',

  // EmailJS — заполняется через .env.local (см. .env.example). Публичные ключи можно
  // хранить в клиенте: они предназначены для фронтенда.
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  },
};

export const isEmailJsConfigured = () =>
  Boolean(
    SITE.emailjs.serviceId &&
      SITE.emailjs.templateId &&
      SITE.emailjs.publicKey
  );

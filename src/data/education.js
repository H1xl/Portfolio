// image: путь к фото места обучения/курса, напр. '/education/college.jpg'
// (файл в public/education/) или внешний URL. Показывается как слегка
// заблюренный фон карточки (~9% непрозрачности). null — фона нет.
export const education = {
  formal: {
    institution: {
      ru: 'Ставропольский колледж связи имени Героя Советского Союза В. А. Петрова',
      en: 'Stavropol College of Communications named after Hero of the Soviet Union V. A. Petrov',
    },
    specialty: {
      ru: '09.02.07 — Информационные системы и программирование',
      en: '09.02.07 — Information Systems and Programming',
    },
    period: '2021 — 2025',
    degree: { ru: 'Колледж · СПО', en: 'College degree' },
    image: null, // напр. '/education/college.jpg'
  },

  // ЗАГЛУШКИ курсов — замени на свои пройденные курсы.
  courses: [
    {
      title: { ru: 'React — с нуля до профи', en: 'React — from zero to pro' },
      platform: { ru: 'Онлайн-курс', en: 'Online course' },
      year: '2023',
      image: null,
    },
    {
      title: {
        ru: 'TypeScript для разработчиков',
        en: 'TypeScript for developers',
      },
      platform: { ru: 'Онлайн-курс', en: 'Online course' },
      year: '2024',
      image: null,
    },
    {
      title: {
        ru: 'Fullstack: Node.js + PostgreSQL',
        en: 'Fullstack: Node.js + PostgreSQL',
      },
      platform: { ru: 'Онлайн-курс', en: 'Online course' },
      year: '2024',
      image: null,
    },
  ],
};

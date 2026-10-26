export const mockUser = {
  name: 'Александр',
  balance: 2450,
  purchasedCourseIds: [1], // ID курсов, которые уже куплены
};

export const mockStats = {
  lessons: '180+',
  students: '2500+',
  experience: '11 лет',
  masterClasses: '600+',
};

export const mockCourses = [
  {
    id: 1,
    title: 'Базовый курс барбера',
    description: 'Фундаментальная программа для начинающих. Разберем все формы, техники и комбинации.',
    price: 14900,
    oldPrice: 19900,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
    tag: 'Хит',
    lessons: 24,
    duration: '6 недель',
    program: [
      'Введение в профессию и инструменты',
      'Классические стрижки и переходы',
      'Работа с бородой и укладка',
      'Клиентский сервис и продажи',
    ],
  },
  {
    id: 2,
    title: 'Удлиненные дизайны',
    description: 'Продвинутый блок по работе с длинными волосами. Формы, текстура, объем.',
    price: 19900,
    oldPrice: 24900,
    image: 'https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?auto=format&fit=crop&q=80&w=800',
    tag: 'Топ',
    lessons: 18,
    duration: '4 недели',
    program: [
      'Архитектура удлиненных форм',
      'Техники градуировки и слоев',
      'Работа с текстурой и объемом',
      'Финальные укладки и стайлинг',
    ],
  },
  {
    id: 3,
    title: 'Контент для мастера',
    description: 'Как снимать, выкладывать и упаковывать свои работы, чтобы привлекать клиентов.',
    price: 9900,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    tag: 'Новинка',
    lessons: 12,
    duration: '3 недели',
    program: [
      'Что снимать и как снимать',
      'Обработка и монтаж видео',
      'Ведение Instagram и Reels',
      'Упаковка личного бренда',
    ],
  },
];

export const mockReviews = [
  {
    id: 1,
    name: 'Михаил',
    text: 'Завидовал инста-стрижкам. Теперь делаю сам и не боюсь сложных форм!',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 2,
    name: 'Артем',
    text: 'Жил от зарплаты до зарплаты. После курса поднял цены в два раза.',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 3,
    name: 'Иван',
    text: 'Страх от того, что не видел перспектив. Сейчас строю личный бренд.',
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
];
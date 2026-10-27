import React, { useState } from 'react';
import { mockStats, mockCourses, mockReviews, mockUser } from './data';
import { PlayIcon, StarIcon } from './icons';
import { CourseCard, Accordion } from './components';

export function HomeScreen({ user, onCatalog, onCourse }) {
  const featuredCourses = mockCourses.slice(0, 2);
  const reasons = [
    { id: '01', title: 'Только практика', desc: 'Никакой воды. Разбираем реальные кейсы.' },
    { id: '02', title: 'Доступ навсегда', desc: 'Смотрите уроки в любое время.' },
    { id: '03', title: 'Обратная связь', desc: 'Кураторы проверяют ваши работы.' },
    { id: '04', title: 'Закрытое комьюнити', desc: 'Чат с мастерами и клиентами.' },
  ];

  return (
    <div className="flex flex-col w-full min-h-full pb-10">
      <div className="mb-6 mt-2 animate-fade-up">
        <h2 className="text-gray-400 text-sm font-medium mb-1">Привет, {user.name} 👋</h2>
        <h1 className="text-3xl font-black tracking-tight leading-tight text-white">
          Прокачайся в барберинге <br />
          {/* Убрали синий, сделали строгий белый */}
          <span className="text-white">и стань топ-мастером</span>
        </h1>
      </div>

      {/* Статистика (теперь черно-белая) */}
      <div className="grid grid-cols-2 gap-3 mb-8 animate-fade-up delay-100">
        <div className="glass-panel rounded-2xl p-4">
          <p className="text-2xl font-black text-white">{mockStats.lessons}</p>
          <p className="text-[10px] text-gray-400">Уроков в базе</p>
        </div>
        <div className="glass-panel rounded-2xl p-4">
          <p className="text-2xl font-black text-white">{mockStats.students}</p>
          <p className="text-[10px] text-gray-400">Учеников внутри</p>
        </div>
      </div>

      <div className="space-y-3 mb-8 animate-fade-up delay-200">
        {/* Главная кнопка осталась синей для акцента */}
        <button onClick={onCatalog} className="w-full py-4 bg-[#3390ec] text-white font-black text-lg rounded-2xl active:scale-[0.97] transition-transform shadow-[0_0_30px_rgba(51,144,236,0.3)] flex items-center justify-center gap-2">
          <PlayIcon className="w-5 h-5" /> Перейти в каталог курсов
        </button>
      </div>

      {/* Причины */}
      <div className="mb-10 animate-fade-up delay-300">
        <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">4 причины попасть в нашу школу</h3>
        <div className="space-y-3">
          {reasons.map((reason) => (
            <div key={reason.id} className="glass-panel rounded-2xl p-4 flex items-start gap-4">
              <span className="text-2xl font-black text-gray-600 leading-none mt-1">{reason.id}</span>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">{reason.title}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Рекомендуемые курсы */}
      <div className="mb-8 animate-fade-up delay-400">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Рекомендуем</h3>
          <button onClick={onCatalog} className="text-white text-xs font-bold hover:text-gray-300 transition-colors">Все курсы</button>
        </div>
        <div className="grid gap-3">
          {featuredCourses.map(course => (
            <CourseCard key={course.id} course={course} onClick={() => onCourse(course)} />
          ))}
        </div>
      </div>

      {/* Отзывы */}
      <div className="animate-fade-up delay-400 relative">
        <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">Отзывы учеников</h3>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee">
            {[...mockReviews, ...mockReviews].map((review, index) => (
              <div key={index} className="glass-panel rounded-2xl p-4 w-[240px] shrink-0 mr-3">
                <div className="flex items-center gap-3 mb-2">
                  <img src={review.avatar} alt={review.name} className="w-8 h-8 rounded-full bg-gray-700" />
                  <p className="text-xs font-bold text-white">{review.name}</p>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CatalogScreen({ onCourse, onBack }) {
  return (
    <div className="flex flex-col min-h-full pb-10">
      <div className="flex items-center mb-6 mt-2 animate-fade-up">
        <button onClick={onBack} className="mr-3 p-2 -ml-2 text-gray-400 active:scale-90 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <h1 className="text-2xl font-black uppercase tracking-tight text-white">Каталог курсов</h1>
      </div>
      <div className="grid gap-4 animate-fade-up delay-100">
        {mockCourses.map(course => (
          <CourseCard key={course.id} course={course} onClick={() => onCourse(course)} />
        ))}
      </div>
    </div>
  );
}

export function CourseScreen({ course, onBack, onBuy }) {
  const [openProgram, setOpenProgram] = useState(false);

  return (
    <div className="flex flex-col min-h-full pb-24">
      <div className="relative h-64 w-full -mx-5 -mt-8 mb-6 animate-fade-up">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover grayscale-[30%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <button onClick={onBack} className="absolute top-6 left-5 p-2 bg-black/50 backdrop-blur-md rounded-full text-white active:scale-90 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div className="absolute bottom-6 left-5 right-5">
          <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">{course.title}</h1>
          <p className="text-gray-300 text-sm">{course.description}</p>
        </div>
      </div>

      <div className="space-y-4 animate-fade-up delay-100">
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-panel rounded-xl p-3 text-center">
            <p className="text-lg font-black text-white">{course.lessons}</p>
            <p className="text-[10px] text-gray-400">Уроков</p>
          </div>
          <div className="glass-panel rounded-xl p-3 text-center">
            <p className="text-lg font-black text-white">{course.duration}</p>
            <p className="text-[10px] text-gray-400">Длительность</p>
          </div>
        </div>

        <Accordion title="Программа курса" isOpen={openProgram} onToggle={() => setOpenProgram(!openProgram)}>
          <ul className="list-disc pl-4 space-y-1">
            {course.program.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </Accordion>

        <div className="glass-panel rounded-2xl p-5">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Стоимость</p>
              <div className="flex items-baseline gap-2">
                {course.oldPrice && <span className="text-sm text-gray-500 line-through">{course.oldPrice.toLocaleString('ru-RU')} ₽</span>}
                <span className="text-3xl font-black text-white">{course.price.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
            {course.oldPrice && (
              <span className="bg-white/10 text-white text-xs font-bold px-2 py-1 rounded-md">
                -{Math.round((1 - course.price / course.oldPrice) * 100)}%
              </span>
            )}
          </div>
          <button onClick={() => onBuy(course)} className="w-full py-4 bg-[#3390ec] text-white font-black text-lg rounded-xl active:scale-[0.97] transition-transform shadow-[0_0_30px_rgba(51,144,236,0.3)]">
            Купить курс
          </button>
        </div>
      </div>
    </div>
  );
}

export function CheckoutScreen({ course, user, onPay, onBack }) {
  return (
    <div className="flex flex-col min-h-full pb-10">
      <div className="flex items-center mb-6 mt-2 animate-fade-up">
        <button onClick={onBack} className="mr-3 p-2 -ml-2 text-gray-400 active:scale-90 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <h1 className="text-2xl font-black uppercase tracking-tight text-white">Оформление</h1>
      </div>

      <div className="space-y-4 animate-fade-up delay-100">
        <div className="glass-panel rounded-2xl p-4 flex items-center gap-4">
          <img src={course.image} alt={course.title} className="w-16 h-16 rounded-xl object-cover" />
          <div>
            <h3 className="font-bold text-white text-sm">{course.title}</h3>
            <p className="text-white font-black">{course.price.toLocaleString('ru-RU')} ₽</p>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Способ оплаты</h3>
          
          <label className="flex items-center justify-between p-3 border border-white/20 bg-white/5 rounded-xl cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              <span className="text-sm text-white font-medium">Банковская карта</span>
            </div>
            <span className="text-[10px] text-gray-400">Visa / MC / МИР</span>
          </label>

          <label className="flex items-center justify-between p-3 border border-white/10 rounded-xl cursor-pointer opacity-50">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center"></div>
              <span className="text-sm text-white font-medium">С баланса ({user.balance} ₽)</span>
            </div>
            <span className="text-[10px] text-gray-400">Недостаточно</span>
          </label>
        </div>

        <button onClick={() => onPay(course)} className="w-full py-4 bg-[#3390ec] text-white font-black text-lg rounded-xl active:scale-[0.97] transition-transform shadow-[0_0_30px_rgba(51,144,236,0.3)] mt-4">
          Оплатить {course.price.toLocaleString('ru-RU')} ₽
        </button>
        <p className="text-[10px] text-gray-500 text-center px-4 leading-relaxed">
          Нажимая кнопку, вы соглашаетесь с условиями <span className="text-white underline">Публичной оферты</span> и <span className="text-white underline">Политикой возврата</span>.
        </p>
      </div>
    </div>
  );
}

export function ProfileScreen({ user, onSupport }) {
  const [openDoc, setOpenDoc] = useState(null);
  const purchasedCourses = mockCourses.filter(c => user.purchasedCourseIds.includes(c.id));

  return (
    <div className="flex flex-col min-h-full pb-10">
      <div className="mb-6 mt-2 animate-fade-up">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Профиль</p>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white">{user.name}</h1>
      </div>

      <div className="mb-8 animate-fade-up delay-100">
        <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Баланс</h2>
        {/* Карточка баланса теперь строгая, черно-белая */}
        <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-[#1c1c1c] to-[#0a0a0a] border border-white/10">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <p className="text-sm text-gray-400 mb-1 relative">Доступно</p>
          <p className="text-4xl font-black text-white relative">
            {user.balance.toLocaleString('ru-RU')} ₽
          </p>
          <button className="mt-5 bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold relative active:scale-95 transition-transform">
            Пополнить
          </button>
        </div>
      </div>

      <div className="mb-8 animate-fade-up delay-200">
        <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Мои курсы</h2>
        <div className="space-y-3">
          {purchasedCourses.length === 0 ? (
            <div className="glass-panel rounded-2xl p-6 text-center text-gray-500 text-sm">
              У вас пока нет купленных курсов
            </div>
          ) : (
            purchasedCourses.map(course => (
              <div key={course.id} className="glass-panel rounded-2xl p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
                <div className="flex items-center gap-3">
                  <img src={course.image} alt="" className="w-12 h-12 rounded-lg object-cover grayscale-[20%]" />
                  <div>
                    <h3 className="font-bold text-white text-sm">{course.title}</h3>
                    <p className="text-[10px] text-gray-400">Доступ открыт</p>
                  </div>
                </div>
                <PlayIcon className="w-5 h-5 text-white" />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mb-8 animate-fade-up delay-300">
        <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Документы</h2>
        <div className="space-y-2">
          <Accordion title="Политика возврата" isOpen={openDoc === 'refund'} onToggle={() => setOpenDoc(openDoc === 'refund' ? null : 'refund')}>
            <p className="mb-2"><strong className="text-gray-300">1. Условия возврата</strong></p>
            <p className="mb-2">Возврат денежных средств за приобретенные онлайн-курсы возможен в течение 14 календарных дней с момента оплаты, при условии, что доступ к материалам не был использован.</p>
          </Accordion>
          <Accordion title="Публичная оферта" isOpen={openDoc === 'offer'} onToggle={() => setOpenDoc(openDoc === 'offer' ? null : 'offer')}>
            <p className="mb-2"><strong className="text-gray-300">1. Общие положения</strong></p>
            <p className="mb-2">Настоящая Оферта является официальным предложением ИП Иванов И.И. заключить договор на оказание информационно-консультационных услуг.</p>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

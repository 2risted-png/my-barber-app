import { useEffect, useState } from 'react';
import { mockUser } from './data';
import { HomeIcon, UserIcon, CartIcon, SupportIcon } from './icons';
import { HomeScreen, CatalogScreen, CourseScreen, CheckoutScreen, ProfileScreen } from './screens';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#000000');
      tg.setBackgroundColor('#000000');
    }
  }, []);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg?.BackButton) return;

    if (['catalog', 'course', 'checkout'].includes(screen)) {
      tg.BackButton.show();
      const handler = () => {
        if (screen === 'course') setScreen('catalog');
        else if (screen === 'checkout') setScreen('course');
        else setScreen('home');
      };
      tg.BackButton.onClick(handler);
      return () => tg.BackButton.offClick(handler);
    } else {
      tg.BackButton.hide();
    }
  }, [screen]);

  const handleBuy = (course) => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.showPopup({
        title: 'Оплата прошла успешно!',
        message: `Курс "${course.title}" добавлен в ваш личный кабинет.`,
        buttons: [{ type: 'default', text: 'Отлично' }]
      }, () => {
        if (!mockUser.purchasedCourseIds.includes(course.id)) {
          mockUser.purchasedCourseIds.push(course.id);
        }
        setScreen('profile');
      });
    } else {
      alert(`Курс "${course.title}" куплен!`);
      if (!mockUser.purchasedCourseIds.includes(course.id)) {
        mockUser.purchasedCourseIds.push(course.id);
      }
      setScreen('profile');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#111111] flex items-center justify-center p-4 font-sans">
      <div className="relative w-full max-w-[400px] h-[800px] max-h-[90vh] bg-black rounded-[40px] border-[6px] border-[#222] overflow-hidden flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="bg-glow" />
          <div className="absolute inset-0 bg-grid" />
        </div>

        <div className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-5 pt-8 pb-28 [&::-webkit-scrollbar]:hidden">
          {screen === 'home' && (
            <HomeScreen 
              user={mockUser} 
              onCatalog={() => setScreen('catalog')} 
              onCourse={(c) => { setSelectedCourse(c); setScreen('course'); }} 
            />
          )}
          {screen === 'catalog' && <CatalogScreen onCourse={(c) => { setSelectedCourse(c); setScreen('course'); }} onBack={() => setScreen('home')} />}
          {screen === 'course' && selectedCourse && <CourseScreen course={selectedCourse} onBack={() => setScreen('catalog')} onBuy={(c) => { setSelectedCourse(c); setScreen('checkout'); }} />}
          {screen === 'checkout' && selectedCourse && <CheckoutScreen course={selectedCourse} user={mockUser} onPay={handleBuy} onBack={() => setScreen('course')} />}
          {screen === 'profile' && <ProfileScreen user={mockUser} onSupport={() => {}} />}
        </div>

        {screen === 'profile' && (
          <div className="absolute bottom-[88px] right-6 z-30 animate-fade-up delay-400">
            <button
              onClick={() => window.Telegram?.WebApp?.openTelegramLink('https://t.me/telegram')}
              className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.9] transition-transform duration-150"
            >
              <SupportIcon className="w-6 h-6" />
            </button>
          </div>
        )}

        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center px-4 pointer-events-none">
          <div className="flex items-center gap-2 p-2 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full pointer-events-auto">
            <button onClick={() => setScreen('home')} className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-150 ${screen === 'home' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <HomeIcon className="w-5 h-5" />
            </button>
            <button onClick={() => setScreen('catalog')} className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-150 ${screen === 'catalog' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <CartIcon className="w-5 h-5" />
            </button>
            <button onClick={() => setScreen('profile')} className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-150 ${screen === 'profile' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <UserIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

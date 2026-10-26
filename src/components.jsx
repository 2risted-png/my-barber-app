import React from 'react';
import { StarIcon } from './icons';

export function CourseCard({ course, onClick }) {
  return (
    <div onClick={onClick} className="glass-panel rounded-3xl overflow-hidden cursor-pointer group active:scale-[0.98] transition-transform duration-200">
      <div className="relative h-40 w-full overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        {course.tag && (
          <span className="absolute top-3 left-3 bg-[#3390ec] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
            {course.tag}
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg leading-tight mb-1">{course.title}</h3>
          <p className="text-gray-300 text-[11px] line-clamp-1">{course.description}</p>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="flex flex-col">
          {course.oldPrice && <span className="text-[10px] text-gray-500 line-through">{course.oldPrice.toLocaleString('ru-RU')} ₽</span>}
          <span className="text-[#3390ec] font-black text-xl">{course.price.toLocaleString('ru-RU')} ₽</span>
        </div>
        <div className="bg-white/10 w-9 h-9 rounded-full flex items-center justify-center group-hover:bg-[#3390ec] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ title, children, isOpen, onToggle }) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-4 active:bg-white/5 transition-colors">
        <span className="text-sm text-white font-medium">{title}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-90 bg-[#3390ec]/20 text-[#3390ec]' : 'bg-white/5 text-gray-500'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-4 pb-4 text-[13px] text-gray-400 leading-relaxed whitespace-pre-wrap">{children}</div>
        </div>
      </div>
    </div>
  );
}
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Импорт плагина

export default defineConfig({
    base: './', // <-- Добавьте эту строку
  plugins: [react(), tailwindcss()], // Добавление плагина в массив
})

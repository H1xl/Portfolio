import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base — путь публикации на GitHub Pages: https://H1xl.github.io/ИМЯ-РЕПО/
// Поменяй 'portfolio' на имя своего репозитория (или '/' для user.github.io).
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base — путь публикации на GitHub Pages (см. docs/DEPLOYMENT.md)
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react()],
});

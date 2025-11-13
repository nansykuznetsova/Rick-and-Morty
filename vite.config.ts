import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  base: '/Rick-and-Morty/',
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});

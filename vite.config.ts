import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  base: '/Rick-and-Morty/',
  plugins: [
    react(),
    svgr(),
    viteImagemin({
      pngquant: {
        quality: [0.7, 0.9]
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  base: '/Rick-and-Morty/',
  plugins: [
    {
      name: 'trailing-slash-redirect',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (
            req.url &&
            req.url.startsWith('/Rick-and-Morty') &&
            !req.url.startsWith('/Rick-and-Morty/')
          ) {
            req.url = '/Rick-and-Morty/' + req.url.slice('/Rick-and-Morty'.length);
          }
          next();
        });
      }
    },
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

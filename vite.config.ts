import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
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
            req.url =
              '/Rick-and-Morty/' + req.url.slice('/Rick-and-Morty'.length);
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
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'maskable-icon.png'],
      workbox: {
        globPatterns: ['**/*.{html,css,js,png,svg}'], // <- особенно обратить внимание
        globIgnores: ['**/screenshots/**'],
        inlineWorkboxRuntime: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/rickandmortyapi\.com\/.*$/, // <- особенно обратить внимание
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache'
            }
          }
        ]
      },
      manifest: {
        name: 'Rick&Morty PWA App',
        short_name: 'R&M_PWA',
        description:
          'PWA приложение со списком персонажей вселенной Рика и Морти',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/Rick-and-Morty/',
        scope: '/Rick-and-Morty/',
        orientation: 'portrait',
        lang: 'ru-RU',
        screenshots: [
          // <- особенно обратить внимание
          {
            src: 'screenshots/desktop.png',
            type: 'image/png',
            sizes: '2107x1327',
            form_factor: 'wide'
          },
          {
            src: 'screenshots/mobile.png',
            type: 'image/png',
            sizes: '346x716',
            form_factor: 'narrow'
          }
        ],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'maskable-icon.png',
            sizes: '1024x1024',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  base: '/Rick-and-Morty/',
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});

/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [{
    name: 'trailing-slash-redirect',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && req.url.startsWith('/Rick-and-Morty') && !req.url.startsWith('/Rick-and-Morty/')) {
          req.url = '/Rick-and-Morty/' + req.url.slice('/Rick-and-Morty'.length);
        }
        next();
      });
    }
  }, react(), svgr(), viteImagemin({
    pngquant: {
      quality: [0.7, 0.9]
    }
  }), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'maskable-icon.png'],
    workbox: {
      globPatterns: ['**/*.{html,css,js,png,svg}'],
      globIgnores: ['**/screenshots/**'],
      inlineWorkboxRuntime: true,
      runtimeCaching: [{
        urlPattern: /^https:\/\/rickandmortyapi\.com\/.*$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache'
        }
      }]
    },
    manifest: {
      name: 'Rick&Morty PWA App',
      short_name: 'R&M_PWA',
      description: 'PWA приложение со списком персонажей вселенной Рика и Морти',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/Rick-and-Morty/',
      scope: '/Rick-and-Morty/',
      orientation: 'portrait',
      lang: 'ru-RU',
      screenshots: [{
        src: 'screenshots/desktop.png',
        type: 'image/png',
        sizes: '2107x1327',
        form_factor: 'wide'
      }, {
        src: 'screenshots/mobile.png',
        type: 'image/png',
        sizes: '346x716',
        form_factor: 'narrow'
      }],
      icons: [{
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      }, {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }, {
        src: 'maskable-icon.png',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'maskable'
      }]
    }
  })],
  base: '/Rick-and-Morty/',
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});
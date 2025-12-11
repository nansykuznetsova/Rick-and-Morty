# Rick & Morty Explorer 🚀

Добро пожаловать в проект **Rick & Morty Explorer** - интерактивное
фронтенд‑приложение на базе Rick and Morty API, созданное с
использованием React + TypeScript + Vite.

Проект развёрнут на **GitHub Pages**.
https://nansykuznetsova.github.io/Rick-and-Morty/

---

## 🎯 Коротко о проекте

- Просмотр персонажей вселенной Rick & Morty
- Поиск, фильтры, бесконечная прокрутка
- Детальные карточки персонажей
- Быстрое и удобное приложение с современным UI

---

## 🧰 Технологии

- React + TypeScript
- Vite
- CSS
- REST API: rickandmortyapi.com
- GitHub Pages

---

## 📁 Структура проекта

    /src/
    ├─ constants/        – глобальные константы приложения
    ├─ pages/            – страницы приложения (роуты)

    ├─ shared/           – переиспользуемые модули
    │   ├─ api/          – логика работы с API (запросы, клиенты)
    │   ├─ assets/       – статические ресурсы (иконки, изображения и т.п.)
    │   ├─ lib/          – вспомогательные утилиты
    │   │   ├─ helpers/ – вспомогательные функции
    │   │   ├─ hooks/   – кастомные React-хуки
    │   │   └─ index.ts – публичный экспорт lib
    │   ├─ ui/           – UI-компоненты
    │   │   ├─ EditButtons/
    │   │   ├─ Footer/
    │   │   ├─ Header/
    │   │   ├─ Input/
    │   │   ├─ Layout/
    │   │   ├─ Loader/
    │   │   ├─ Logo/
    │   │   ├─ Select/
    │   │   ├─ Status/
    │   │   └─ index.ts – публичный экспорт UI-компонентов
    │   └─ index.ts     – публичный экспорт shared-модулей

    ├─ types/            – глобальные TypeScript-типы и интерфейсы

    ├─ widgets/          – композиционные виджеты
    │   ├─ CharacterCard/
    │   ├─ FilterPanel/
    │   ├─ InfiniteScroll/
    │   └─ index.ts     – публичный экспорт виджетов

    ├─ App.css           – глобальные стили приложения
    ├─ App.tsx           – корневой компонент приложения
    ├─ index.css         – базовые стили
    ├─ main.tsx          – точка входа в приложение
    └─ vite-env.d.ts     – типы окружения Vite

---

## 🚀 Установка и запуск

```bash
git clone https://github.com/nansykuznetsova/Rick-and-Morty.git
cd Rick-and-Morty
npm install
npm run dev
```

---

## 🧬 Функционал

- Список персонажей
- Фильтрация по статусу, виду, имени
- Поиск
- Бесконечная прокрутка
- Детальная страница персонажа
- Адаптивный интерфейс

---

## 🛠️ Особенности реализации

- Полная типизация данных с TypeScript
- Разделение слоёв: UI / pages / API / types
- Обработка ошибок API
- Быстрая загрузка благодаря Vite

---

## 🙋 Автор

GitHub: https://github.com/nansykuznetsova

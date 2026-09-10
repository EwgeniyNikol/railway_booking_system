# railway_booking_system

Дипломный проект — SPA для системы бронирования ж/д билетов на React + TypeScript.

## Демо

- **GitHub Pages**: (будет добавлено после деплоя)
- **API**: https://students.netoservices.ru/fe-diplom

## Технологии

- **React 19** + **TypeScript**
- **Vite** — сборка
- **Redux Toolkit** — глобальное состояние
- **React Router 7** — роутинг
- **SCSS-модули** — стили
- **ESLint + Prettier** — качество кода

## Функциональность

- Поиск городов с подсказками
- Поиск направлений с фильтрами и сортировкой
- Выбор мест в вагоне
- Оформление заказа
- Подписка на новости
- Адаптивная вёрстка

## Структура проекта

src/
  api/              — запросы к API
  components/       — компоненты
    choose-train/   — компоненты страницы выбора поезда
  fonts/            — локальные шрифты
  images/           — изображения и иконки
  pages/            — страницы
  store/            — Redux Toolkit
    selectors/      — селекторы
    slices/         — срезы
  styles/           — SCSS-миксины
  index.scss        — глобальные стили
  App.tsx           — роутинг
  main.tsx          — точка входа

## Установка и запуск

npm install
npm run dev

Откройте http://localhost:5173/

## Скрипты

npm run dev           — запуск dev-сервера
npm run build         — сборка
npm run preview       — предпросмотр сборки
npm run lint          — проверка ESLint
npm run format        — форматирование Prettier
npm run format:check  — проверка форматирования

## Страницы

- `/` — главная
- `/choose-train` — выбор поезда

## API

Базовый URL: `https://students.netoservices.ru/fe-diplom`

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| GET | `/routes/cities?name=` | Поиск городов |
| GET | `/routes/last` | Последние направления |
| GET | `/routes?from_city_id=&to_city_id=&...` | Поиск направлений |
| GET | `/routes/{id}/seats` | Места в вагоне |
| POST | `/routes/order` | Оформление заказа |
| GET | `/subscribe?email=` | Подписка |


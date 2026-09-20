# railway_booking_system

SPA для системы бронирования ж/д билетов на React + TypeScript.

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
- Подтверждение заказа
- Оценка сервиса
- Подписка на новости
- Адаптивная вёрстка

## Структура проекта

src/
  api/                    — запросы к API
  components/             — компоненты
    common/               — общие компоненты (Calendar, CityInput, NextButton)
    choose-train/         — компоненты страницы выбора поезда
    choose-seats/         — компоненты страницы выбора мест
    passengers/           — компоненты страницы пассажиров (TripDetails, PassengerCard)
    payment/              — компоненты страницы оплаты (PaymentCard)
    order/                — компоненты страницы подтверждения заказа
    order-success/        — компоненты страницы успешного заказа
    Header/               — шапка главной страницы
    About/                — блок «О нас»
    HowItWorks/           — блок «Как это работает»
    Reviews/              — блок «Отзывы»
    Footer/               — подвал
  fonts/                  — локальные шрифты
  images/                 — изображения и иконки
  pages/                  — страницы
  store/                  — Redux Toolkit
    selectors/            — селекторы
    slices/               — срезы
  styles/                 — SCSS-миксы
  types/                  — типы API
  utils/                  — утилиты (валидация)
  index.scss              — глобальные стили
  App.tsx                 — роутинг
  main.tsx                — точка входа

## Установка и запуск

npm install
npm run dev

Откройте http://localhost:5173/

### Mock-сервер

В dev-режиме используется локальный mock-сервер (Express + CORS):

cd mock-server
npm install
node server.js

Сервер запускается на http://localhost:3001

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
- `/choose-seats` — выбор мест
- `/passengers` — ввод данных пассажиров
- `/payment` — оплата
- `/order` — подтверждение заказа
- `/order-success` — успешное оформление заказа

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
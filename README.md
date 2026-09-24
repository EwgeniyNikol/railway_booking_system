# railway_booking_system

[![CI](https://github.com/EwgeniyNikol/railway_booking_system/actions/workflows/deploy.yml/badge.svg)](https://github.com/EwgeniyNikol/railway_booking_system/actions/workflows/deploy.yml)

SPA для системы бронирования ж/д билетов на React + TypeScript.

## Демо

- **GitHub Pages**: [https://ewgeniynikol.github.io/railway_booking_system/](https://ewgeniynikol.github.io/railway_booking_system/)
- **API**: https://students.netoservices.ru/fe-diplom
- **Fallback API**: https://railway-booking-system-e82p.onrender.com

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
- Сохранение направления и дат поиска (localStorage, TTL 5 часов)
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
    common/               — общие компоненты (Calendar, CityInput, NextButton, LoadingBar, TrainIcons)
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
  hooks/                  — пользовательские хуки (useTooltip)
  images/                 — изображения и иконки
  pages/                  — страницы
  store/                  — Redux Toolkit
    selectors/            — селекторы
    slices/               — срезы
  styles/                 — SCSS-миксы
  types/                  — типы API и заказа
  utils/                  — утилиты (валидация, форматирование, сборка заказа, searchStorage, orderStorage)
  index.scss              — глобальные стили
  App.tsx                 — роутинг
  main.tsx                — точка входа

## Установка и запуск

npm install

### Dev-режим

Требуется **два терминала**.

**Терминал 1 — mock-сервер** (обязателен для dev, без него запросы уйдут в никуда):

cd mock-server
npm install
npm start

Сервер запускается на http://localhost:3001

**Терминал 2 — Vite:**

npm run dev

Откройте http://localhost:5173/railway_booking_system/

### Прод-сборка

npm run build && npm run preview

Откройте http://localhost:4173/railway_booking_system/

В прод-режиме mock-сервер не используется — запросы идут в Нетологию, при её недоступности — на Render.

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

Fallback: `https://railway-booking-system-e82p.onrender.com` (mock-сервер на Render, используется если Нетология недоступна).

Логика: при первом запросе пингуется Нетология (таймаут 3 сек). Если отвечает — используется она. Если нет — Render. При ошибке текущего — fallback на второй, с обновлением кэша.

Исключение — подписка (`/subscribe`): у Нетологии этого эндпоинта нет, запрос сразу идёт на Render.

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| GET | `/routes/cities?name=` | Поиск городов |
| GET | `/routes/last` | Последние направления |
| GET | `/routes?from_city_id=&to_city_id=&...` | Поиск направлений |
| GET | `/routes/{id}/seats` | Места в вагоне |
| POST | `/order` | Оформление заказа |
| GET | `/subscribe?email=` | Подписка |

## Деплой

- **Фронт** — GitHub Pages (GitHub Actions)
- **Бэк** — Render (mock-сервер)
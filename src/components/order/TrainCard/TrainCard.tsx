import { useState, useRef, useEffect } from 'react';
import styles from './TrainCard.module.scss';

const capitalizeCity = (name: string) =>
  name
    .split(/[-\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(name.includes('-') ? '-' : ' ');

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const formatDuration = (fromTs: number, toTs: number): string => {
  const diffSec = Math.abs(toTs - fromTs);
  const hours = Math.floor(diffSec / 3600);
  const minutes = Math.floor((diffSec % 3600) / 60);
  return `${hours} : ${String(minutes).padStart(2, '0')}`;
};

const testRoute = {
  train: { name: 'Иволга - 10' },
  from: {
    railway_station_name: 'Ленинградский',
    city: { name: 'москва' },
    datetime: 1798761600,
  },
  to: {
    railway_station_name: 'Московский',
    city: { name: 'санкт-петербург' },
    datetime: 1798776000,
  },
  have_first_class: true,
  have_second_class: true,
  have_third_class: true,
  have_fourth_class: true,
  have_wifi: true,
  is_express: false,
  have_air_conditioning: true,
  have_food: false,
  have_linens: false,
  available_seats_info: {
    first: 15,
    second: 24,
    third: 52,
    fourth: 88,
  },
  price_info: {
    first: { bottom_price: 4950, bottom_seats: 15 },
    second: {
      top_price: 3520,
      bottom_price: 3820,
      top_seats: 12,
      bottom_seats: 12,
    },
    third: {
      top_price: 2100,
      bottom_price: 2530,
      side_price: 1900,
      top_seats: 20,
      bottom_seats: 20,
      side_seats: 12,
    },
    fourth: { bottom_price: 1920, bottom_seats: 88 },
  },
};

const testReturnRoute = {
  train: { name: 'Иволга - 10' },
  from: {
    railway_station_name: 'Московский',
    city: { name: 'санкт-петербург' },
    datetime: 1798804800,
  },
  to: {
    railway_station_name: 'Ленинградский',
    city: { name: 'москва' },
    datetime: 1798819200,
  },
};

const TrainCard = () => {
  const route = testRoute;
  const returnRoute = testReturnRoute;
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTooltipToggle = (type: string) => {
    setOpenTooltip(openTooltip === type ? null : type);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setOpenTooltip(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.trainCard} ref={cardRef}>
      <div className={styles.trainCard__header}>
        <h2 className={styles.trainCard__title}>Поезд</h2>
      </div>

      <div className={styles.trainCard__body}>
        <div className={styles.trainCard__left}>
          <img
            src="/src/images/icon-train.svg"
            alt=""
            className={styles.trainCard__trainIcon}
          />
          <span className={styles.trainCard__trainNumber}>
            {route.train.name}
          </span>
          <span className={styles.trainCard__route}>
            {capitalizeCity(route.from.city.name)} →{' '}
            {capitalizeCity(route.to.city.name)}
          </span>
        </div>

        <div className={styles.trainCard__center}>
          <div className={styles.trainCard__row}>
            <div className={styles.trainCard__timeBlock}>
              <span className={styles.trainCard__time}>
                {formatTime(route.from.datetime)}
              </span>
              <span className={styles.trainCard__city}>
                {capitalizeCity(route.from.city.name)}
              </span>
              <span className={styles.trainCard__station}>
                {route.from.railway_station_name}
              </span>
            </div>

            <div className={styles.trainCard__arrowBlock}>
              <span className={styles.trainCard__duration}>
                {formatDuration(route.from.datetime, route.to.datetime)}
              </span>
              <img
                src="/src/images/arrow-duration.svg"
                alt=""
                className={styles.trainCard__arrow}
              />
            </div>

            <div className={styles.trainCard__timeBlock}>
              <span className={styles.trainCard__time}>
                {formatTime(route.to.datetime)}
              </span>
              <span className={styles.trainCard__city}>
                {capitalizeCity(route.to.city.name)}
              </span>
              <span className={styles.trainCard__station}>
                {route.to.railway_station_name}
              </span>
            </div>
          </div>

          <div className={styles.trainCard__row}>
            <div className={styles.trainCard__timeBlock}>
              <span className={styles.trainCard__time}>
                {formatTime(returnRoute.from.datetime)}
              </span>
              <span className={styles.trainCard__city}>
                {capitalizeCity(returnRoute.from.city.name)}
              </span>
              <span className={styles.trainCard__station}>
                {returnRoute.from.railway_station_name}
              </span>
            </div>

            <div className={styles.trainCard__arrowBlock}>
              <span className={styles.trainCard__duration}>
                {formatDuration(
                  returnRoute.from.datetime,
                  returnRoute.to.datetime
                )}
              </span>
              <img
                src="/src/images/arrow-duration-left.svg"
                alt=""
                className={styles.trainCard__arrow}
              />
            </div>

            <div className={styles.trainCard__timeBlock}>
              <span className={styles.trainCard__time}>
                {formatTime(returnRoute.to.datetime)}
              </span>
              <span className={styles.trainCard__city}>
                {capitalizeCity(returnRoute.to.city.name)}
              </span>
              <span className={styles.trainCard__station}>
                {returnRoute.to.railway_station_name}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.trainCard__right}>
          {route.have_fourth_class && (
            <div className={styles.trainCard__seatType}>
              <span className={styles.trainCard__seatName}>Сидячий</span>
              <span
                className={styles.trainCard__seatCount}
                onClick={() => handleTooltipToggle('fourth')}
              >
                {route.available_seats_info.fourth}
              </span>
              <span className={styles.trainCard__seatLabel}>от</span>
              <span className={styles.trainCard__seatPrice}>
                {route.price_info.fourth.bottom_price.toLocaleString('ru-RU')}
              </span>
              <img
                src="/src/images/icon-ruble.svg"
                alt=""
                className={styles.trainCard__seatCurrency}
              />
              {openTooltip === 'fourth' && (
                <div className={styles.trainCard__tooltip}>
                  {route.price_info.fourth.bottom_seats !== undefined && (
                    <div className={styles.trainCard__tooltipRow}>
                      <span className={styles.trainCard__tooltipName}>
                        Нижние
                      </span>
                      <span className={styles.trainCard__tooltipCount}>
                        {route.price_info.fourth.bottom_seats}
                      </span>
                      <span className={styles.trainCard__tooltipPrice}>
                        {route.price_info.fourth.bottom_price.toLocaleString(
                          'ru-RU'
                        )}
                      </span>
                      <img
                        src="/src/images/icon-ruble.svg"
                        alt=""
                        className={styles.trainCard__tooltipCurrency}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {route.have_third_class && (
            <div className={styles.trainCard__seatType}>
              <span className={styles.trainCard__seatName}>Плацкарт</span>
              <span
                className={styles.trainCard__seatCount}
                onClick={() => handleTooltipToggle('third')}
              >
                {route.available_seats_info.third}
              </span>
              <span className={styles.trainCard__seatLabel}>от</span>
              <span className={styles.trainCard__seatPrice}>
                {route.price_info.third.bottom_price.toLocaleString('ru-RU')}
              </span>
              <img
                src="/src/images/icon-ruble.svg"
                alt=""
                className={styles.trainCard__seatCurrency}
              />
              {openTooltip === 'third' && (
                <div className={styles.trainCard__tooltip}>
                  {route.price_info.third.top_seats !== undefined && (
                    <div className={styles.trainCard__tooltipRow}>
                      <span className={styles.trainCard__tooltipName}>
                        Верхние
                      </span>
                      <span className={styles.trainCard__tooltipCount}>
                        {route.price_info.third.top_seats}
                      </span>
                      <span className={styles.trainCard__tooltipPrice}>
                        {route.price_info.third.top_price?.toLocaleString(
                          'ru-RU'
                        )}
                      </span>
                      <img
                        src="/src/images/icon-ruble.svg"
                        alt=""
                        className={styles.trainCard__tooltipCurrency}
                      />
                    </div>
                  )}
                  {route.price_info.third.bottom_seats !== undefined && (
                    <div className={styles.trainCard__tooltipRow}>
                      <span className={styles.trainCard__tooltipName}>
                        Нижние
                      </span>
                      <span className={styles.trainCard__tooltipCount}>
                        {route.price_info.third.bottom_seats}
                      </span>
                      <span className={styles.trainCard__tooltipPrice}>
                        {route.price_info.third.bottom_price.toLocaleString(
                          'ru-RU'
                        )}
                      </span>
                      <img
                        src="/src/images/icon-ruble.svg"
                        alt=""
                        className={styles.trainCard__tooltipCurrency}
                      />
                    </div>
                  )}
                  {route.price_info.third.side_seats !== undefined && (
                    <div className={styles.trainCard__tooltipRow}>
                      <span className={styles.trainCard__tooltipName}>
                        Боковые
                      </span>
                      <span className={styles.trainCard__tooltipCount}>
                        {route.price_info.third.side_seats}
                      </span>
                      <span className={styles.trainCard__tooltipPrice}>
                        {route.price_info.third.side_price?.toLocaleString(
                          'ru-RU'
                        )}
                      </span>
                      <img
                        src="/src/images/icon-ruble.svg"
                        alt=""
                        className={styles.trainCard__tooltipCurrency}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {route.have_second_class && (
            <div className={styles.trainCard__seatType}>
              <span className={styles.trainCard__seatName}>Купе</span>
              <span
                className={styles.trainCard__seatCount}
                onClick={() => handleTooltipToggle('second')}
              >
                {route.available_seats_info.second}
              </span>
              <span className={styles.trainCard__seatLabel}>от</span>
              <span className={styles.trainCard__seatPrice}>
                {route.price_info.second.bottom_price.toLocaleString('ru-RU')}
              </span>
              <img
                src="/src/images/icon-ruble.svg"
                alt=""
                className={styles.trainCard__seatCurrency}
              />
              {openTooltip === 'second' && (
                <div className={styles.trainCard__tooltip}>
                  {route.price_info.second.top_seats !== undefined && (
                    <div className={styles.trainCard__tooltipRow}>
                      <span className={styles.trainCard__tooltipName}>
                        Верхние
                      </span>
                      <span className={styles.trainCard__tooltipCount}>
                        {route.price_info.second.top_seats}
                      </span>
                      <span className={styles.trainCard__tooltipPrice}>
                        {route.price_info.second.top_price?.toLocaleString(
                          'ru-RU'
                        )}
                      </span>
                      <img
                        src="/src/images/icon-ruble.svg"
                        alt=""
                        className={styles.trainCard__tooltipCurrency}
                      />
                    </div>
                  )}
                  {route.price_info.second.bottom_seats !== undefined && (
                    <div className={styles.trainCard__tooltipRow}>
                      <span className={styles.trainCard__tooltipName}>
                        Нижние
                      </span>
                      <span className={styles.trainCard__tooltipCount}>
                        {route.price_info.second.bottom_seats}
                      </span>
                      <span className={styles.trainCard__tooltipPrice}>
                        {route.price_info.second.bottom_price.toLocaleString(
                          'ru-RU'
                        )}
                      </span>
                      <img
                        src="/src/images/icon-ruble.svg"
                        alt=""
                        className={styles.trainCard__tooltipCurrency}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {route.have_first_class && (
            <div className={styles.trainCard__seatType}>
              <span className={styles.trainCard__seatName}>Люкс</span>
              <span
                className={styles.trainCard__seatCount}
                onClick={() => handleTooltipToggle('first')}
              >
                {route.available_seats_info.first}
              </span>
              <span className={styles.trainCard__seatLabel}>от</span>
              <span className={styles.trainCard__seatPrice}>
                {route.price_info.first.bottom_price.toLocaleString('ru-RU')}
              </span>
              <img
                src="/src/images/icon-ruble.svg"
                alt=""
                className={styles.trainCard__seatCurrency}
              />
              {openTooltip === 'first' && (
                <div className={styles.trainCard__tooltip}>
                  {route.price_info.first.bottom_seats !== undefined && (
                    <div className={styles.trainCard__tooltipRow}>
                      <span className={styles.trainCard__tooltipName}>
                        Нижние
                      </span>
                      <span className={styles.trainCard__tooltipCount}>
                        {route.price_info.first.bottom_seats}
                      </span>
                      <span className={styles.trainCard__tooltipPrice}>
                        {route.price_info.first.bottom_price.toLocaleString(
                          'ru-RU'
                        )}
                      </span>
                      <img
                        src="/src/images/icon-ruble.svg"
                        alt=""
                        className={styles.trainCard__tooltipCurrency}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className={styles.trainCard__icons}>
            {route.have_wifi && (
              <img
                src="/src/images/icon-wifi.svg"
                alt=""
                className={styles.trainCard__icon}
              />
            )}
            {route.is_express && (
              <img
                src="/src/images/icon-express.svg"
                alt=""
                className={styles.trainCard__icon}
              />
            )}
            {route.have_air_conditioning && (
              <img
                src="/src/images/icon-conditioner.svg"
                alt=""
                className={styles.trainCard__icon}
              />
            )}
            {route.have_food && (
              <img
                src="/src/images/icon-food.svg"
                alt=""
                className={styles.trainCard__icon}
              />
            )}
            {route.have_linens && (
              <img
                src="/src/images/icon-linens.svg"
                alt=""
                className={styles.trainCard__icon}
              />
            )}
          </div>

          <button type="button" className={styles.trainCard__change}>
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainCard;

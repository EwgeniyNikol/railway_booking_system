import { useState, useRef, useEffect } from 'react';
import styles from './TicketCard.module.scss';

type City = {
  _id: string;
  name: string;
};

type Station = {
  railway_station_name: string;
  city: City;
  datetime: number;
};

type PriceInfo = {
  top_price?: number;
  bottom_price?: number;
  side_price?: number;
  price?: number;
  top_seats?: number;
  bottom_seats?: number;
  side_seats?: number;
};

type Departure = {
  _id: string;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  have_food?: boolean;
  have_linens?: boolean;
  min_price: number;
  duration: number;
  available_seats: number;
  available_seats_info: {
    first?: number;
    second?: number;
    third?: number;
    fourth?: number;
  };
  train: {
    _id: string;
    name: string;
  };
  from: Station;
  to: Station;
  price_info: {
    first?: PriceInfo;
    second?: PriceInfo;
    third?: PriceInfo;
    fourth?: PriceInfo;
  };
};

type TicketCardProps = {
  departureRoute: Departure;
  returnRoute?: Departure;
};

const capitalizeCity = (name: string) =>
  name
    .split(/[-\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(name.includes('-') ? '-' : ' ');

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours} : ${String(minutes).padStart(2, '0')}`;
};

const TicketCard = ({ departureRoute, returnRoute }: TicketCardProps) => {
  const trainNumber = departureRoute.train.name.split(' - ')[1] || '';
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
    <div className={styles.ticketCard} ref={cardRef}>
      <div className={styles.ticketCard__left}>
        <img
          src="/src/images/icon-train.svg"
          alt=""
          className={styles.ticketCard__trainIcon}
        />
        <div className={styles.ticketCard__trainNumber}>{trainNumber}</div>
        <div className={styles.ticketCard__route}>
          {capitalizeCity(departureRoute.from.city.name)} →{' '}
          {capitalizeCity(departureRoute.to.city.name)}
        </div>
      </div>

      <div className={styles.ticketCard__center}>
        <div className={styles.ticketCard__row}>
          <div className={styles.ticketCard__timeBlock}>
            <div className={styles.ticketCard__time}>
              {formatTime(departureRoute.from.datetime)}
            </div>
            <div className={styles.ticketCard__city}>
              {capitalizeCity(departureRoute.from.city.name)}
            </div>
            <div className={styles.ticketCard__station}>
              {departureRoute.from.railway_station_name} вокзал
            </div>
          </div>

          <div className={styles.ticketCard__arrowBlock}>
            <div className={styles.ticketCard__duration}>
              {formatDuration(departureRoute.duration)}
            </div>
            <img
              src="/src/images/arrow-right.svg"
              alt=""
              className={styles.ticketCard__arrow}
            />
          </div>

          <div className={styles.ticketCard__timeBlock}>
            <div className={styles.ticketCard__time}>
              {formatTime(departureRoute.to.datetime)}
            </div>
            <div className={styles.ticketCard__city}>
              {capitalizeCity(departureRoute.to.city.name)}
            </div>
            <div className={styles.ticketCard__station}>
              {departureRoute.to.railway_station_name} вокзал
            </div>
          </div>
        </div>

        {returnRoute && (
          <div className={styles.ticketCard__row}>
            <div className={styles.ticketCard__timeBlock}>
              <div className={styles.ticketCard__time}>
                {formatTime(returnRoute.from.datetime)}
              </div>
              <div className={styles.ticketCard__city}>
                {capitalizeCity(returnRoute.from.city.name)}
              </div>
              <div className={styles.ticketCard__station}>
                {returnRoute.from.railway_station_name} вокзал
              </div>
            </div>

            <div className={styles.ticketCard__arrowBlock}>
              <div className={styles.ticketCard__duration}>
                {formatDuration(returnRoute.duration)}
              </div>
              <img
                src="/src/images/arrow-left.svg"
                alt=""
                className={styles.ticketCard__arrow}
              />
            </div>

            <div className={styles.ticketCard__timeBlock}>
              <div className={styles.ticketCard__time}>
                {formatTime(returnRoute.to.datetime)}
              </div>
              <div className={styles.ticketCard__city}>
                {capitalizeCity(returnRoute.to.city.name)}
              </div>
              <div className={styles.ticketCard__station}>
                {returnRoute.to.railway_station_name} вокзал
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.ticketCard__right}>
        {departureRoute.have_fourth_class && (
          <div className={styles.ticketCard__seatType}>
            <span className={styles.ticketCard__seatName}>Сидячий</span>
            <span
              className={styles.ticketCard__seatCount}
              onClick={() => handleTooltipToggle('fourth')}
            >
              {departureRoute.available_seats_info.fourth}
            </span>
            <span className={styles.ticketCard__seatLabel}>от</span>
            <span className={styles.ticketCard__seatPrice}>
              {departureRoute.price_info.fourth?.bottom_price?.toLocaleString(
                'ru-RU'
              )}
            </span>
            <img
              src="/src/images/icon-ruble.svg"
              alt=""
              className={styles.ticketCard__seatCurrency}
            />
            {openTooltip === 'fourth' && (
              <div className={styles.ticketCard__tooltip}>
                {departureRoute.price_info.fourth?.top_seats !== undefined && (
                  <div className={styles.ticketCard__tooltipRow}>
                    <span className={styles.ticketCard__tooltipName}>
                      верхние
                    </span>
                    <span className={styles.ticketCard__tooltipCount}>
                      {departureRoute.price_info.fourth.top_seats}
                    </span>
                    <span className={styles.ticketCard__tooltipPrice}>
                      {departureRoute.price_info.fourth.top_price?.toLocaleString(
                        'ru-RU'
                      )}
                    </span>
                    <img
                      src="/src/images/icon-ruble.svg"
                      alt=""
                      className={styles.ticketCard__tooltipCurrency}
                    />
                  </div>
                )}
                {departureRoute.price_info.fourth?.bottom_seats !==
                  undefined && (
                  <div className={styles.ticketCard__tooltipRow}>
                    <span className={styles.ticketCard__tooltipName}>
                      нижние
                    </span>
                    <span className={styles.ticketCard__tooltipCount}>
                      {departureRoute.price_info.fourth.bottom_seats}
                    </span>
                    <span className={styles.ticketCard__tooltipPrice}>
                      {departureRoute.price_info.fourth.bottom_price?.toLocaleString(
                        'ru-RU'
                      )}
                    </span>
                    <img
                      src="/src/images/icon-ruble.svg"
                      alt=""
                      className={styles.ticketCard__tooltipCurrency}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {departureRoute.have_third_class && (
          <div className={styles.ticketCard__seatType}>
            <span className={styles.ticketCard__seatName}>Плацкарт</span>
            <span
              className={styles.ticketCard__seatCount}
              onClick={() => handleTooltipToggle('third')}
            >
              {departureRoute.available_seats_info.third}
            </span>
            <span className={styles.ticketCard__seatLabel}>от</span>
            <span className={styles.ticketCard__seatPrice}>
              {departureRoute.price_info.third?.bottom_price?.toLocaleString(
                'ru-RU'
              )}
            </span>
            <img
              src="/src/images/icon-ruble.svg"
              alt=""
              className={styles.ticketCard__seatCurrency}
            />
            {openTooltip === 'third' && (
              <div className={styles.ticketCard__tooltip}>
                {departureRoute.price_info.third?.top_seats !== undefined && (
                  <div className={styles.ticketCard__tooltipRow}>
                    <span className={styles.ticketCard__tooltipName}>
                      верхние
                    </span>
                    <span className={styles.ticketCard__tooltipCount}>
                      {departureRoute.price_info.third.top_seats}
                    </span>
                    <span className={styles.ticketCard__tooltipPrice}>
                      {departureRoute.price_info.third.top_price?.toLocaleString(
                        'ru-RU'
                      )}
                    </span>
                    <img
                      src="/src/images/icon-ruble.svg"
                      alt=""
                      className={styles.ticketCard__tooltipCurrency}
                    />
                  </div>
                )}
                {departureRoute.price_info.third?.bottom_seats !==
                  undefined && (
                  <div className={styles.ticketCard__tooltipRow}>
                    <span className={styles.ticketCard__tooltipName}>
                      нижние
                    </span>
                    <span className={styles.ticketCard__tooltipCount}>
                      {departureRoute.price_info.third.bottom_seats}
                    </span>
                    <span className={styles.ticketCard__tooltipPrice}>
                      {departureRoute.price_info.third.bottom_price?.toLocaleString(
                        'ru-RU'
                      )}
                    </span>
                    <img
                      src="/src/images/icon-ruble.svg"
                      alt=""
                      className={styles.ticketCard__tooltipCurrency}
                    />
                  </div>
                )}
                {departureRoute.price_info.third?.side_seats !== undefined && (
                  <div className={styles.ticketCard__tooltipRow}>
                    <span className={styles.ticketCard__tooltipName}>
                      боковые
                    </span>
                    <span className={styles.ticketCard__tooltipCount}>
                      {departureRoute.price_info.third.side_seats}
                    </span>
                    <span className={styles.ticketCard__tooltipPrice}>
                      {departureRoute.price_info.third.side_price?.toLocaleString(
                        'ru-RU'
                      )}
                    </span>
                    <img
                      src="/src/images/icon-ruble.svg"
                      alt=""
                      className={styles.ticketCard__tooltipCurrency}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {departureRoute.have_second_class && (
          <div className={styles.ticketCard__seatType}>
            <span className={styles.ticketCard__seatName}>Купе</span>
            <span
              className={styles.ticketCard__seatCount}
              onClick={() => handleTooltipToggle('second')}
            >
              {departureRoute.available_seats_info.second}
            </span>
            <span className={styles.ticketCard__seatLabel}>от</span>
            <span className={styles.ticketCard__seatPrice}>
              {departureRoute.price_info.second?.bottom_price?.toLocaleString(
                'ru-RU'
              )}
            </span>
            <img
              src="/src/images/icon-ruble.svg"
              alt=""
              className={styles.ticketCard__seatCurrency}
            />
            {openTooltip === 'second' && (
              <div className={styles.ticketCard__tooltip}>
                {departureRoute.price_info.second?.top_seats !== undefined && (
                  <div className={styles.ticketCard__tooltipRow}>
                    <span className={styles.ticketCard__tooltipName}>
                      верхние
                    </span>
                    <span className={styles.ticketCard__tooltipCount}>
                      {departureRoute.price_info.second.top_seats}
                    </span>
                    <span className={styles.ticketCard__tooltipPrice}>
                      {departureRoute.price_info.second.top_price?.toLocaleString(
                        'ru-RU'
                      )}
                    </span>
                    <img
                      src="/src/images/icon-ruble.svg"
                      alt=""
                      className={styles.ticketCard__tooltipCurrency}
                    />
                  </div>
                )}
                {departureRoute.price_info.second?.bottom_seats !==
                  undefined && (
                  <div className={styles.ticketCard__tooltipRow}>
                    <span className={styles.ticketCard__tooltipName}>
                      нижние
                    </span>
                    <span className={styles.ticketCard__tooltipCount}>
                      {departureRoute.price_info.second.bottom_seats}
                    </span>
                    <span className={styles.ticketCard__tooltipPrice}>
                      {departureRoute.price_info.second.bottom_price?.toLocaleString(
                        'ru-RU'
                      )}
                    </span>
                    <img
                      src="/src/images/icon-ruble.svg"
                      alt=""
                      className={styles.ticketCard__tooltipCurrency}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {departureRoute.have_first_class && (
          <div className={styles.ticketCard__seatType}>
            <span className={styles.ticketCard__seatName}>Люкс</span>
            <span
              className={styles.ticketCard__seatCount}
              onClick={() => handleTooltipToggle('first')}
            >
              {departureRoute.available_seats_info.first}
            </span>
            <span className={styles.ticketCard__seatLabel}>от</span>
            <span className={styles.ticketCard__seatPrice}>
              {departureRoute.price_info.first?.bottom_price?.toLocaleString(
                'ru-RU'
              )}
            </span>
            <img
              src="/src/images/icon-ruble.svg"
              alt=""
              className={styles.ticketCard__seatCurrency}
            />
            {openTooltip === 'first' && (
              <div className={styles.ticketCard__tooltip}>
                {departureRoute.price_info.first?.top_seats !== undefined && (
                  <div className={styles.ticketCard__tooltipRow}>
                    <span className={styles.ticketCard__tooltipName}>
                      верхние
                    </span>
                    <span className={styles.ticketCard__tooltipCount}>
                      {departureRoute.price_info.first.top_seats}
                    </span>
                    <span className={styles.ticketCard__tooltipPrice}>
                      {departureRoute.price_info.first.top_price?.toLocaleString(
                        'ru-RU'
                      )}
                    </span>
                    <img
                      src="/src/images/icon-ruble.svg"
                      alt=""
                      className={styles.ticketCard__tooltipCurrency}
                    />
                  </div>
                )}
                {departureRoute.price_info.first?.bottom_seats !==
                  undefined && (
                  <div className={styles.ticketCard__tooltipRow}>
                    <span className={styles.ticketCard__tooltipName}>
                      нижние
                    </span>
                    <span className={styles.ticketCard__tooltipCount}>
                      {departureRoute.price_info.first.bottom_seats}
                    </span>
                    <span className={styles.ticketCard__tooltipPrice}>
                      {departureRoute.price_info.first.bottom_price?.toLocaleString(
                        'ru-RU'
                      )}
                    </span>
                    <img
                      src="/src/images/icon-ruble.svg"
                      alt=""
                      className={styles.ticketCard__tooltipCurrency}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className={styles.ticketCard__icons}>
          {departureRoute.have_wifi && (
            <img
              src="/src/images/icon-wifi.svg"
              alt=""
              className={styles.ticketCard__icon}
            />
          )}
          {departureRoute.is_express && (
            <img
              src="/src/images/icon-express.svg"
              alt=""
              className={styles.ticketCard__icon}
            />
          )}
          {departureRoute.have_air_conditioning && (
            <img
              src="/src/images/icon-conditioner.svg"
              alt=""
              className={styles.ticketCard__icon}
            />
          )}
          {departureRoute.have_food && (
            <img
              src="/src/images/icon-food.svg"
              alt=""
              className={styles.ticketCard__icon}
            />
          )}
          {departureRoute.have_linens && (
            <img
              src="/src/images/icon-linens.svg"
              alt=""
              className={styles.ticketCard__icon}
            />
          )}
        </div>

        <button type="button" className={styles.ticketCard__button}>
          Выбрать места
        </button>
      </div>
    </div>
  );
};

export default TicketCard;

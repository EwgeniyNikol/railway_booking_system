import { useState, useEffect } from 'react';
import { fetchLastRoutes } from '../../api';
import styles from './LastTickets.module.scss';

type City = {
  _id: string;
  name: string;
};

type Station = {
  railway_station_name: string;
  city: City;
  datetime: number;
};

type Departure = {
  _id: string;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  from: Station;
  to: Station;
};

type LastRoute = {
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  departure: Departure;
};

const capitalizeCity = (name: string) =>
  name
    .split(/[-\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(name.includes('-') ? '-' : ' ');

const LastTickets = () => {
  const [routes, setRoutes] = useState<LastRoute[]>([]);

  useEffect(() => {
    fetchLastRoutes()
      .then((data: LastRoute[]) => setRoutes(data.slice(0, 3)))
      .catch(() => setRoutes([]));
  }, []);

  return (
    <div className={styles.lastTickets}>
      <h2 className={styles.lastTickets__title}>Последние билеты</h2>
      <div className={styles.lastTickets__list}>
        {routes.map((route) => (
          <div key={route.departure._id} className={styles.lastTickets__card}>
            <div className={styles.lastTickets__cities}>
              <span className={styles.lastTickets__city}>
                {capitalizeCity(route.departure.from.city.name)}
              </span>
              <span className={styles.lastTickets__city}>
                {capitalizeCity(route.departure.to.city.name)}
              </span>
            </div>
            <div className={styles.lastTickets__stations}>
              <span className={styles.lastTickets__station}>
                {route.departure.from.railway_station_name} вокзал
              </span>
              <span className={styles.lastTickets__station}>
                {route.departure.to.railway_station_name} вокзал
              </span>
            </div>
            <div className={styles.lastTickets__bottom}>
              <div className={styles.lastTickets__icons}>
                {route.departure.have_air_conditioning && (
                  <img
                    src="/src/images/icon-conditioner.svg"
                    alt=""
                    className={styles.lastTickets__icon}
                  />
                )}
                {route.departure.have_wifi && (
                  <img
                    src="/src/images/icon-wifi.svg"
                    alt=""
                    className={styles.lastTickets__icon}
                  />
                )}
                {route.departure.is_express && (
                  <img
                    src="/src/images/icon-express.svg"
                    alt=""
                    className={styles.lastTickets__icon}
                  />
                )}
              </div>
              <div className={styles.lastTickets__price}>
                <span className={styles.lastTickets__priceLabel}>от</span>
                <span className={styles.lastTickets__priceValue}>
                  {route.min_price.toLocaleString('ru-RU')}
                </span>
                <span className={styles.lastTickets__priceCurrency}>₽</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastTickets;

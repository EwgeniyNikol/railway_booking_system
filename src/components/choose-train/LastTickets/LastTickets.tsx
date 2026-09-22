import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLastRoutes } from '../../../store/slices/searchSlice';
import type { RootState, AppDispatch } from '../../../store/store';
import type { RouteItem } from '../../../types/api';
import styles from './LastTickets.module.scss';

const capitalizeCity = (name: string) =>
  name
    .split(/[-\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(name.includes('-') ? '-' : ' ');

const LastTickets = () => {
  const dispatch = useDispatch<AppDispatch>();
  const lastRoutes = useSelector(
    (state: RootState) => state.search.lastRoutes
  ) as RouteItem[];

  useEffect(() => {
    dispatch(getLastRoutes());
  }, [dispatch]);

  const routes = lastRoutes.slice(0, 3);

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
                    src={`${import.meta.env.BASE_URL}images/icon-conditioner.svg`}
                    alt=""
                    className={styles.lastTickets__icon}
                  />
                )}
                {route.departure.have_wifi && (
                  <img
                    src={`${import.meta.env.BASE_URL}images/icon-wifi.svg`}
                    alt=""
                    className={styles.lastTickets__icon}
                  />
                )}
                {route.departure.is_express && (
                  <img
                    src={`${import.meta.env.BASE_URL}images/icon-express.svg`}
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

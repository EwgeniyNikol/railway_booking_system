import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { selectTotalPrice } from '../../../store/selectors/totalPrice';
import styles from './TripDetails.module.scss';

const capitalizeCity = (name: string) =>
  name
    .split(/[-\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(name.includes('-') ? '-' : ' ');

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

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

const formatPrice = (value: number): string => {
  return value.toLocaleString('ru-RU').replace(/,/g, ' ');
};

const TripDetails = () => {
  const [toExpanded, setToExpanded] = useState(true);
  const [backExpanded, setBackExpanded] = useState(true);
  const [passengersExpanded, setPassengersExpanded] = useState(true);

  const selectedRoute = useSelector(
    (state: RootState) => state.booking.selectedRoute
  );
  const selectedReturnRoute = useSelector(
    (state: RootState) => state.booking.selectedReturnRoute
  );
  const passengerCount = useSelector(
    (state: RootState) => state.booking.passengerCount
  );
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className={styles.tripDetails}>
      <h2 className={styles.tripDetails__title}>Детали поездки</h2>

      <div className={styles.tripDetails__divider} />

      {selectedRoute && (
        <>
          <div className={styles.tripDetails__block}>
            <button
              type="button"
              className={styles.tripDetails__header}
              onClick={() => setToExpanded(!toExpanded)}
            >
              <img
                src="/src/images/arrow-to.svg"
                alt=""
                className={styles.tripDetails__icon}
              />
              <span className={styles.tripDetails__blockTitle}>Туда</span>
              <img
                src={
                  toExpanded
                    ? '/src/images/icon-minus.svg'
                    : '/src/images/icon-plus.svg'
                }
                alt=""
                className={styles.tripDetails__toggle}
              />
            </button>

            {toExpanded && (
              <div className={styles.tripDetails__content}>
                <div className={styles.tripDetails__row}>
                  <span className={styles.tripDetails__label}>№ Поезда</span>
                  <span className={styles.tripDetails__value}>
                    {selectedRoute.train.name}
                  </span>
                </div>

                <div className={styles.tripDetails__row}>
                  <span className={styles.tripDetails__label}>Название</span>
                  <span className={styles.tripDetails__route}>
                    {capitalizeCity(selectedRoute.from.city.name)} <br />{' '}
                    {capitalizeCity(selectedRoute.to.city.name)}
                  </span>
                </div>

                <div className={styles.tripDetails__times}>
                  <span className={styles.tripDetails__time}>
                    {formatTime(selectedRoute.from.datetime)}
                  </span>
                  <div className={styles.tripDetails__arrowBlock}>
                    <span className={styles.tripDetails__duration}>
                      {formatDuration(
                        selectedRoute.from.datetime,
                        selectedRoute.to.datetime
                      )}
                    </span>
                    <img
                      src="/src/images/arrow-duration.svg"
                      alt=""
                      className={styles.tripDetails__arrow}
                    />
                  </div>
                  <span className={styles.tripDetails__time}>
                    {formatTime(selectedRoute.to.datetime)}
                  </span>
                </div>

                <div className={styles.tripDetails__dates}>
                  <span className={styles.tripDetails__date}>
                    {formatDate(selectedRoute.from.datetime)}
                  </span>
                  <span className={styles.tripDetails__date}>
                    {formatDate(selectedRoute.to.datetime)}
                  </span>
                </div>

                <div className={styles.tripDetails__stations}>
                  <div className={styles.tripDetails__station}>
                    <span className={styles.tripDetails__city}>
                      {capitalizeCity(selectedRoute.from.city.name)}
                    </span>
                    <span className={styles.tripDetails__railway}>
                      {selectedRoute.from.railway_station_name}
                    </span>
                  </div>
                  <div className={styles.tripDetails__station}>
                    <span className={styles.tripDetails__city}>
                      {capitalizeCity(selectedRoute.to.city.name)}
                    </span>
                    <span className={styles.tripDetails__railway}>
                      {selectedRoute.to.railway_station_name}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.tripDetails__divider} />
        </>
      )}

      {selectedReturnRoute && (
        <>
          <div className={styles.tripDetails__block}>
            <button
              type="button"
              className={styles.tripDetails__header}
              onClick={() => setBackExpanded(!backExpanded)}
            >
              <img
                src="/src/images/arrow-back.svg"
                alt=""
                className={styles.tripDetails__icon}
              />
              <span className={styles.tripDetails__blockTitle}>Обратно</span>
              <img
                src={
                  backExpanded
                    ? '/src/images/icon-minus.svg'
                    : '/src/images/icon-plus.svg'
                }
                alt=""
                className={styles.tripDetails__toggle}
              />
            </button>

            {backExpanded && (
              <div className={styles.tripDetails__content}>
                <div className={styles.tripDetails__row}>
                  <span className={styles.tripDetails__label}>№ Поезда</span>
                  <span className={styles.tripDetails__value}>
                    {selectedReturnRoute.train.name}
                  </span>
                </div>

                <div className={styles.tripDetails__row}>
                  <span className={styles.tripDetails__label}>Название</span>
                  <span className={styles.tripDetails__route}>
                    {capitalizeCity(selectedReturnRoute.from.city.name)} <br />{' '}
                    {capitalizeCity(selectedReturnRoute.to.city.name)}
                  </span>
                </div>

                <div className={styles.tripDetails__times}>
                  <span className={styles.tripDetails__time}>
                    {formatTime(selectedReturnRoute.from.datetime)}
                  </span>
                  <div className={styles.tripDetails__arrowBlock}>
                    <span className={styles.tripDetails__duration}>
                      {formatDuration(
                        selectedReturnRoute.from.datetime,
                        selectedReturnRoute.to.datetime
                      )}
                    </span>
                    <img
                      src="/src/images/arrow-duration-left.svg"
                      alt=""
                      className={styles.tripDetails__arrow}
                    />
                  </div>
                  <span className={styles.tripDetails__time}>
                    {formatTime(selectedReturnRoute.to.datetime)}
                  </span>
                </div>

                <div className={styles.tripDetails__dates}>
                  <span className={styles.tripDetails__date}>
                    {formatDate(selectedReturnRoute.from.datetime)}
                  </span>
                  <span className={styles.tripDetails__date}>
                    {formatDate(selectedReturnRoute.to.datetime)}
                  </span>
                </div>

                <div className={styles.tripDetails__stations}>
                  <div className={styles.tripDetails__station}>
                    <span className={styles.tripDetails__city}>
                      {capitalizeCity(selectedReturnRoute.from.city.name)}
                    </span>
                    <span className={styles.tripDetails__railway}>
                      {selectedReturnRoute.from.railway_station_name}
                    </span>
                  </div>
                  <div className={styles.tripDetails__station}>
                    <span className={styles.tripDetails__city}>
                      {capitalizeCity(selectedReturnRoute.to.city.name)}
                    </span>
                    <span className={styles.tripDetails__railway}>
                      {selectedReturnRoute.to.railway_station_name}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.tripDetails__divider} />
        </>
      )}

      <div className={styles.tripDetails__block}>
        <button
          type="button"
          className={styles.tripDetails__header}
          onClick={() => setPassengersExpanded(!passengersExpanded)}
        >
          <svg className={styles.tripDetails__icon} viewBox="0 0 26 26">
            <circle cx="13" cy="8" r="5" fill="#FFA800" />
            <path d="M2 24 C2 16 24 16 24 24" fill="#FFA800" />
          </svg>
          <span className={styles.tripDetails__blockTitle}>Пассажиры</span>
          <img
            src={
              passengersExpanded
                ? '/src/images/icon-minus.svg'
                : '/src/images/icon-plus.svg'
            }
            alt=""
            className={styles.tripDetails__toggle}
          />
        </button>

        {passengersExpanded && (
          <div className={styles.tripDetails__content}>
            {passengerCount.adults > 0 && (
              <div className={styles.tripDetails__row}>
                <span className={styles.tripDetails__label}>
                  {passengerCount.adults} Взрослых
                </span>
              </div>
            )}

            {passengerCount.children > 0 && (
              <div className={styles.tripDetails__row}>
                <span className={styles.tripDetails__label}>
                  {passengerCount.children} Ребенок
                </span>
              </div>
            )}

            {passengerCount.childrenWithoutSeat > 0 && (
              <div className={styles.tripDetails__row}>
                <span className={styles.tripDetails__label}>
                  {passengerCount.childrenWithoutSeat} Без места
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.tripDetails__divider} />

      <div className={styles.tripDetails__total}>
        <span className={styles.tripDetails__totalLabel}>Итог</span>
        <span className={styles.tripDetails__totalSum}>
          {formatPrice(totalPrice.placesTotal)}
        </span>
      </div>
    </div>
  );
};

export default TripDetails;

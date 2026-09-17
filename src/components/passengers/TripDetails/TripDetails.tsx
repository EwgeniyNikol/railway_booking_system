import { useState } from 'react';
import styles from './TripDetails.module.scss';

const TripDetails = () => {
  const [toExpanded, setToExpanded] = useState(true);
  const [backExpanded, setBackExpanded] = useState(true);
  const [passengersExpanded, setPassengersExpanded] = useState(true);

  const toRoute = {
    trainNumber: '116С',
    from: 'Адлер',
    to: 'Санкт-Петербург',
    departureTime: '00:10',
    arrivalTime: '09:52',
    duration: '9 : 42',
    departureDate: '30.08.2018',
    arrivalDate: '31.08.2018',
    fromCity: 'Москва',
    fromStation: 'Курский вокзал',
    toCity: 'Санкт-Петербург',
    toStation: 'Ладожский вокзал',
  };

  const backRoute = {
    trainNumber: '116С',
    from: 'Адлер',
    to: 'Санкт-Петербург',
    departureTime: '00:10',
    arrivalTime: '09:52',
    duration: '9 : 42',
    departureDate: '09.09.2018',
    arrivalDate: '08.09.2018',
    fromCity: 'Москва',
    fromStation: 'Курский вокзал',
    toCity: 'Санкт-Петербург',
    toStation: 'Ладожский вокзал',
  };

  const passengers = {
    adults: 2,
    adultsPrice: '5 840',
    children: 1,
    childrenPrice: '1 920',
  };

  const total = '7 760';

  return (
    <div className={styles.tripDetails}>
      <h2 className={styles.tripDetails__title}>Детали поездки</h2>

      <div className={styles.tripDetails__divider} />

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
                {toRoute.trainNumber}
              </span>
            </div>

            <div className={styles.tripDetails__row}>
              <span className={styles.tripDetails__label}>Название</span>
              <span className={styles.tripDetails__route}>
                {toRoute.from} <br /> {toRoute.to}
              </span>
            </div>

            <div className={styles.tripDetails__times}>
              <span className={styles.tripDetails__time}>
                {toRoute.departureTime}
              </span>
              <div className={styles.tripDetails__arrowBlock}>
                <span className={styles.tripDetails__duration}>
                  {toRoute.duration}
                </span>
                <img
                  src="/src/images/arrow-duration.svg"
                  alt=""
                  className={styles.tripDetails__arrow}
                />
              </div>
              <span className={styles.tripDetails__time}>
                {toRoute.arrivalTime}
              </span>
            </div>

            <div className={styles.tripDetails__dates}>
              <span className={styles.tripDetails__date}>
                {toRoute.departureDate}
              </span>
              <span className={styles.tripDetails__date}>
                {toRoute.arrivalDate}
              </span>
            </div>

            <div className={styles.tripDetails__stations}>
              <div className={styles.tripDetails__station}>
                <span className={styles.tripDetails__city}>
                  {toRoute.fromCity}
                </span>
                <span className={styles.tripDetails__railway}>
                  {toRoute.fromStation}
                </span>
              </div>
              <div className={styles.tripDetails__station}>
                <span className={styles.tripDetails__city}>
                  {toRoute.toCity}
                </span>
                <span className={styles.tripDetails__railway}>
                  {toRoute.toStation}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.tripDetails__divider} />

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
                {backRoute.trainNumber}
              </span>
            </div>

            <div className={styles.tripDetails__row}>
              <span className={styles.tripDetails__label}>Название</span>
              <span className={styles.tripDetails__route}>
                {backRoute.from} <br /> {backRoute.to}
              </span>
            </div>

            <div className={styles.tripDetails__times}>
              <span className={styles.tripDetails__time}>
                {backRoute.departureTime}
              </span>
              <div className={styles.tripDetails__arrowBlock}>
                <span className={styles.tripDetails__duration}>
                  {backRoute.duration}
                </span>
                <img
                  src="/src/images/arrow-duration-left.svg"
                  alt=""
                  className={styles.tripDetails__arrow}
                />
              </div>
              <span className={styles.tripDetails__time}>
                {backRoute.arrivalTime}
              </span>
            </div>

            <div className={styles.tripDetails__dates}>
              <span className={styles.tripDetails__date}>
                {backRoute.departureDate}
              </span>
              <span className={styles.tripDetails__date}>
                {backRoute.arrivalDate}
              </span>
            </div>

            <div className={styles.tripDetails__stations}>
              <div className={styles.tripDetails__station}>
                <span className={styles.tripDetails__city}>
                  {backRoute.fromCity}
                </span>
                <span className={styles.tripDetails__railway}>
                  {backRoute.fromStation}
                </span>
              </div>
              <div className={styles.tripDetails__station}>
                <span className={styles.tripDetails__city}>
                  {backRoute.toCity}
                </span>
                <span className={styles.tripDetails__railway}>
                  {backRoute.toStation}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.tripDetails__divider} />

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
            <div className={styles.tripDetails__row}>
              <span className={styles.tripDetails__label}>
                {passengers.adults} Взрослых
              </span>
              <span className={styles.tripDetails__value}>
                {passengers.adultsPrice}
              </span>
            </div>

            <div className={styles.tripDetails__row}>
              <span className={styles.tripDetails__label}>
                {passengers.children} Ребенок
              </span>
              <span className={styles.tripDetails__value}>
                {passengers.childrenPrice}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.tripDetails__divider} />

      <div className={styles.tripDetails__total}>
        <span className={styles.tripDetails__totalLabel}>Итог</span>
        <span className={styles.tripDetails__totalSum}>{total}</span>
      </div>
    </div>
  );
};

export default TripDetails;

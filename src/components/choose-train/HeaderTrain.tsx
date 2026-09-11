import { useState } from 'react';
import Calendar from '../common/Calendar';
import CityInput from '../common/CityInput';
import styles from './HeaderTrain.module.scss';

const HeaderTrain = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [calendarOpenDeparture, setCalendarOpenDeparture] = useState(false);
  const [calendarOpenArrival, setCalendarOpenArrival] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <div className={styles.header__logo}>Лого</div>
      </div>
      <nav className={styles.header__nav}>
        <a href="/#about" className={styles.header__link}>
          О нас
        </a>
        <a href="/#how-it-works" className={styles.header__link}>
          Как это работает
        </a>
        <a href="/#reviews" className={styles.header__link}>
          Отзывы
        </a>
        <a href="/#contacts" className={styles.header__link}>
          Контакты
        </a>
      </nav>
      <div className={styles.header__search}>
        <div className={styles.header__fields}>
          <div className={styles.header__column}>
            <div className={styles.header__label}>Направление</div>
            <div className={styles.header__row}>
              <CityInput
                value={fromCity}
                onChange={setFromCity}
                placeholder="Откуда"
                className={`${styles.header__input} ${styles.header__input_icon}`}
              />
              <img
                src="/src/images/ic-cached.svg"
                alt=""
                className={styles.header__swap}
              />
              <CityInput
                value={toCity}
                onChange={setToCity}
                placeholder="Куда"
                className={`${styles.header__input} ${styles.header__input_icon}`}
              />
            </div>
          </div>
          <div className={styles.header__column}>
            <div className={styles.header__label}>Дата</div>
            <div className={styles.header__row}>
              <div className={styles.header__inputWrapper}>
                <input
                  type="text"
                  value={departureDate}
                  placeholder="ДД/ММ/ГГ"
                  onChange={(e) => setDepartureDate(e.target.value)}
                  onFocus={() => setCalendarOpenDeparture(true)}
                  className={`${styles.header__input} ${styles.header__input_calendar}`}
                />
                {calendarOpenDeparture && (
                  <div className={styles.header__calendar}>
                    <Calendar
                      onSelect={(date) => {
                        setDepartureDate(date);
                        setCalendarOpenDeparture(false);
                      }}
                      onClose={() => setCalendarOpenDeparture(false)}
                    />
                  </div>
                )}
              </div>
              <div className={styles.header__inputWrapper}>
                <input
                  type="text"
                  value={arrivalDate}
                  placeholder="ДД/ММ/ГГ"
                  onChange={(e) => setArrivalDate(e.target.value)}
                  onFocus={() => setCalendarOpenArrival(true)}
                  className={`${styles.header__input} ${styles.header__input_calendar}`}
                />
                {calendarOpenArrival && (
                  <div className={styles.header__calendar}>
                    <Calendar
                      onSelect={(date) => {
                        setArrivalDate(date);
                        setCalendarOpenArrival(false);
                      }}
                      onClose={() => setCalendarOpenArrival(false)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <button type="button" className={styles.header__button}>
          найти билеты
        </button>
      </div>
    </header>
  );
};

export default HeaderTrain;

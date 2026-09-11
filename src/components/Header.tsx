import { useState } from 'react';
import Calendar from './Calendar';
import styles from './Header.module.scss';

const Header = () => {
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
        <a href="#about" className={styles.header__link}>
          О нас
        </a>
        <a href="#how-it-works" className={styles.header__link}>
          Как это работает
        </a>
        <a href="#reviews" className={styles.header__link}>
          Отзывы
        </a>
        <a href="#contacts" className={styles.header__link}>
          Контакты
        </a>
      </nav>
      <div className={styles.header__content}>
        <div className={styles.header__title_wrapper}>
          <h1 className={styles.header__title}>
            <span className={styles.header__title_thin}>Вся жизнь -</span>{' '}
            <span className={styles.header__title_bold}>путешествие!</span>
          </h1>
        </div>
        <div className={styles.header__search}>
          <div className={styles.header__label}>Направление</div>
          <div className={styles.header__row}>
            <input
              type="text"
              className={`${styles.header__input} ${styles.header__input_icon}`}
              placeholder="Откуда"
            />
            <img
              src="/src/images/ic-cached.svg"
              alt=""
              className={styles.header__swap}
            />
            <input
              type="text"
              className={`${styles.header__input} ${styles.header__input_icon}`}
              placeholder="Куда"
            />
          </div>
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
          <div className={styles.header__button_wrapper}>
            <button type="button" className={styles.header__button}>
              найти билеты
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Calendar from '../common/Calendar/Calendar';
import CityInput from '../common/CityInput/CityInput';
import {
  setParams,
  setCities,
  searchRoutes,
  getReturnRoutes,
} from '../../store/slices/searchSlice';
import { saveSearch, loadSearch } from '../../utils/searchStorage';
import {
  formatDate,
  formatDateOnBlur,
  normalizeCalendarDate,
} from '../../utils/format';
import { validateDate } from '../../utils/validation';
import type { AppDispatch } from '../../store/store';
import styles from './Header.module.scss';

type City = {
  _id: string;
  name: string;
};

const convertDate = (date: string): string | null => {
  if (!date) return null;
  const parts = date.split(/[./]/);
  if (parts.length !== 3) return null;
  const [day, month, year] = parts;
  const fullYear = year.length === 2 ? `20${year}` : year;
  return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const parseDate = (date: string): Date | null => {
  const iso = convertDate(date);
  if (!iso) return null;
  return new Date(iso);
};

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [stored] = useState(() => loadSearch());

  const [fromCity, setFromCity] = useState(stored?.fromCity?.name || '');
  const [toCity, setToCity] = useState(stored?.toCity?.name || '');
  const [fromCityId, setFromCityId] = useState<string | null>(
    stored?.fromCity?._id || null
  );
  const [toCityId, setToCityId] = useState<string | null>(
    stored?.toCity?._id || null
  );
  const [departureDate, setDepartureDate] = useState(stored?.dateStart || '');
  const [arrivalDate, setArrivalDate] = useState(stored?.dateEnd || '');
  const [calendarOpenDeparture, setCalendarOpenDeparture] = useState(false);
  const [calendarOpenArrival, setCalendarOpenArrival] = useState(false);
  const [errors, setErrors] = useState({
    from: false,
    to: false,
    date: false,
  });

  const handleFromSelect = (city: City) => {
    setFromCityId(city._id);
    setErrors((prev) => ({ ...prev, from: false }));
  };

  const handleToSelect = (city: City) => {
    setToCityId(city._id);
    setErrors((prev) => ({ ...prev, to: false }));
  };

  const handleSubmit = () => {
    const fromError = !fromCityId;
    const toError = !toCityId;

    let dateError = false;
    if (departureDate && !validateDate(departureDate)) {
      dateError = true;
    }
    if (arrivalDate && !validateDate(arrivalDate)) {
      dateError = true;
    }

    const depDate = parseDate(departureDate);
    const arrDate = parseDate(arrivalDate);
    if (depDate && arrDate && arrDate < depDate) {
      dateError = true;
    }

    setErrors({ from: fromError, to: toError, date: dateError });

    if (fromError || toError || dateError) {
      return;
    }

    saveSearch({
      fromCity: { _id: fromCityId!, name: fromCity },
      toCity: { _id: toCityId!, name: toCity },
      dateStart: departureDate,
      dateEnd: arrivalDate,
    });

    const params = {
      from_city_id: fromCityId,
      to_city_id: toCityId,
      date_start: convertDate(departureDate),
      date_end: convertDate(arrivalDate),
      have_first_class: false,
      have_second_class: false,
      have_third_class: false,
      have_fourth_class: false,
      have_wifi: false,
      have_air_conditioning: false,
      have_express: false,
      price_from: null,
      price_to: null,
      start_departure_hour_from: null,
      start_departure_hour_to: null,
      start_arrival_hour_from: null,
      start_arrival_hour_to: null,
      end_departure_hour_from: null,
      end_departure_hour_to: null,
      end_arrival_hour_from: null,
      end_arrival_hour_to: null,
      limit: 5,
      offset: 0,
      sort: null,
    };

    dispatch(setParams(params));
    dispatch(
      setCities({
        from_city: { _id: fromCityId!, name: fromCity },
        to_city: { _id: toCityId!, name: toCity },
      })
    );
    dispatch(searchRoutes(params));

    if (arrivalDate) {
      const returnParams = {
        ...params,
        from_city_id: toCityId,
        to_city_id: fromCityId,
        date_start: convertDate(arrivalDate),
        date_end: null,
      };
      dispatch(getReturnRoutes(returnParams));
    }

    navigate('/choose-train');
  };

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
            <CityInput
              value={fromCity}
              onChange={setFromCity}
              onSelect={handleFromSelect}
              placeholder="Откуда"
              className={`${styles.header__input} ${styles.header__input_icon} ${
                errors.from ? styles.header__input_error : ''
              }`}
            />
            <img
              src={`${import.meta.env.BASE_URL}images/ic-cached.svg`}
              alt=""
              className={styles.header__swap}
            />
            <CityInput
              value={toCity}
              onChange={setToCity}
              onSelect={handleToSelect}
              placeholder="Куда"
              className={`${styles.header__input} ${styles.header__input_icon} ${
                errors.to ? styles.header__input_error : ''
              }`}
            />
          </div>
          <div className={styles.header__label}>Дата</div>
          <div className={styles.header__row}>
            <div className={styles.header__inputWrapper}>
              <input
                type="text"
                value={departureDate}
                placeholder="ДД/ММ/ГГГГ"
                onChange={(e) => setDepartureDate(formatDate(e.target.value))}
                onBlur={() => setDepartureDate(formatDateOnBlur(departureDate))}
                onFocus={() => setCalendarOpenDeparture(true)}
                className={`${styles.header__input} ${styles.header__input_calendar}`}
              />
              {calendarOpenDeparture && (
                <div className={styles.header__calendar}>
                  <Calendar
                    onSelect={(date) => {
                      setDepartureDate(normalizeCalendarDate(date));
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
                placeholder="ДД/ММ/ГГГГ"
                onChange={(e) => setArrivalDate(formatDate(e.target.value))}
                onBlur={() => setArrivalDate(formatDateOnBlur(arrivalDate))}
                onFocus={() => setCalendarOpenArrival(true)}
                className={`${styles.header__input} ${styles.header__input_calendar} ${
                  errors.date ? styles.header__input_error : ''
                }`}
              />
              {calendarOpenArrival && (
                <div className={styles.header__calendar}>
                  <Calendar
                    onSelect={(date) => {
                      setArrivalDate(normalizeCalendarDate(date));
                      setCalendarOpenArrival(false);
                    }}
                    onClose={() => setCalendarOpenArrival(false)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.header__button_wrapper}>
            <button
              type="button"
              className={styles.header__button}
              onClick={handleSubmit}
            >
              найти билеты
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

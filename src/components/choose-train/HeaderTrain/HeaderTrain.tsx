import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from '../../common/Calendar/Calendar';
import CityInput from '../../common/CityInput/CityInput';
import LoadingBar from '../../common/LoadingBar/LoadingBar';
import {
  setParams,
  setCities,
  searchRoutes,
  getReturnRoutes,
} from '../../../store/slices/searchSlice';
import { resetBooking } from '../../../store/slices/bookingSlice';
import { clearOrder } from '../../../utils/orderStorage';
import type { RootState, AppDispatch } from '../../../store/store';
import styles from './HeaderTrain.module.scss';

type City = {
  _id: string;
  name: string;
};

type HeaderTrainProps = {
  isLoading?: boolean;
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

const isoToDisplay = (iso: string | null): string => {
  if (!iso) return '';
  const [year, month, day] = iso.split('-');
  return `${day}.${month}.${year}`;
};

const HeaderTrain = ({ isLoading = false }: HeaderTrainProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const savedFromCity = useSelector(
    (state: RootState) => state.search.from_city
  );
  const savedToCity = useSelector((state: RootState) => state.search.to_city);
  const savedParams = useSelector((state: RootState) => state.search.params);

  const [fromCity, setFromCity] = useState(savedFromCity?.name || '');
  const [toCity, setToCity] = useState(savedToCity?.name || '');
  const [fromCityId, setFromCityId] = useState<string | null>(
    savedFromCity?._id || null
  );
  const [toCityId, setToCityId] = useState<string | null>(
    savedToCity?._id || null
  );
  const [departureDate, setDepartureDate] = useState(
    isoToDisplay(savedParams.date_start)
  );
  const [arrivalDate, setArrivalDate] = useState(
    isoToDisplay(savedParams.date_end)
  );
  const [calendarOpenDeparture, setCalendarOpenDeparture] = useState(false);
  const [calendarOpenArrival, setCalendarOpenArrival] = useState(false);

  const handleFromSelect = (city: City) => {
    setFromCityId(city._id);
  };

  const handleToSelect = (city: City) => {
    setToCityId(city._id);
  };

  const handleSubmit = () => {
    if (!fromCityId || !toCityId) return;

    const depDate = parseDate(departureDate);
    const arrDate = parseDate(arrivalDate);
    if (depDate && arrDate && arrDate < depDate) return;

    clearOrder();
    dispatch(resetBooking());

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
        from_city: { _id: fromCityId, name: fromCity },
        to_city: { _id: toCityId, name: toCity },
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
  };

  return (
    <>
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
                  onSelect={handleFromSelect}
                  placeholder="Откуда"
                  className={`${styles.header__input} ${styles.header__input_icon}`}
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
          <button
            type="button"
            className={styles.header__button}
            onClick={handleSubmit}
          >
            найти билеты
          </button>
        </div>
      </header>
      <LoadingBar isLoading={isLoading} />
    </>
  );
};

export default HeaderTrain;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from '../../common/Calendar/Calendar';
import { setParams } from '../../../store/slices/searchSlice';
import type { RootState, AppDispatch } from '../../../store/store';
import styles from './Sidebar.module.scss';

const convertDate = (date: string): string | null => {
  if (!date) return null;
  const parts = date.split(/[./]/);
  if (parts.length !== 3) return null;
  const [day, month, year] = parts;
  const fullYear = year.length === 2 ? `20${year}` : year;
  return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const isoToDisplay = (iso: string | null): string => {
  if (!iso) return '';
  const [year, month, day] = iso.split('-');
  return `${day}.${month}.${year}`;
};

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useSelector((state: RootState) => state.search.params);

  const [departureDate, setDepartureDate] = useState(
    isoToDisplay(params.date_start)
  );
  const [arrivalDate, setArrivalDate] = useState(isoToDisplay(params.date_end));
  const [coupe, setCoupe] = useState(params.have_second_class);
  const [platzkart, setPlatzkart] = useState(params.have_third_class);
  const [sitting, setSitting] = useState(params.have_fourth_class);
  const [lux, setLux] = useState(params.have_first_class);
  const [wifi, setWifi] = useState(params.have_wifi);
  const [express, setExpress] = useState(params.have_express);
  const [toExpanded, setToExpanded] = useState(false);
  const [backExpanded, setBackExpanded] = useState(false);
  const [priceFrom, setPriceFrom] = useState(params.price_from ?? 1920);
  const [priceTo, setPriceTo] = useState(params.price_to ?? 7000);
  const [toDepartureFrom, setToDepartureFrom] = useState(
    params.start_departure_hour_from ?? 0
  );
  const [toDepartureTo, setToDepartureTo] = useState(
    params.start_departure_hour_to ?? 11
  );
  const [toArrivalFrom, setToArrivalFrom] = useState(
    params.start_arrival_hour_from ?? 5
  );
  const [toArrivalTo, setToArrivalTo] = useState(
    params.start_arrival_hour_to ?? 11
  );
  const [backDepartureFrom, setBackDepartureFrom] = useState(
    params.end_departure_hour_from ?? 0
  );
  const [backDepartureTo, setBackDepartureTo] = useState(
    params.end_departure_hour_to ?? 11
  );
  const [backArrivalFrom, setBackArrivalFrom] = useState(
    params.end_arrival_hour_from ?? 5
  );
  const [backArrivalTo, setBackArrivalTo] = useState(
    params.end_arrival_hour_to ?? 11
  );
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarOpenArrival, setCalendarOpenArrival] = useState(false);

  const handleCoupe = () => {
    const value = !coupe;
    setCoupe(value);
    dispatch(setParams({ have_second_class: value }));
  };

  const handlePlatzkart = () => {
    const value = !platzkart;
    setPlatzkart(value);
    dispatch(setParams({ have_third_class: value }));
  };

  const handleSitting = () => {
    const value = !sitting;
    setSitting(value);
    dispatch(setParams({ have_fourth_class: value }));
  };

  const handleLux = () => {
    const value = !lux;
    setLux(value);
    dispatch(setParams({ have_first_class: value }));
  };

  const handleWifi = () => {
    const value = !wifi;
    setWifi(value);
    dispatch(setParams({ have_wifi: value }));
  };

  const handleExpress = () => {
    const value = !express;
    setExpress(value);
    dispatch(setParams({ have_express: value }));
  };

  const handlePriceFrom = (value: number) => {
    const clamped = Math.min(value, priceTo - 100);
    setPriceFrom(clamped);
    dispatch(setParams({ price_from: clamped }));
  };

  const handlePriceTo = (value: number) => {
    const clamped = Math.max(value, priceFrom + 100);
    setPriceTo(clamped);
    dispatch(setParams({ price_to: clamped }));
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__section}>
        <h3 className={styles.sidebar__title}>Дата поездки</h3>
        <div className={styles.sidebar__inputWrapper}>
          <div className={styles.sidebar__input}>
            <input
              type="text"
              value={departureDate}
              placeholder="Дата"
              onChange={(e) => setDepartureDate(e.target.value)}
              onFocus={() => setCalendarOpen(true)}
              className={styles.sidebar__inputField}
            />
            <img
              src={`${import.meta.env.BASE_URL}images/calendar.svg`}
              alt=""
              className={styles.sidebar__inputIcon}
            />
          </div>
          {calendarOpen && (
            <div className={styles.sidebar__calendar}>
              <Calendar
                onSelect={(date) => {
                  setDepartureDate(date);
                  dispatch(setParams({ date_start: convertDate(date) }));
                  setCalendarOpen(false);
                }}
                onClose={() => setCalendarOpen(false)}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.sidebar__section}>
        <h3 className={styles.sidebar__title}>Дата возвращения</h3>
        <div className={styles.sidebar__inputWrapper}>
          <div className={styles.sidebar__input}>
            <input
              type="text"
              value={arrivalDate}
              placeholder="Дата"
              onChange={(e) => setArrivalDate(e.target.value)}
              onFocus={() => setCalendarOpenArrival(true)}
              className={styles.sidebar__inputField}
            />
            <img
              src={`${import.meta.env.BASE_URL}images/calendar.svg`}
              alt=""
              className={styles.sidebar__inputIcon}
            />
          </div>
          {calendarOpenArrival && (
            <div className={styles.sidebar__calendar}>
              <Calendar
                onSelect={(date) => {
                  setArrivalDate(date);
                  dispatch(setParams({ date_end: convertDate(date) }));
                  setCalendarOpenArrival(false);
                }}
                onClose={() => setCalendarOpenArrival(false)}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.sidebar__divider} />

      <div className={styles.sidebar__section}>
        <div className={styles.sidebar__option}>
          <img
            src={`${import.meta.env.BASE_URL}images/icon-coupe.svg`}
            alt=""
            className={styles.sidebar__optionIcon}
          />
          <span className={styles.sidebar__optionLabel}>Купе</span>
          <button
            type="button"
            className={`${styles.sidebar__switch} ${coupe ? styles.sidebar__switch_active : ''}`}
            onClick={handleCoupe}
          >
            <span className={styles.sidebar__switchKnob} />
          </button>
        </div>

        <div className={styles.sidebar__option}>
          <img
            src={`${import.meta.env.BASE_URL}images/icon-platzkart.svg`}
            alt=""
            className={styles.sidebar__optionIcon}
          />
          <span className={styles.sidebar__optionLabel}>Плацкарт</span>
          <button
            type="button"
            className={`${styles.sidebar__switch} ${platzkart ? styles.sidebar__switch_active : ''}`}
            onClick={handlePlatzkart}
          >
            <span className={styles.sidebar__switchKnob} />
          </button>
        </div>

        <div className={styles.sidebar__option}>
          <img
            src={`${import.meta.env.BASE_URL}images/icon-sitting.svg`}
            alt=""
            className={styles.sidebar__optionIcon}
          />
          <span className={styles.sidebar__optionLabel}>Сидячий</span>
          <button
            type="button"
            className={`${styles.sidebar__switch} ${sitting ? styles.sidebar__switch_active : ''}`}
            onClick={handleSitting}
          >
            <span className={styles.sidebar__switchKnob} />
          </button>
        </div>

        <div className={styles.sidebar__option}>
          <img
            src={`${import.meta.env.BASE_URL}images/icon-lux.svg`}
            alt=""
            className={styles.sidebar__optionIcon}
          />
          <span className={styles.sidebar__optionLabel}>Люкс</span>
          <button
            type="button"
            className={`${styles.sidebar__switch} ${lux ? styles.sidebar__switch_active : ''}`}
            onClick={handleLux}
          >
            <span className={styles.sidebar__switchKnob} />
          </button>
        </div>

        <div className={styles.sidebar__option}>
          <img
            src={`${import.meta.env.BASE_URL}images/icon-wifi.svg`}
            alt=""
            className={styles.sidebar__optionIcon}
          />
          <span className={styles.sidebar__optionLabel}>Wi-Fi</span>
          <button
            type="button"
            className={`${styles.sidebar__switch} ${wifi ? styles.sidebar__switch_active : ''}`}
            onClick={handleWifi}
          >
            <span className={styles.sidebar__switchKnob} />
          </button>
        </div>

        <div className={styles.sidebar__option}>
          <img
            src={`${import.meta.env.BASE_URL}images/icon-express.svg`}
            alt=""
            className={styles.sidebar__optionIcon}
          />
          <span className={styles.sidebar__optionLabel}>Экспресс</span>
          <button
            type="button"
            className={`${styles.sidebar__switch} ${express ? styles.sidebar__switch_active : ''}`}
            onClick={handleExpress}
          >
            <span className={styles.sidebar__switchKnob} />
          </button>
        </div>
      </div>

      <div className={styles.sidebar__divider} />

      <div className={styles.sidebar__section}>
        <h3 className={styles.sidebar__title}>Стоимость</h3>
        <div className={styles.sidebar__slider}>
          <div className={styles.sidebar__sliderTrack} />
          <div
            className={styles.sidebar__sliderFill}
            style={{
              left: `${((priceFrom - 1920) / (7000 - 1920)) * 100}%`,
              right: `${100 - ((priceTo - 1920) / (7000 - 1920)) * 100}%`,
            }}
          />
          <input
            type="range"
            min={1920}
            max={7000}
            value={priceFrom}
            onChange={(e) => handlePriceFrom(Number(e.target.value))}
            className={styles.sidebar__sliderInput}
          />
          <input
            type="range"
            min={1920}
            max={7000}
            value={priceTo}
            onChange={(e) => handlePriceTo(Number(e.target.value))}
            className={styles.sidebar__sliderInput}
          />
        </div>
        <div className={styles.sidebar__priceRow}>
          <span className={styles.sidebar__priceLabel}>от</span>
          <span className={styles.sidebar__priceValue}>{priceFrom}</span>
          <span className={styles.sidebar__priceLabel}>до</span>
          <span className={styles.sidebar__priceValue}>{priceTo}</span>
        </div>
      </div>

      <div className={styles.sidebar__divider} />

      <button
        type="button"
        className={styles.sidebar__direction}
        onClick={() => setToExpanded(!toExpanded)}
      >
        <span className={styles.sidebar__directionIcon}>
          <img src={`${import.meta.env.BASE_URL}images/arrow-to.svg`} alt="" />
        </span>
        <span className={styles.sidebar__directionLabel}>Туда</span>
        <img
          src={
            toExpanded
              ? `${import.meta.env.BASE_URL}images/icon-minus.svg`
              : `${import.meta.env.BASE_URL}images/icon-plus.svg`
          }
          alt=""
          className={styles.sidebar__directionToggle}
        />
      </button>
      {toExpanded && (
        <div className={styles.sidebar__timeBlock}>
          <h4 className={styles.sidebar__timeTitle}>Время отправления</h4>
          <div className={styles.sidebar__slider}>
            <div className={styles.sidebar__sliderTrack} />
            <div
              className={styles.sidebar__sliderFill}
              style={{
                left: `${(toDepartureFrom / 24) * 100}%`,
                right: `${100 - (toDepartureTo / 24) * 100}%`,
              }}
            />
            <input
              type="range"
              min={0}
              max={24}
              value={toDepartureFrom}
              onChange={(e) => {
                const value = Math.min(
                  Number(e.target.value),
                  toDepartureTo - 1
                );
                setToDepartureFrom(value);
                dispatch(setParams({ start_departure_hour_from: value }));
              }}
              className={styles.sidebar__sliderInput}
            />
            <input
              type="range"
              min={0}
              max={24}
              value={toDepartureTo}
              onChange={(e) => {
                const value = Math.max(
                  Number(e.target.value),
                  toDepartureFrom + 1
                );
                setToDepartureTo(value);
                dispatch(setParams({ start_departure_hour_to: value }));
              }}
              className={styles.sidebar__sliderInput}
            />
          </div>
          <div className={styles.sidebar__timeRow}>
            <span>{toDepartureFrom}:00</span>
            <span>{toDepartureTo}:00</span>
          </div>

          <h4
            className={`${styles.sidebar__timeTitle} ${styles.sidebar__timeTitleRight}`}
          >
            Время прибытия
          </h4>
          <div className={styles.sidebar__slider}>
            <div className={styles.sidebar__sliderTrack} />
            <div
              className={styles.sidebar__sliderFill}
              style={{
                left: `${(toArrivalFrom / 24) * 100}%`,
                right: `${100 - (toArrivalTo / 24) * 100}%`,
              }}
            />
            <input
              type="range"
              min={0}
              max={24}
              value={toArrivalFrom}
              onChange={(e) => {
                const value = Math.min(Number(e.target.value), toArrivalTo - 1);
                setToArrivalFrom(value);
                dispatch(setParams({ start_arrival_hour_from: value }));
              }}
              className={styles.sidebar__sliderInput}
            />
            <input
              type="range"
              min={0}
              max={24}
              value={toArrivalTo}
              onChange={(e) => {
                const value = Math.max(
                  Number(e.target.value),
                  toArrivalFrom + 1
                );
                setToArrivalTo(value);
                dispatch(setParams({ start_arrival_hour_to: value }));
              }}
              className={styles.sidebar__sliderInput}
            />
          </div>
          <div className={styles.sidebar__timeRow}>
            <span>{toArrivalFrom}:00</span>
            <span>{toArrivalTo}:00</span>
          </div>
        </div>
      )}

      <button
        type="button"
        className={styles.sidebar__direction}
        onClick={() => setBackExpanded(!backExpanded)}
      >
        <span className={styles.sidebar__directionIcon}>
          <img src={`${import.meta.env.BASE_URL}images/arrow-back.svg`} alt="" />
        </span>
        <span className={styles.sidebar__directionLabel}>Обратно</span>
        <img
          src={
            backExpanded
              ? `${import.meta.env.BASE_URL}images/icon-minus.svg`
              : `${import.meta.env.BASE_URL}images/icon-plus.svg`
          }
          alt=""
          className={styles.sidebar__directionToggle}
        />
      </button>
      {backExpanded && (
        <div className={styles.sidebar__timeBlock}>
          <h4 className={styles.sidebar__timeTitle}>Время отправления</h4>
          <div className={styles.sidebar__slider}>
            <div className={styles.sidebar__sliderTrack} />
            <div
              className={styles.sidebar__sliderFill}
              style={{
                left: `${(backDepartureFrom / 24) * 100}%`,
                right: `${100 - (backDepartureTo / 24) * 100}%`,
              }}
            />
            <input
              type="range"
              min={0}
              max={24}
              value={backDepartureFrom}
              onChange={(e) => {
                const value = Math.min(
                  Number(e.target.value),
                  backDepartureTo - 1
                );
                setBackDepartureFrom(value);
                dispatch(setParams({ end_departure_hour_from: value }));
              }}
              className={styles.sidebar__sliderInput}
            />
            <input
              type="range"
              min={0}
              max={24}
              value={backDepartureTo}
              onChange={(e) => {
                const value = Math.max(
                  Number(e.target.value),
                  backDepartureFrom + 1
                );
                setBackDepartureTo(value);
                dispatch(setParams({ end_departure_hour_to: value }));
              }}
              className={styles.sidebar__sliderInput}
            />
          </div>
          <div className={styles.sidebar__timeRow}>
            <span>{backDepartureFrom}:00</span>
            <span>{backDepartureTo}:00</span>
          </div>

          <h4
            className={`${styles.sidebar__timeTitle} ${styles.sidebar__timeTitleRight}`}
          >
            Время прибытия
          </h4>
          <div className={styles.sidebar__slider}>
            <div className={styles.sidebar__sliderTrack} />
            <div
              className={styles.sidebar__sliderFill}
              style={{
                left: `${(backArrivalFrom / 24) * 100}%`,
                right: `${100 - (backArrivalTo / 24) * 100}%`,
              }}
            />
            <input
              type="range"
              min={0}
              max={24}
              value={backArrivalFrom}
              onChange={(e) => {
                const value = Math.min(
                  Number(e.target.value),
                  backArrivalTo - 1
                );
                setBackArrivalFrom(value);
                dispatch(setParams({ end_arrival_hour_from: value }));
              }}
              className={styles.sidebar__sliderInput}
            />
            <input
              type="range"
              min={0}
              max={24}
              value={backArrivalTo}
              onChange={(e) => {
                const value = Math.max(
                  Number(e.target.value),
                  backArrivalFrom + 1
                );
                setBackArrivalTo(value);
                dispatch(setParams({ end_arrival_hour_to: value }));
              }}
              className={styles.sidebar__sliderInput}
            />
          </div>
          <div className={styles.sidebar__timeRow}>
            <span>{backArrivalFrom}:00</span>
            <span>{backArrivalTo}:00</span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

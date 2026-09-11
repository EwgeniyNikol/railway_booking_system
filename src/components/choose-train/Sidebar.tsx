import { useState } from 'react';
import Calendar from '../Calendar';
import styles from './Sidebar.module.scss';

type CarType = 'coupe' | 'platzkart' | 'sitting' | 'lux';

const Sidebar = () => {
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [carType, setCarType] = useState<CarType>('coupe');
  const [wifi, setWifi] = useState(true);
  const [express, setExpress] = useState(false);
  const [toExpanded, setToExpanded] = useState(false);
  const [backExpanded, setBackExpanded] = useState(false);
  const [priceFrom, setPriceFrom] = useState(1920);
  const [priceTo, setPriceTo] = useState(7000);
  const [toDepartureFrom, setToDepartureFrom] = useState(0);
  const [toDepartureTo, setToDepartureTo] = useState(11);
  const [toArrivalFrom, setToArrivalFrom] = useState(5);
  const [toArrivalTo, setToArrivalTo] = useState(11);
  const [backDepartureFrom, setBackDepartureFrom] = useState(0);
  const [backDepartureTo, setBackDepartureTo] = useState(11);
  const [backArrivalFrom, setBackArrivalFrom] = useState(5);
  const [backArrivalTo, setBackArrivalTo] = useState(11);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarOpenArrival, setCalendarOpenArrival] = useState(false);

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
              src="/src/images/calendar.svg"
              alt=""
              className={styles.sidebar__inputIcon}
            />
          </div>
          {calendarOpen && (
            <div className={styles.sidebar__calendar}>
              <Calendar
                onSelect={(date) => {
                  setDepartureDate(date);
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
              src="/src/images/calendar.svg"
              alt=""
              className={styles.sidebar__inputIcon}
            />
          </div>
          {calendarOpenArrival && (
            <div className={styles.sidebar__calendar}>
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

      <div className={styles.sidebar__divider} />

      <div className={styles.sidebar__section}>
        <div className={styles.sidebar__option}>
          <img
            src="/src/images/icon-coupe.svg"
            alt=""
            className={styles.sidebar__optionIcon}
          />
          <span className={styles.sidebar__optionLabel}>Купе</span>
          <button
            type="button"
            className={`${styles.sidebar__switch} ${carType === 'coupe' ? styles.sidebar__switch_active : ''}`}
            onClick={() => setCarType('coupe')}
          >
            <span className={styles.sidebar__switchKnob} />
          </button>
        </div>

        <div className={styles.sidebar__option}>
          <img
            src="/src/images/icon-platzkart.svg"
            alt=""
            className={styles.sidebar__optionIcon}
          />
          <span className={styles.sidebar__optionLabel}>Плацкарт</span>
          <button
            type="button"
            className={`${styles.sidebar__switch} ${carType === 'platzkart' ? styles.sidebar__switch_active : ''}`}
            onClick={() => setCarType('platzkart')}
          >
            <span className={styles.sidebar__switchKnob} />
          </button>
        </div>

        <div className={styles.sidebar__option}>
          <img
            src="/src/images/icon-sitting.svg"
            alt=""
            className={styles.sidebar__optionIcon}
          />
          <span className={styles.sidebar__optionLabel}>Сидячий</span>
          <button
            type="button"
            className={`${styles.sidebar__switch} ${carType === 'sitting' ? styles.sidebar__switch_active : ''}`}
            onClick={() => setCarType('sitting')}
          >
            <span className={styles.sidebar__switchKnob} />
          </button>
        </div>

        <div className={styles.sidebar__option}>
          <img
            src="/src/images/icon-lux.svg"
            alt=""
            className={styles.sidebar__optionIcon}
          />
          <span className={styles.sidebar__optionLabel}>Люкс</span>
          <button
            type="button"
            className={`${styles.sidebar__switch} ${carType === 'lux' ? styles.sidebar__switch_active : ''}`}
            onClick={() => setCarType('lux')}
          >
            <span className={styles.sidebar__switchKnob} />
          </button>
        </div>

        <div className={styles.sidebar__option}>
          <img
            src="/src/images/icon-wifi.svg"
            alt=""
            className={styles.sidebar__optionIcon}
          />
          <span className={styles.sidebar__optionLabel}>Wi-Fi</span>
          <button
            type="button"
            className={`${styles.sidebar__switch} ${wifi ? styles.sidebar__switch_active : ''}`}
            onClick={() => setWifi(!wifi)}
          >
            <span className={styles.sidebar__switchKnob} />
          </button>
        </div>

        <div className={styles.sidebar__option}>
          <img
            src="/src/images/icon-express.svg"
            alt=""
            className={styles.sidebar__optionIcon}
          />
          <span className={styles.sidebar__optionLabel}>Экспресс</span>
          <button
            type="button"
            className={`${styles.sidebar__switch} ${express ? styles.sidebar__switch_active : ''}`}
            onClick={() => setExpress(!express)}
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
            onChange={(e) =>
              setPriceFrom(Math.min(Number(e.target.value), priceTo - 100))
            }
            className={styles.sidebar__sliderInput}
          />
          <input
            type="range"
            min={1920}
            max={7000}
            value={priceTo}
            onChange={(e) =>
              setPriceTo(Math.max(Number(e.target.value), priceFrom + 100))
            }
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
          <img src="/src/images/arrow-to.svg" alt="" />
        </span>
        <span className={styles.sidebar__directionLabel}>Туда</span>
        <img
          src={
            toExpanded
              ? '/src/images/icon-minus.svg'
              : '/src/images/icon-plus.svg'
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
              onChange={(e) =>
                setToDepartureFrom(
                  Math.min(Number(e.target.value), toDepartureTo - 1)
                )
              }
              className={styles.sidebar__sliderInput}
            />
            <input
              type="range"
              min={0}
              max={24}
              value={toDepartureTo}
              onChange={(e) =>
                setToDepartureTo(
                  Math.max(Number(e.target.value), toDepartureFrom + 1)
                )
              }
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
              onChange={(e) =>
                setToArrivalFrom(
                  Math.min(Number(e.target.value), toArrivalTo - 1)
                )
              }
              className={styles.sidebar__sliderInput}
            />
            <input
              type="range"
              min={0}
              max={24}
              value={toArrivalTo}
              onChange={(e) =>
                setToArrivalTo(
                  Math.max(Number(e.target.value), toArrivalFrom + 1)
                )
              }
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
          <img src="/src/images/arrow-back.svg" alt="" />
        </span>
        <span className={styles.sidebar__directionLabel}>Обратно</span>
        <img
          src={
            backExpanded
              ? '/src/images/icon-minus.svg'
              : '/src/images/icon-plus.svg'
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
              onChange={(e) =>
                setBackDepartureFrom(
                  Math.min(Number(e.target.value), backDepartureTo - 1)
                )
              }
              className={styles.sidebar__sliderInput}
            />
            <input
              type="range"
              min={0}
              max={24}
              value={backDepartureTo}
              onChange={(e) =>
                setBackDepartureTo(
                  Math.max(Number(e.target.value), backDepartureFrom + 1)
                )
              }
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
              onChange={(e) =>
                setBackArrivalFrom(
                  Math.min(Number(e.target.value), backArrivalTo - 1)
                )
              }
              className={styles.sidebar__sliderInput}
            />
            <input
              type="range"
              min={0}
              max={24}
              value={backArrivalTo}
              onChange={(e) =>
                setBackArrivalTo(
                  Math.max(Number(e.target.value), backArrivalFrom + 1)
                )
              }
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

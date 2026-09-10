import { useState } from 'react';
import styles from './Sidebar.module.scss';

type CarType = 'coupe' | 'platzkart' | 'sitting' | 'lux';

const Sidebar = () => {
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [carType, setCarType] = useState<CarType>('coupe');
  const [wifi, setWifi] = useState(true);
  const [express, setExpress] = useState(false);
  const [priceFrom, setPriceFrom] = useState(1920);
  const [priceTo, setPriceTo] = useState(7000);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__section}>
        <h3 className={styles.sidebar__title}>Дата поездки</h3>
        <div className={styles.sidebar__input}>
          <input
            type="text"
            value={departureDate}
            placeholder="Дата"
            onChange={(e) => setDepartureDate(e.target.value)}
            className={styles.sidebar__inputField}
          />
          <img
            src="/src/images/calendar.svg"
            alt=""
            className={styles.sidebar__inputIcon}
          />
        </div>
      </div>

      <div className={styles.sidebar__section}>
        <h3 className={styles.sidebar__title}>Дата возвращения</h3>
        <div className={styles.sidebar__input}>
          <input
            type="text"
            value={arrivalDate}
            placeholder="Дата"
            onChange={(e) => setArrivalDate(e.target.value)}
            className={styles.sidebar__inputField}
          />
          <img
            src="/src/images/calendar.svg"
            alt=""
            className={styles.sidebar__inputIcon}
          />
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

      <button type="button" className={styles.sidebar__direction}>
        <span className={styles.sidebar__directionIcon}>
          <img src="/src/images/arrow-to.svg" alt="" />
        </span>
        <span className={styles.sidebar__directionLabel}>Туда</span>
      </button>

      <button type="button" className={styles.sidebar__direction}>
        <span className={styles.sidebar__directionIcon}>
          <img src="/src/images/arrow-back.svg" alt="" />
        </span>
        <span className={styles.sidebar__directionLabel}>Обратно</span>
      </button>
    </aside>
  );
};

export default Sidebar;

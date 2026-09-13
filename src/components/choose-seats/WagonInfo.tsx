import { useState } from 'react';
import styles from './WagonInfo.module.scss';

type Coach = {
  _id: string;
  name: string;
  class_type: 'first' | 'second' | 'third' | 'fourth';
  have_wifi: boolean;
  have_air_conditioning: boolean;
  price: number;
  top_price: number;
  bottom_price: number;
  side_price: number;
  linens_price: number;
  wifi_price: number;
  is_linens_included: boolean;
  available_seats: number;
};

type WagonInfoProps = {
  coach: Coach;
  wagonNumber: number;
  passengersCount?: number;
};

const WagonInfo = ({
  coach,
  wagonNumber,
  passengersCount = 13,
}: WagonInfoProps) => {
  const hasTop = coach.top_price > 0;
  const hasBottom = coach.bottom_price > 0;
  const hasSide = coach.side_price > 0;

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  return (
    <div className={styles.wagonInfo}>
      <div className={styles.wagonInfo__plate}>
        <span className={styles.wagonInfo__number}>{wagonNumber}</span>
        <span className={styles.wagonInfo__label}>вагон</span>
      </div>

      <div className={styles.wagonInfo__details}>
        <div className={styles.wagonInfo__headers}>
          <span className={styles.wagonInfo__header}>
            Места{' '}
            <span className={styles.wagonInfo__rowCount}>
              {coach.available_seats}
            </span>
          </span>
          <span className={styles.wagonInfo__header}>Стоимость</span>
        </div>

        {hasTop && (
          <div className={styles.wagonInfo__row}>
            <span className={styles.wagonInfo__rowLabel}>
              Верхние{' '}
              <span className={styles.wagonInfo__rowCount}>
                {Math.floor(coach.available_seats / 2)}
              </span>
            </span>
            <span className={styles.wagonInfo__rowPrice}>
              {coach.top_price.toLocaleString('ru-RU')} ₽
            </span>
          </div>
        )}

        {hasBottom && (
          <div className={styles.wagonInfo__row}>
            <span className={styles.wagonInfo__rowLabel}>
              Нижние{' '}
              <span className={styles.wagonInfo__rowCount}>
                {Math.ceil(coach.available_seats / 2)}
              </span>
            </span>
            <span className={styles.wagonInfo__rowPrice}>
              {coach.bottom_price.toLocaleString('ru-RU')} ₽
            </span>
          </div>
        )}

        {hasSide && (
          <div className={styles.wagonInfo__row}>
            <span className={styles.wagonInfo__rowLabel}>
              Боковые{' '}
              <span className={styles.wagonInfo__rowCount}>
                {Math.floor(coach.available_seats / 3)}
              </span>
            </span>
            <span className={styles.wagonInfo__rowPrice}>
              {coach.side_price.toLocaleString('ru-RU')} ₽
            </span>
          </div>
        )}
      </div>

      <div className={styles.wagonInfo__service}>
        <div className={styles.wagonInfo__serviceTitle}>
          Обслуживание <span className={styles.wagonInfo__serviceFpk}>фпк</span>
        </div>

        <div className={styles.wagonInfo__serviceIcons}>
          {coach.is_linens_included && (
            <button
              type="button"
              className={`${styles.wagonInfo__serviceIcon} ${
                selectedServices.includes('linens')
                  ? styles.wagonInfo__serviceIcon_active
                  : ''
              }`}
              onClick={() => toggleService('linens')}
            >
              <img src="/src/images/icon-linens.svg" alt="" />
            </button>
          )}
          {coach.have_wifi && (
            <button
              type="button"
              className={`${styles.wagonInfo__serviceIcon} ${
                selectedServices.includes('wifi')
                  ? styles.wagonInfo__serviceIcon_active
                  : ''
              }`}
              onClick={() => toggleService('wifi')}
            >
              <img src="/src/images/icon-wifi.svg" alt="" />
            </button>
          )}
          <button
            type="button"
            className={`${styles.wagonInfo__serviceIcon} ${
              selectedServices.includes('food')
                ? styles.wagonInfo__serviceIcon_active
                : ''
            }`}
            onClick={() => toggleService('food')}
          >
            <img src="/src/images/icon-food.svg" alt="" />
          </button>
          {coach.have_air_conditioning && (
            <button
              type="button"
              className={`${styles.wagonInfo__serviceIcon} ${
                selectedServices.includes('conditioner')
                  ? styles.wagonInfo__serviceIcon_active
                  : ''
              }`}
              onClick={() => toggleService('conditioner')}
            >
              <img src="/src/images/icon-conditioner.svg" alt="" />
            </button>
          )}
        </div>

        <div className={styles.wagonInfo__passengers}>
          {passengersCount} человек выбирают места в этом поезде
        </div>
      </div>
    </div>
  );
};

export default WagonInfo;

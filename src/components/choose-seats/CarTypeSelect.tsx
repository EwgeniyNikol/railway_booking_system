import { useState } from 'react';
import styles from './CarTypeSelect.module.scss';

type CarType = 'sitting' | 'platzkart' | 'coupe' | 'lux';

type CarTypeSelectProps = {
  availableTypes?: CarType[];
};

const CAR_TYPES: { key: CarType; label: string; icon: string }[] = [
  {
    key: 'sitting',
    label: 'Сидячий',
    icon: '/src/images/icon-car-sitting.svg',
  },
  {
    key: 'platzkart',
    label: 'Плацкарт',
    icon: '/src/images/icon-car-platzkart.svg',
  },
  { key: 'coupe', label: 'Купе', icon: '/src/images/icon-car-coupe.svg' },
  { key: 'lux', label: 'Люкс', icon: '/src/images/icon-car-lux.svg' },
];

const CarTypeSelect = ({
  availableTypes = ['sitting', 'platzkart', 'coupe', 'lux'],
}: CarTypeSelectProps) => {
  const [selected, setSelected] = useState<CarType | null>(null);

  const handleSelect = (type: CarType) => {
    if (availableTypes.includes(type)) {
      setSelected(type);
    }
  };

  return (
    <div className={styles.carType}>
      <h3 className={styles.carType__title}>Тип вагона</h3>

      <div className={styles.carType__list}>
        {CAR_TYPES.map((type) => {
          const isAvailable = availableTypes.includes(type.key);
          const isSelected = selected === type.key;

          return (
            <button
              key={type.key}
              type="button"
              className={`${styles.carType__item} ${
                isSelected ? styles.carType__item_selected : ''
              } ${!isAvailable ? styles.carType__item_disabled : ''}`}
              onClick={() => handleSelect(type.key)}
              disabled={!isAvailable}
            >
              <span className={styles.carType__icon}>
                <img src={type.icon} alt="" />
              </span>
              <span className={styles.carType__label}>{type.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CarTypeSelect;

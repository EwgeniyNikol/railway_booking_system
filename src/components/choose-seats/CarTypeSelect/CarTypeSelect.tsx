import styles from './CarTypeSelect.module.scss';

type CarType = 'sitting' | 'platzkart' | 'coupe' | 'lux';

type CarTypeSelectProps = {
  availableApiTypes?: string[];
  selectedType?: string;
  onTypeChange?: (type: string) => void;
};

const CAR_TYPES: {
  key: CarType;
  label: string;
  icon: string;
  apiType: string;
}[] = [
  {
    key: 'sitting',
    label: 'Сидячий',
    icon: '/src/images/icon-car-sitting.svg',
    apiType: 'fourth',
  },
  {
    key: 'platzkart',
    label: 'Плацкарт',
    icon: '/src/images/icon-car-platzkart.svg',
    apiType: 'third',
  },
  {
    key: 'coupe',
    label: 'Купе',
    icon: '/src/images/icon-car-coupe.svg',
    apiType: 'second',
  },
  {
    key: 'lux',
    label: 'Люкс',
    icon: '/src/images/icon-car-lux.svg',
    apiType: 'first',
  },
];

const CarTypeSelect = ({
  availableApiTypes = ['first', 'second', 'third', 'fourth'],
  selectedType,
  onTypeChange,
}: CarTypeSelectProps) => {
  const handleSelect = (apiType: string) => {
    if (availableApiTypes.includes(apiType) && onTypeChange) {
      onTypeChange(apiType);
    }
  };

  return (
    <div className={styles.carType}>
      <h3 className={styles.carType__title}>Тип вагона</h3>

      <div className={styles.carType__list}>
        {CAR_TYPES.map((type) => {
          const isAvailable = availableApiTypes.includes(type.apiType);
          const isSelected = selectedType === type.apiType;

          return (
            <button
              key={type.key}
              type="button"
              className={`${styles.carType__item} ${
                isSelected ? styles.carType__item_selected : ''
              } ${!isAvailable ? styles.carType__item_disabled : ''}`}
              onClick={() => handleSelect(type.apiType)}
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

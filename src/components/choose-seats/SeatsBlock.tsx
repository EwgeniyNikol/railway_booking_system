import { useState } from 'react';
import WagonInfo from './WagonInfo';
import styles from './SeatsBlock.module.scss';

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

type SeatsBlockProps = {
  coaches: Coach[];
};

const SeatsBlock = ({ coaches }: SeatsBlockProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!coaches.length) return null;

  return (
    <div className={styles.seatsBlock}>
      <div className={styles.seatsBlock__wagons}>
        <div className={styles.seatsBlock__wagonsLeft}>
          <span className={styles.seatsBlock__wagonsLabel}>Вагоны</span>
          {coaches.map((coach, index) => (
            <button
              key={coach._id}
              type="button"
              className={`${styles.seatsBlock__wagon} ${
                selectedIndex === index ? styles.seatsBlock__wagon_active : ''
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <span className={styles.seatsBlock__wagonsHint}>
          Нумерация вагонов начинается с головы поезда
        </span>
      </div>

      <WagonInfo
        coach={coaches[selectedIndex]}
        wagonNumber={selectedIndex + 1}
      />
    </div>
  );
};

export default SeatsBlock;

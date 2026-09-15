import { useState } from 'react';
import WagonInfo from './WagonInfo';
import WagonScheme from './WagonScheme';
import styles from './SeatsBlock.module.scss';

type Seat = {
  index: number;
  available: boolean;
};

type Coach = {
  _id: string;
  number: number;
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
  seats: Seat[];
};

type SeatsBlockProps = {
  coaches: Coach[];
};

const SeatsBlock = ({ coaches }: SeatsBlockProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  if (!coaches.length) return null;

  const selectedCoach = coaches[selectedIndex] || coaches[0];

  const handleSeatClick = (index: number) => {
    setSelectedSeats((prev) =>
      prev.includes(index) ? prev.filter((s) => s !== index) : [...prev, index]
    );
  };

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
              {coach.number}
            </button>
          ))}
        </div>
        <span className={styles.seatsBlock__wagonsHint}>
          Нумерация вагонов начинается с головы поезда
        </span>
      </div>

      <WagonInfo coach={selectedCoach} wagonNumber={selectedCoach.number} />

      <WagonScheme
        classType={selectedCoach.class_type}
        seats={selectedCoach.seats}
        selectedSeats={selectedSeats}
        onSeatClick={handleSeatClick}
      />
    </div>
  );
};

export default SeatsBlock;

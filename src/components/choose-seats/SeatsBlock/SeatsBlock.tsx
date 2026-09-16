import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WagonInfo from '../WagonInfo/WagonInfo';
import WagonScheme from '../WagonScheme/WagonScheme';
import { togglePlace } from '../../../store/slices/bookingSlice';
import type { RootState, AppDispatch } from '../../../store/store';
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
  direction?: 'forward' | 'back';
};

const SeatsBlock = ({ coaches, direction = 'forward' }: SeatsBlockProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedIndices, setSelectedIndices] = useState<number[]>([0]);

  const selectedPlaces = useSelector(
    (state: RootState) => state.booking.selectedPlaces
  );

  if (!coaches.length) return null;

  const toggleWagon = (index: number) => {
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSeatClick = (coach: Coach, index: number) => {
    const price =
      coach.bottom_price || coach.top_price || coach.side_price || coach.price;

    dispatch(
      togglePlace({
        coachId: coach._id,
        seatNumber: index,
        classType: coach.class_type,
        price,
        direction,
      })
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
                selectedIndices.includes(index)
                  ? styles.seatsBlock__wagon_active
                  : ''
              }`}
              onClick={() => toggleWagon(index)}
            >
              {coach.number}
            </button>
          ))}
        </div>
        <span className={styles.seatsBlock__wagonsHint}>
          Нумерация вагонов начинается с головы поезда
        </span>
      </div>

      {selectedIndices.map((index) => {
        const coach = coaches[index];
        if (!coach) return null;

        const selectedSeats = selectedPlaces
          .filter((p) => p.coachId === coach._id && p.direction === direction)
          .map((p) => p.seatNumber);

        return (
          <div key={coach._id} className={styles.seatsBlock__coachBlock}>
            <WagonInfo coach={coach} wagonNumber={coach.number} />
            <WagonScheme
              classType={coach.class_type}
              seats={coach.seats}
              selectedSeats={selectedSeats}
              onSeatClick={(seatIndex) => handleSeatClick(coach, seatIndex)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SeatsBlock;

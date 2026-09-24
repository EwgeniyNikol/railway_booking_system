import {
  ToiletIcon,
  ConductorIcon,
  TeaIcon,
  TrashIcon,
} from '../WagonIcons/WagonIcons';
import type { SeatType } from '../../../utils/seatType';
import styles from '../WagonScheme/WagonShared.module.scss';

type Seat = {
  index: number;
  available: boolean;
};

type WagonCoupeProps = {
  seats: Seat[];
  selectedSeats: number[];
  onSeatClick: (index: number, seatType: SeatType) => void;
};

const chunk = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const WagonCoupe = ({ seats, selectedSeats, onSeatClick }: WagonCoupeProps) => {
  const blocks = chunk(seats, 4);

  const renderSeat = (seat: Seat | undefined, seatType: SeatType) => {
    if (!seat) return null;
    const isSelected = selectedSeats.includes(seat.index);
    return (
      <button
        type="button"
        className={`${styles.seat} ${
          !seat.available ? styles.seat_occupied : ''
        } ${isSelected ? styles.seat_selected : ''}`}
        onClick={() => seat.available && onSeatClick(seat.index, seatType)}
        disabled={!seat.available}
      >
        {seat.index}
      </button>
    );
  };

  return (
    <div className={styles.wagon}>
      <div className={styles.vestibule}>
        <ToiletIcon className={styles.icon} />
        <ConductorIcon className={styles.icon} />
        <TeaIcon className={styles.icon} />
      </div>

      <div className={styles.blocks}>
        {blocks.map((block, i) => (
          <div key={i} className={styles.block}>
            <div className={styles.blockRow}>
              {renderSeat(block[1], 'top')}
              {renderSeat(block[3], 'top')}
            </div>
            <div className={styles.blockRow}>
              {renderSeat(block[0], 'bottom')}
              {renderSeat(block[2], 'bottom')}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.vestibule}>
        <ToiletIcon className={styles.icon} />
        <TrashIcon className={styles.icon} />
      </div>
    </div>
  );
};

export default WagonCoupe;

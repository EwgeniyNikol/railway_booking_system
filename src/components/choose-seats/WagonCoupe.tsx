import { ToiletIcon, ConductorIcon, TeaIcon, TrashIcon } from './WagonIcons';
import styles from './WagonShared.module.scss';

type Seat = {
  index: number;
  available: boolean;
};

type WagonCoupeProps = {
  seats: Seat[];
  selectedSeats: number[];
  onSeatClick: (index: number) => void;
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

  const renderSeat = (seat?: Seat) => {
    if (!seat) return null;
    const isSelected = selectedSeats.includes(seat.index);
    return (
      <button
        type="button"
        className={`${styles.seat} ${
          !seat.available ? styles.seat_occupied : ''
        } ${isSelected ? styles.seat_selected : ''}`}
        onClick={() => seat.available && onSeatClick(seat.index)}
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
              {renderSeat(block[1])}
              {renderSeat(block[3])}
            </div>
            <div className={styles.blockRow}>
              {renderSeat(block[0])}
              {renderSeat(block[2])}
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

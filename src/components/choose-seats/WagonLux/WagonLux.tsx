import {
  ToiletIcon,
  ConductorIcon,
  TeaIcon,
  TrashIcon,
} from '../WagonIcons/WagonIcons';
import styles from '../WagonScheme/WagonShared.module.scss';

type Seat = {
  index: number;
  available: boolean;
};

type WagonLuxProps = {
  seats: Seat[];
  selectedSeats: number[];
  onSeatClick: (index: number) => void;
};

const renderSeat = (
  seat: Seat | undefined,
  selectedSeats: number[],
  onSeatClick: (index: number) => void
) => {
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

const WagonLux = ({ seats, selectedSeats, onSeatClick }: WagonLuxProps) => {
  const firstBlock = seats.slice(0, 3);
  const middleBlocks: Seat[][] = [];
  for (let i = 3; i < seats.length - 3; i += 2) {
    middleBlocks.push(seats.slice(i, i + 2));
  }
  const lastBlock = seats.slice(-3);

  return (
    <div className={styles.wagon}>
      <div className={styles.vestibule}>
        <ToiletIcon className={styles.icon} />
        <ConductorIcon className={styles.icon} />
        <TeaIcon className={styles.icon} />
      </div>

      <div className={styles.blocks}>
        <div className={styles.block}>
          <div className={styles.blockRow}>
            {renderSeat(firstBlock[0], selectedSeats, onSeatClick)}
            {renderSeat(firstBlock[1], selectedSeats, onSeatClick)}
          </div>
          <div className={styles.blockRow}>
            {renderSeat(firstBlock[2], selectedSeats, onSeatClick)}
          </div>
        </div>

        {middleBlocks.map((block, i) => (
          <div key={i} className={styles.block}>
            <div className={styles.blockRow}>
              {renderSeat(block[0], selectedSeats, onSeatClick)}
            </div>
            <div className={styles.blockRow}>
              {renderSeat(block[1], selectedSeats, onSeatClick)}
            </div>
          </div>
        ))}

        <div className={styles.block}>
          <div className={styles.blockRow}>
            {renderSeat(lastBlock[0], selectedSeats, onSeatClick)}
          </div>
          <div className={styles.blockRow}>
            {renderSeat(lastBlock[1], selectedSeats, onSeatClick)}
            {renderSeat(lastBlock[2], selectedSeats, onSeatClick)}
          </div>
        </div>
      </div>

      <div className={styles.vestibule}>
        <ToiletIcon className={styles.icon} />
        <TrashIcon className={styles.icon} />
      </div>
    </div>
  );
};

export default WagonLux;

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

type WagonSittingProps = {
  seats: Seat[];
  selectedSeats: number[];
  onSeatClick: (index: number, seatType: SeatType) => void;
};

const renderSeat = (
  seat: Seat | undefined,
  selectedSeats: number[],
  onSeatClick: (index: number, seatType: SeatType) => void
) => {
  if (!seat) return null;
  const isSelected = selectedSeats.includes(seat.index);
  return (
    <button
      type="button"
      className={`${styles.seat} ${
        !seat.available ? styles.seat_occupied : ''
      } ${isSelected ? styles.seat_selected : ''}`}
      onClick={() => seat.available && onSeatClick(seat.index, 'bottom')}
      disabled={!seat.available}
    >
      {seat.index}
    </button>
  );
};

const WagonSitting = ({
  seats,
  selectedSeats,
  onSeatClick,
}: WagonSittingProps) => {
  const topSeats = seats.slice(0, 32);
  const bottomSeats = seats.slice(32);

  const topBlocks: Seat[][] = [];
  for (let i = 0; i < topSeats.length; i += 4) {
    topBlocks.push(topSeats.slice(i, i + 4));
  }

  const bottomBlocks: Seat[][] = [];
  for (let i = 0; i < bottomSeats.length; i += 4) {
    bottomBlocks.push(bottomSeats.slice(i, i + 4));
  }

  return (
    <div className={styles.wagon}>
      <div className={styles.vestibule}>
        <ToiletIcon className={styles.icon} />
        <ConductorIcon className={styles.icon} />
        <TeaIcon className={styles.icon} />
      </div>

      <div className={styles.platzkart}>
        <div className={styles.sideRow}>
          {topBlocks.map((block, i) => (
            <div key={i} className={styles.block}>
              <div className={styles.blockRow}>
                {renderSeat(block[1], selectedSeats, onSeatClick)}
                {renderSeat(block[3], selectedSeats, onSeatClick)}
              </div>
              <div className={styles.blockRow}>
                {renderSeat(block[0], selectedSeats, onSeatClick)}
                {renderSeat(block[2], selectedSeats, onSeatClick)}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.sideRow}>
          {bottomBlocks.map((block, i) => (
            <div key={i} className={styles.block}>
              <div className={styles.blockRow}>
                {block[1] && renderSeat(block[1], selectedSeats, onSeatClick)}
                {block[3] && renderSeat(block[3], selectedSeats, onSeatClick)}
              </div>
              <div className={styles.blockRow}>
                {block[0] && renderSeat(block[0], selectedSeats, onSeatClick)}
                {block[2] && renderSeat(block[2], selectedSeats, onSeatClick)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.vestibule}>
        <ToiletIcon className={styles.icon} />
        <TrashIcon className={styles.icon} />
      </div>
    </div>
  );
};

export default WagonSitting;

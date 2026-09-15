import { ToiletIcon, ConductorIcon, TeaIcon, TrashIcon } from './WagonIcons';
import styles from './WagonShared.module.scss';

type Seat = {
  index: number;
  available: boolean;
};

type WagonPlatzkartProps = {
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

const WagonPlatzkart = ({
  seats,
  selectedSeats,
  onSeatClick,
}: WagonPlatzkartProps) => {
  const mainSeats = seats.slice(0, 32);
  const sideSeats = seats.slice(32);

  const mainBlocks: Seat[][] = [];
  for (let i = 0; i < mainSeats.length; i += 4) {
    mainBlocks.push(mainSeats.slice(i, i + 4));
  }

  const sideBlocks: Seat[][] = [];
  for (let i = 0; i < sideSeats.length; i += 2) {
    sideBlocks.push(sideSeats.slice(i, i + 2));
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
          {mainBlocks.map((block, i) => (
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
          {sideBlocks.map((block, i) => (
            <div key={i} className={styles.blockRow}>
              {renderSeat(block[0], selectedSeats, onSeatClick)}
              {renderSeat(block[1], selectedSeats, onSeatClick)}
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

export default WagonPlatzkart;

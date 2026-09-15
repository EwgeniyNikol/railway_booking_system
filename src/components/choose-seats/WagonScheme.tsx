import WagonCoupe from './WagonCoupe';
import WagonLux from './WagonLux';
import WagonPlatzkart from './WagonPlatzkart';
import WagonSitting from './WagonSitting';
import styles from './WagonScheme.module.scss';

type Seat = {
  index: number;
  available: boolean;
};

type WagonSchemeProps = {
  classType: 'first' | 'second' | 'third' | 'fourth';
  seats: Seat[];
  selectedSeats: number[];
  onSeatClick: (index: number) => void;
};

const WagonScheme = ({
  classType,
  seats,
  selectedSeats,
  onSeatClick,
}: WagonSchemeProps) => {
  const commonProps = { seats, selectedSeats, onSeatClick };

  return (
    <div className={styles.wagonScheme}>
      {classType === 'first' && <WagonLux {...commonProps} />}
      {classType === 'second' && <WagonCoupe {...commonProps} />}
      {classType === 'third' && <WagonPlatzkart {...commonProps} />}
      {classType === 'fourth' && <WagonSitting {...commonProps} />}
    </div>
  );
};

export default WagonScheme;

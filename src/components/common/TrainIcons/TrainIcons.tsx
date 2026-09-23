import type { Departure } from '../../../types/api';
import styles from './TrainIcons.module.scss';

type TrainIconsProps = {
  route: Departure;
};

const TrainIcons = ({ route }: TrainIconsProps) => {
  return (
    <div className={styles.trainIcons}>
      {route.have_wifi && (
        <img
          src={`${import.meta.env.BASE_URL}images/icon-wifi.svg`}
          alt=""
          className={styles.trainIcons__icon}
        />
      )}
      {route.is_express && (
        <img
          src={`${import.meta.env.BASE_URL}images/icon-express.svg`}
          alt=""
          className={styles.trainIcons__icon}
        />
      )}
      {route.have_air_conditioning && (
        <img
          src={`${import.meta.env.BASE_URL}images/icon-conditioner.svg`}
          alt=""
          className={styles.trainIcons__icon}
        />
      )}
      {route.have_food && (
        <img
          src={`${import.meta.env.BASE_URL}images/icon-food.svg`}
          alt=""
          className={styles.trainIcons__icon}
        />
      )}
      {route.have_linens && (
        <img
          src={`${import.meta.env.BASE_URL}images/icon-linens.svg`}
          alt=""
          className={styles.trainIcons__icon}
        />
      )}
    </div>
  );
};

export default TrainIcons;

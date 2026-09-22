import styles from './RouteInfo.module.scss';

type City = {
  _id: string;
  name: string;
};

type Station = {
  railway_station_name: string;
  city: City;
  datetime: number;
};

type RouteInfoProps = {
  trainName: string;
  from: Station;
  to: Station;
  direction?: 'forward' | 'backward';
};

const capitalizeCity = (name: string) =>
  name
    .split(/[-\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(name.includes('-') ? '-' : ' ');

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const formatDuration = (from: number, to: number) => {
  const seconds = to - from;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours} часов ${minutes} минут`;
};

const RouteInfo = ({
  trainName,
  from,
  to,
  direction = 'forward',
}: RouteInfoProps) => {
  const trainNumber = trainName.split(' - ')[1] || '';

  return (
    <div className={styles.routeInfo}>
      <div className={styles.routeInfo__left}>
        <div className={styles.routeInfo__trainIcon}>
          <img src={`${import.meta.env.BASE_URL}images/icon-train-seats.svg`} alt="" />
        </div>
        <div className={styles.routeInfo__trainInfo}>
          <div className={styles.routeInfo__trainNumber}>{trainNumber}</div>
          <div className={styles.routeInfo__route}>
            {capitalizeCity(from.city.name)} → {capitalizeCity(to.city.name)}
          </div>
        </div>
      </div>

      <div className={styles.routeInfo__divider} />

      <div className={styles.routeInfo__timeBlock}>
        <div className={styles.routeInfo__time}>
          {formatTime(from.datetime)}
        </div>
        <div className={styles.routeInfo__city}>
          {capitalizeCity(from.city.name)}
        </div>
        <div className={styles.routeInfo__station}>
          {from.railway_station_name}
        </div>
      </div>

      <div className={styles.routeInfo__arrow}>
        <img
          src={
            direction === 'forward'
              ? `${import.meta.env.BASE_URL}images/arrow-duration.svg`
              : `${import.meta.env.BASE_URL}images/arrow-duration-left.svg`
          }
          alt=""
        />
      </div>

      <div className={styles.routeInfo__timeBlock}>
        <div className={styles.routeInfo__time}>{formatTime(to.datetime)}</div>
        <div className={styles.routeInfo__city}>
          {capitalizeCity(to.city.name)}
        </div>
        <div className={styles.routeInfo__station}>
          {to.railway_station_name}
        </div>
      </div>

      <div className={styles.routeInfo__divider} />

      <div className={styles.routeInfo__durationBlock}>
        <div className={styles.routeInfo__clock}>
          <img src={`${import.meta.env.BASE_URL}images/icon-clock.svg`} alt="" />
        </div>
        <div className={styles.routeInfo__duration}>
          {formatDuration(from.datetime, to.datetime)}
        </div>
      </div>
    </div>
  );
};

export default RouteInfo;

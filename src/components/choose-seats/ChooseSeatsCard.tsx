import styles from './ChooseSeatsCard.module.scss';

type ChooseSeatsCardProps = {
  children: React.ReactNode;
};

const ChooseSeatsCard = ({ children }: ChooseSeatsCardProps) => {
  return <div className={styles.card}>{children}</div>;
};

export default ChooseSeatsCard;

import loadingTrain from '/src/images/loading-train.svg';
import styles from './LoadingScreen.module.scss';

const LoadingScreen = () => {
  return (
    <div className={styles.loading}>
      <span className={styles.loading__text}>идёт поиск</span>
      <div className={styles.loading__track}>
        <img src={loadingTrain} alt="" className={styles.loading__train} />
      </div>
    </div>
  );
};

export default LoadingScreen;

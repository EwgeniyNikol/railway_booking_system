import Header from '../components/Header';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <>
      <Header />
      <main className={styles.home}>
        <p className={styles.home__subtitle}>
          Найдите и забронируйте билеты на поезд
        </p>
      </main>
    </>
  );
};

export default HomePage;
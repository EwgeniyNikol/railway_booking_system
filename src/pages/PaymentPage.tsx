import HeaderTrain from '../components/choose-train/HeaderTrain/HeaderTrain';
import ProgressSteps from '../components/choose-train/ProgressSteps/ProgressSteps';
import TripDetails from '../components/passengers/TripDetails/TripDetails';
import PaymentCard from '../components/payment/PaymentCard/PaymentCard';
import Footer from '../components/Footer/Footer';
import styles from './PaymentPage.module.scss';

const PaymentPage = () => {
  return (
    <>
      <HeaderTrain />
      <ProgressSteps />
      <div className={styles.page}>
        <div className={styles.page__sidebar}>
          <TripDetails />
        </div>
        <div className={styles.page__content}>
          <PaymentCard />
          <button type="button" className={styles.page__button}>
            Купить билеты
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;

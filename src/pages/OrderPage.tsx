import HeaderTrain from '../components/choose-train/HeaderTrain/HeaderTrain';
import ProgressSteps from '../components/choose-train/ProgressSteps/ProgressSteps';
import TripDetails from '../components/passengers/TripDetails/TripDetails';
import TrainCard from '../components/order/TrainCard/TrainCard';
import PassengersCard from '../components/order/PassengersCard/PassengersCard';
import PaymentMethodCard from '../components/order/PaymentMethodCard/PaymentMethodCard';
import ConfirmButton from '../components/order/ConfirmButton/ConfirmButton';
import Footer from '../components/Footer/Footer';
import styles from './OrderPage.module.scss';

const OrderPage = () => {
  return (
    <>
      <HeaderTrain />
      <ProgressSteps activeStep={3} />
      <div className={styles.page}>
        <div className={styles.page__sidebar}>
          <TripDetails />
        </div>
        <div className={styles.page__content}>
          <TrainCard />
          <PassengersCard />
          <PaymentMethodCard />
          <ConfirmButton />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderPage;

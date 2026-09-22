import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderTrain from '../components/choose-train/HeaderTrain/HeaderTrain';
import ProgressSteps from '../components/choose-train/ProgressSteps/ProgressSteps';
import TripDetails from '../components/passengers/TripDetails/TripDetails';
import PaymentCard from '../components/payment/PaymentCard/PaymentCard';
import NextButton from '../components/common/NextButton/NextButton';
import Footer from '../components/Footer/Footer';
import styles from './PaymentPage.module.scss';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);

  const handleBuy = () => {
    navigate('/order');
  };

  return (
    <>
      <HeaderTrain />
      <ProgressSteps activeStep={2} />
      <div className={styles.page}>
        <div className={styles.page__sidebar}>
          <TripDetails />
        </div>
        <div className={styles.page__content}>
          <PaymentCard onValidityChange={setIsFormValid} />
          <div className={styles.page__next}>
            <NextButton
              wide
              onClick={handleBuy}
              disabled={!isFormValid}
            >
              Купить билеты
            </NextButton>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderTrain from '../components/choose-train/HeaderTrain/HeaderTrain';
import ProgressSteps from '../components/choose-train/ProgressSteps/ProgressSteps';
import TripDetails from '../components/passengers/TripDetails/TripDetails';
import TrainCard from '../components/order/TrainCard/TrainCard';
import PassengersCard from '../components/order/PassengersCard/PassengersCard';
import PaymentMethodCard from '../components/order/PaymentMethodCard/PaymentMethodCard';
import NextButton from '../components/common/NextButton/NextButton';
import Footer from '../components/Footer/Footer';
import {
  setLastOrderId,
  setOrderTotal,
  submitBooking,
} from '../store/slices/bookingSlice';
import { buildOrderPayload } from '../utils/buildOrderPayload';
import { generateOrderId } from '../utils/generateOrderId';
import { saveOrder } from '../utils/orderStorage';
import { selectTotalPrice } from '../store/selectors/totalPrice';
import type { RootState, AppDispatch } from '../store/store';
import styles from './OrderPage.module.scss';

const OrderPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const state = useSelector((s: RootState) => s);
  const orderStatus = useSelector((s: RootState) => s.booking.orderStatus);
  const { totalPrice } = useSelector(selectTotalPrice);

  const handleConfirm = async () => {
    const payload = buildOrderPayload(state);
    if (!payload) return;

    const orderId = generateOrderId();
    dispatch(setLastOrderId(orderId));
    dispatch(setOrderTotal(totalPrice));

    saveOrder({
      lastOrderId: orderId,
      orderTotal: totalPrice,
      payer: state.booking.payer,
    });

    const result = await dispatch(submitBooking(payload));
    if (submitBooking.fulfilled.match(result)) {
      navigate('/order-success');
    }
  };

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
          <div className={styles.page__next}>
            <NextButton
              wide
              onClick={handleConfirm}
              disabled={orderStatus === 'loading'}
            >
              подтвердить
            </NextButton>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderPage;

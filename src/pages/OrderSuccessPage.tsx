import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import HeaderSuccess from '../components/order-success/HeaderSuccess/HeaderSuccess';
import SuccessCard from '../components/order-success/SuccessCard/SuccessCard';
import Footer from '../components/Footer/Footer';
import {
  setLastOrderId,
  setOrderTotal,
  setPayer,
} from '../store/slices/bookingSlice';
import { loadOrder } from '../utils/orderStorage';
import type { AppDispatch } from '../store/store';
import styles from './OrderSuccessPage.module.scss';

const OrderSuccessPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stored = useMemo(() => loadOrder(), []);

  useEffect(() => {
    if (stored) {
      dispatch(setLastOrderId(stored.lastOrderId));
      dispatch(setOrderTotal(stored.orderTotal));
      dispatch(setPayer(stored.payer));
    }
  }, [dispatch, stored]);

  if (!stored) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className={styles.hero}>
        <HeaderSuccess />
        <h1 className={styles.hero__title}>Благодарим Вас за заказ!</h1>
      </div>
      <div className={styles.card}>
        <SuccessCard />
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccessPage;

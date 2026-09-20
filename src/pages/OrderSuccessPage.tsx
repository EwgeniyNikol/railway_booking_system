import HeaderSuccess from '../components/order-success/HeaderSuccess/HeaderSuccess';
import SuccessCard from '../components/order-success/SuccessCard/SuccessCard';
import Footer from '../components/Footer/Footer';
import styles from './OrderSuccessPage.module.scss';

const OrderSuccessPage = () => {
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

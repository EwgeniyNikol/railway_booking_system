import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../../store/store';
import styles from './PaymentMethodCard.module.scss';

const PaymentMethodCard = () => {
  const navigate = useNavigate();
  const paymentMethod = useSelector(
    (state: RootState) => state.booking.payer.paymentMethod
  );

  return (
    <div className={styles.paymentMethodCard}>
      <div className={styles.paymentMethodCard__header}>
        <h2 className={styles.paymentMethodCard__title}>Способ оплаты</h2>
      </div>

      <div className={styles.paymentMethodCard__body}>
        <div className={styles.paymentMethodCard__method}>
          <span className={styles.paymentMethodCard__methodName}>
            {paymentMethod === 'cash' ? 'Наличными' : 'Онлайн'}
          </span>
        </div>

        <div className={styles.paymentMethodCard__aside}>
          <button
            type="button"
            className={styles.paymentMethodCard__change}
            onClick={() => navigate('/payment')}
          >
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;

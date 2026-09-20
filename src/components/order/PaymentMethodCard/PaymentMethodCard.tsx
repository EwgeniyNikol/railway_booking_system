import styles from './PaymentMethodCard.module.scss';

const PaymentMethodCard = () => {
  return (
    <div className={styles.paymentMethodCard}>
      <div className={styles.paymentMethodCard__header}>
        <h2 className={styles.paymentMethodCard__title}>Способ оплаты</h2>
      </div>

      <div className={styles.paymentMethodCard__body}>
        <div className={styles.paymentMethodCard__method}>
          <span className={styles.paymentMethodCard__methodName}>
            Наличными
          </span>
        </div>

        <div className={styles.paymentMethodCard__aside}>
          <button type="button" className={styles.paymentMethodCard__change}>
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;

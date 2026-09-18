import { useState } from 'react';
import styles from './PaymentCard.module.scss';

const PaymentCard = () => {
  const [paymentMethod, setPaymentMethod] = useState('online');

  return (
    <div className={styles.paymentCard}>
      <div className={styles.paymentCard__bar}>
        <h2 className={styles.paymentCard__title}>Персональные данные</h2>
      </div>

      <div
        className={`${styles.paymentCard__section} ${styles.paymentCard__section_first}`}
      >
        <div className={styles.paymentCard__row}>
          <div className={styles.paymentCard__field}>
            <span className={styles.paymentCard__label}>Фамилия</span>
            <input type="text" className={styles.paymentCard__input} />
          </div>
          <div className={styles.paymentCard__field}>
            <span className={styles.paymentCard__label}>Имя</span>
            <input type="text" className={styles.paymentCard__input} />
          </div>
          <div className={styles.paymentCard__field}>
            <span className={styles.paymentCard__label}>Отчество</span>
            <input type="text" className={styles.paymentCard__input} />
          </div>
        </div>

        <div
          className={`${styles.paymentCard__field} ${styles.paymentCard__field_indent}`}
        >
          <span className={styles.paymentCard__label}>Контактный телефон</span>
          <input
            type="text"
            placeholder="+7 ___ ___ __ __"
            className={`${styles.paymentCard__input} ${styles.paymentCard__input_wide}`}
          />
        </div>

        <div className={styles.paymentCard__field}>
          <span className={styles.paymentCard__label}>E-mail</span>
          <input
            type="text"
            placeholder="inbox@gmail.ru"
            className={`${styles.paymentCard__input} ${styles.paymentCard__input_wide}`}
          />
        </div>
      </div>

      <div
        className={`${styles.paymentCard__bar} ${styles.paymentCard__bar_bordered}`}
      >
        <h2 className={styles.paymentCard__title}>Способ оплаты</h2>
      </div>

      <div className={styles.paymentCard__section}>
        <label
          className={styles.paymentCard__method}
          onClick={() => setPaymentMethod('online')}
        >
          <span
            className={
              paymentMethod === 'online'
                ? styles.paymentCard__radio_active
                : styles.paymentCard__radio
            }
          >
            {paymentMethod === 'online' && (
              <img
                src="/src/images/icon-check.svg"
                alt=""
                className={styles.paymentCard__check}
              />
            )}
          </span>
          <span
            className={
              paymentMethod === 'online'
                ? styles.paymentCard__methodName_active
                : styles.paymentCard__methodName
            }
          >
            Онлайн
          </span>
        </label>

        <div className={styles.paymentCard__methodRow}>
          <span className={styles.paymentCard__methodName_bold}>
            Банковской картой
          </span>
          <span className={styles.paymentCard__methodName_bold}>PayPal</span>
          <span className={styles.paymentCard__methodName_bold}>
            Visa QIWI Wallet
          </span>
        </div>

        <div className={styles.paymentCard__cash}>
          <label
            className={styles.paymentCard__method}
            onClick={() => setPaymentMethod('cash')}
          >
            <span
              className={
                paymentMethod === 'cash'
                  ? styles.paymentCard__radio_active
                  : styles.paymentCard__radio
              }
            >
              {paymentMethod === 'cash' && (
                <img
                  src="/src/images/icon-check.svg"
                  alt=""
                  className={styles.paymentCard__check}
                />
              )}
            </span>
            <span
              className={
                paymentMethod === 'cash'
                  ? styles.paymentCard__methodName_active
                  : styles.paymentCard__methodName
              }
            >
              Наличными
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;

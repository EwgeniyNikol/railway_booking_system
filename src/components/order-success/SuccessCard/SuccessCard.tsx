import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../../store/store';
import { setRating, resetBooking } from '../../../store/slices/bookingSlice';
import { clearOrder } from '../../../utils/orderStorage';
import styles from './SuccessCard.module.scss';

const SuccessCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hover, setHover] = useState(0);

  const lastOrderId = useSelector(
    (state: RootState) => state.booking.lastOrderId
  );
  const orderTotal = useSelector(
    (state: RootState) => state.booking.orderTotal
  );
  const payer = useSelector((state: RootState) => state.booking.payer);
  const rating = useSelector((state: RootState) => state.booking.rating);

  const handleRating = (n: number) => {
    dispatch(setRating(n));
  };

  const handleBack = () => {
    clearOrder();
    dispatch(resetBooking());
    navigate('/');
  };

  const name = payer.patronymic
    ? `${payer.firstName} ${payer.patronymic}!`
    : `${payer.firstName}!`;

  return (
    <div className={styles.successCard}>
      <div className={styles.successCard__head}>
        <span className={styles.successCard__order}>
          №Заказа {lastOrderId ?? '—'}
        </span>
        <div className={styles.successCard__sum}>
          <span className={styles.successCard__sumLabel}>сумма</span>
          <span className={styles.successCard__sumValue}>
            {orderTotal.toLocaleString('ru-RU')}
          </span>
          <img
            src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
            alt=""
            className={styles.successCard__sumCurrency}
          />
        </div>
      </div>

      <div className={styles.successCard__divider} />

      <div className={styles.successCard__steps}>
        <div className={styles.successCard__step}>
          <div className={styles.successCard__stepIcon}>
            <img
              src={`${import.meta.env.BASE_URL}images/icon-success-mail.svg`}
              alt=""
              className={styles.successCard__iconSvg}
            />
          </div>
          <span className={styles.successCard__stepText}>
            билеты будут отправлены на ваш e-mail
          </span>
        </div>

        <div className={styles.successCard__step}>
          <div className={styles.successCard__stepIcon}>
            <img
              src={`${import.meta.env.BASE_URL}images/icon-success-print.svg`}
              alt=""
              className={styles.successCard__iconSvg}
            />
          </div>
          <span className={styles.successCard__stepText}>
            распечатайте и сохраняйте билеты до даты поездки
          </span>
        </div>

        <div className={styles.successCard__step}>
          <div className={styles.successCard__stepIcon}>
            <img
              src={`${import.meta.env.BASE_URL}images/icon-success-ticket.svg`}
              alt=""
              className={styles.successCard__iconSvg}
            />
          </div>
          <span className={styles.successCard__stepText}>
            предьявите распечатанные билеты при посадке
          </span>
        </div>
      </div>

      <div className={styles.successCard__content}>
        <h2 className={styles.successCard__name}>{name}</h2>
        <p className={styles.successCard__text}>
          Ваш заказ успешно оформлен. В ближайшее время с вами свяжется наш
          оператор для подтверждения.
        </p>
        <p className={styles.successCard__text_bold}>
          Благодарим Вас за оказанное доверие и желаем приятного путешествия!
        </p>
      </div>

      <div className={styles.successCard__footer}>
        <div className={styles.successCard__rating}>
          <span className={styles.successCard__ratingLabel}>
            Оценить сервис
          </span>
          <div
            className={styles.successCard__stars}
            onMouseLeave={() => setHover(0)}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={`${styles.successCard__star} ${
                  n <= (hover || rating) ? styles.successCard__star_active : ''
                }`}
                onClick={() => handleRating(n)}
                onMouseEnter={() => setHover(n)}
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/icon-star.svg`}
                  alt=""
                  className={styles.successCard__starIcon}
                />
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          className={styles.successCard__button}
          onClick={handleBack}
        >
          вернуться на главную
        </button>
      </div>
    </div>
  );
};

export default SuccessCard;

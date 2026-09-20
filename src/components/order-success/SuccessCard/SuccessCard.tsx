import { useState } from 'react';
import styles from './SuccessCard.module.scss';

const SuccessCard = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className={styles.successCard}>
      <div className={styles.successCard__head}>
        <span className={styles.successCard__order}>№Заказа 285АА</span>
        <div className={styles.successCard__sum}>
          <span className={styles.successCard__sumLabel}>сумма</span>
          <span className={styles.successCard__sumValue}>7 760</span>
          <img
            src="/src/images/icon-ruble.svg"
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
              src="/src/images/icon-success-mail.svg"
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
              src="/src/images/icon-success-print.svg"
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
              src="/src/images/icon-success-ticket.svg"
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
        <h2 className={styles.successCard__name}>Ирина Эдуардовна!</h2>
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
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
              >
                <img
                  src="/src/images/icon-star.svg"
                  alt=""
                  className={styles.successCard__starIcon}
                />
              </button>
            ))}
          </div>
        </div>
        <button type="button" className={styles.successCard__button}>
          вернуться на главную
        </button>
      </div>
    </div>
  );
};

export default SuccessCard;

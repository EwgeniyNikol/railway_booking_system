import styles from './Reviews.module.scss';

const Reviews = () => {
  return (
    <section className={styles.reviews} id="reviews">
      <h2 className={styles.reviews__title}>отзывы</h2>
      <div className={styles.reviews__list}>
        <div className={styles.reviews__item}>
          <img
            src="/src/images/review-1-1x.webp"
            srcSet="/src/images/review-1-1x.webp 1x, /src/images/review-1-2x.webp 2x"
            alt="Екатерина Вальнова"
            className={styles.reviews__photo}
          />
          <div className={styles.reviews__content}>
            <p className={styles.reviews__name}>Екатерина Вальнова</p>
            <p className={styles.reviews__text}>
              “Доброжелательные подсказки на всех этапах помогут правильно заполнить
               поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете
               онлайн билет впервые.”
            </p>
          </div>
        </div>
        <div className={styles.reviews__item}>
          <img
            src="/src/images/review-2-1x.webp"
            srcSet="/src/images/review-2-1x.webp 1x, /src/images/review-2-2x.webp 2x"
            alt="Евгений Стрыкало"
            className={styles.reviews__photo}
          />
          <div className={styles.reviews__content}>
            <p className={styles.reviews__name}>Евгений Стрыкало</p>
            <p className={styles.reviews__text}>
              “СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа
               до отправления мы пришлем вам СМС-напоминание о поездке.”
            </p>
          </div>
        </div>
      </div>
      <div className={styles.reviews__dots}>
        <span className={`${styles.reviews__dot} ${styles.reviews__dot_active}`}></span>
        <span className={styles.reviews__dot}></span>
        <span className={styles.reviews__dot}></span>
        <span className={styles.reviews__dot}></span>
        <span className={styles.reviews__dot}></span>
      </div>
    </section>
  );
};

export default Reviews;
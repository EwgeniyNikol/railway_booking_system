import styles from './HowItWorks.module.scss';

const HowItWorks = () => {
  return (
    <section className={styles.how} id="how-it-works">
      <div className={styles.how__header}>
        <h2 className={styles.how__title}>Как это работает</h2>
        <button type="button" className={styles.how__button}>
          Узнать больше
        </button>
      </div>
      <div className={styles.how__items}>
        <div className={styles.how__item}>
          <div className={styles.how__icon}>
            <img
                src="/src/images/icon-order.svg"
                alt=""
                className={styles.how__icon_img}
            />
          </div>
          <p className={`${styles.how__text} ${styles.how__text_light}`}>
            Удобный заказ <br /> на сайте
          </p>
        </div>
        <div className={styles.how__item}>
          <div className={styles.how__icon}>
            <img
                src="/src/images/icon-office.svg"
                alt=""
                className={styles.how__icon_img}
            />
          </div>
          <p className={styles.how__text}>Нет необходимости ехать в офис</p>
        </div>
        <div className={styles.how__item}>
          <div className={styles.how__icon}>
            <img
                src="/src/images/icon-directions.svg"
                alt=""
                className={styles.how__icon_img}
            />
          </div>
          <p className={styles.how__text}>Огромный выбор направлений</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
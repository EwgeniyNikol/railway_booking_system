import styles from './HeaderTrain.module.scss';

const HeaderTrain = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <div className={styles.header__logo}>Лого</div>
      </div>
      <nav className={styles.header__nav}>
        <a href="/#about" className={styles.header__link}>
          О нас
        </a>
        <a href="/#how-it-works" className={styles.header__link}>
          Как это работает
        </a>
        <a href="/#reviews" className={styles.header__link}>
          Отзывы
        </a>
        <a href="/#contacts" className={styles.header__link}>
          Контакты
        </a>
      </nav>
      <div className={styles.header__search}>
        <div className={styles.header__fields}>
          <div className={styles.header__column}>
            <div className={styles.header__label}>Направление</div>
            <div className={styles.header__row}>
              <input
                type="text"
                className={`${styles.header__input} ${styles.header__input_icon}`}
                placeholder="Откуда"
              />
              <img
                src="/src/images/ic-cached.svg"
                alt=""
                className={styles.header__swap}
              />
              <input
                type="text"
                className={`${styles.header__input} ${styles.header__input_icon}`}
                placeholder="Куда"
              />
            </div>
          </div>
          <div className={styles.header__column}>
            <div className={styles.header__label}>Дата</div>
            <div className={styles.header__row}>
              <input
                type="text"
                className={`${styles.header__input} ${styles.header__input_calendar}`}
                placeholder="ДД/ММ/ГГ"
              />
              <input
                type="text"
                className={`${styles.header__input} ${styles.header__input_calendar}`}
                placeholder="ДД/ММ/ГГ"
              />
            </div>
          </div>
        </div>
        <button type="button" className={styles.header__button}>
          найти билеты
        </button>
      </div>
    </header>
  );
};

export default HeaderTrain;
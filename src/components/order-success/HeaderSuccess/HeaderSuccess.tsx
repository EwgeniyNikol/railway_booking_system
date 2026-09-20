import styles from './HeaderSuccess.module.scss';

const HeaderSuccess = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <div className={styles.header__logo}>Лого</div>
      </div>
      <nav className={styles.header__nav}>
        <a href="#about" className={styles.header__link}>
          О нас
        </a>
        <a href="#how-it-works" className={styles.header__link}>
          Как это работает
        </a>
        <a href="#reviews" className={styles.header__link}>
          Отзывы
        </a>
        <a href="#contacts" className={styles.header__link}>
          Контакты
        </a>
      </nav>
    </header>
  );
};

export default HeaderSuccess;

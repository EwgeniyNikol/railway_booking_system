import styles from './About.module.scss';

const About = () => {
  return (
    <section className={styles.about} id="about">
      <h2 className={styles.about__title}>о нас</h2>
      <div className={styles.about__content}>
        <div className={styles.about__line}></div>
        <div className={styles.about__text_block}>
          <p className={styles.about__text}>
            Мы рады видеть вас! Мы рботаем для Вас с 2003 года. 14 лет мы
            наблюдаем, как с каждым днем все больше людей заказывают жд билеты
            через интернет.
          </p>
          <p className={styles.about__text}>
            Сегодня можно заказать железнодорожные билеты онлайн всего в 2
            клика, но стоит ли это делать? Мы расскажем о преимуществах заказа
            через интернет.
          </p>
          <p className={`${styles.about__text} ${styles.about__text_bold}`}>
            Покупать жд билеты дешево можно за 90 суток до отправления поезда.
            Благодаря динамическому ценообразованию цена на билеты в это время
            самая низкая.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

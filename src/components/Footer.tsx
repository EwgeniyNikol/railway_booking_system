import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer} id="contacts">
      <div className={styles.footer__top}>
        <div className={styles.footer__contacts}>
          <h2 className={styles.footer__title}>Свяжитесь с нами</h2>
          <div className={styles.footer__contact}>
            <img
              src="/src/images/tel.svg"
              alt=""
              className={styles.footer__icon}
            />
            <span className={styles.footer__text}>8 (800) 000 00 00</span>
          </div>
          <div className={styles.footer__contact}>
            <img
              src="/src/images/mail.svg"
              alt=""
              className={styles.footer__icon}
            />
            <span className={styles.footer__text}>inbox@mail.ru</span>
          </div>
          <div className={styles.footer__contact}>
            <img
              src="/src/images/skype.svg"
              alt=""
              className={styles.footer__icon}
            />
            <span className={styles.footer__text}>tu.train.tickets</span>
          </div>
          <div className={styles.footer__contact}>
            <img
              src="/src/images/place.svg"
              alt=""
              className={styles.footer__icon}
            />
            <span className={styles.footer__text}>
              г. Москва ул. Московская 27-35 555 555
            </span>
          </div>
        </div>
        <div className={styles.footer__subscribe}>
          <h2 className={styles.footer__title}>Подписка</h2>
          <p className={styles.footer__subtitle}>Будьте в курсе событий</p>
          <div className={styles.footer__form}>
            <input
              type="email"
              placeholder="e-mail"
              className={styles.footer__input}
            />
            <button type="button" className={styles.footer__button}>
              отправить
            </button>
          </div>
          <p className={styles.footer__social_title}>Подписывайтесь на нас</p>
          <div className={styles.footer__socials}>
            <img
              src="/src/images/yotube.svg"
              alt=""
              className={styles.footer__social}
            />
            <img
              src="/src/images/in.svg"
              alt=""
              className={styles.footer__social}
            />
            <img
              src="/src/images/google.svg"
              alt=""
              className={styles.footer__social}
            />
            <img
              src="/src/images/facebook.svg"
              alt=""
              className={styles.footer__social}
            />
            <img
              src="/src/images/twiter.svg"
              alt=""
              className={styles.footer__social}
            />
          </div>
        </div>
      </div>
      <div className={styles.footer__bottom}>
        <span className={styles.footer__logo}>Лого</span>
        <div className={styles.footer__arrow}>
          <img
            src="/src/images/arrow-up.svg"
            alt=""
            className={styles.footer__arrow_icon}
          />
        </div>
        <span className={styles.footer__year}>2018 WEB</span>
      </div>
    </footer>
  );
};

export default Footer;

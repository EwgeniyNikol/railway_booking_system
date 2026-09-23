import { useState } from 'react';
import { subscribeEmail } from '../../api';
import styles from './Footer.module.scss';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubscribe = async () => {
    if (!email) {
      setEmailError('Укажите e-mail');
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setEmailError('Неверный e-mail');
      return;
    }

    setEmailError('');

    try {
      await subscribeEmail(email);
      setEmail('');
      setSubscribed(true);
      setError('');
      setTimeout(() => setSubscribed(false), 3000);
    } catch {
      setError('Ошибка подписки');
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) {
      setEmailError('');
    }
  };

  return (
    <footer className={styles.footer} id="contacts">
      <div className={styles.footer__top}>
        <div className={styles.footer__contacts}>
          <h2 className={styles.footer__title}>Свяжитесь с нами</h2>
          <div className={styles.footer__contact}>
            <img
              src={`${import.meta.env.BASE_URL}images/tel.svg`}
              alt=""
              className={styles.footer__icon}
            />
            <span className={styles.footer__text}>8 (800) 000 00 00</span>
          </div>
          <div className={styles.footer__contact}>
            <img
              src={`${import.meta.env.BASE_URL}images/mail.svg`}
              alt=""
              className={styles.footer__icon}
            />
            <span className={styles.footer__text}>inbox@mail.ru</span>
          </div>
          <div className={styles.footer__contact}>
            <img
              src={`${import.meta.env.BASE_URL}images/skype.svg`}
              alt=""
              className={styles.footer__icon}
            />
            <span className={styles.footer__text}>tu.train.tickets</span>
          </div>
          <div className={styles.footer__contact}>
            <img
              src={`${import.meta.env.BASE_URL}images/place.svg`}
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
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
            <button
              type="button"
              className={styles.footer__button}
              onClick={handleSubscribe}
            >
              отправить
            </button>
          </div>
          {emailError && <p className={styles.footer__error}>{emailError}</p>}
          {subscribed && (
            <p className={styles.footer__subtitle}>Вы подписаны!</p>
          )}
          {error && <p className={styles.footer__subtitle}>{error}</p>}
          <p className={styles.footer__social_title}>Подписывайтесь на нас</p>
          <div className={styles.footer__socials}>
            <img
              src={`${import.meta.env.BASE_URL}images/yotube.svg`}
              alt=""
              className={styles.footer__social}
            />
            <img
              src={`${import.meta.env.BASE_URL}images/in.svg`}
              alt=""
              className={styles.footer__social}
            />
            <img
              src={`${import.meta.env.BASE_URL}images/google.svg`}
              alt=""
              className={styles.footer__social}
            />
            <img
              src={`${import.meta.env.BASE_URL}images/facebook.svg`}
              alt=""
              className={styles.footer__social}
            />
            <img
              src={`${import.meta.env.BASE_URL}images/twiter.svg`}
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
            src={`${import.meta.env.BASE_URL}images/arrow-up.svg`}
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

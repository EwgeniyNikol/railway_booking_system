import { useEffect, useState } from 'react';
import styles from './PaymentCard.module.scss';

const NAME_REGEX = /^[А-Яа-яЁё\s-]*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formatPhoneDisplay = (digits: string): string => {
  if (!digits) return '';
  const d = digits.startsWith('7') ? digits.slice(1) : digits;
  const parts = ['+7'];
  if (d.length > 0) parts.push(d.slice(0, 3));
  if (d.length > 3) parts.push(d.slice(3, 6));
  if (d.length > 6) parts.push(d.slice(6, 8));
  if (d.length > 8) parts.push(d.slice(8, 10));
  return parts.join(' ');
};

type PaymentCardProps = {
  onValidityChange?: (isValid: boolean) => void;
};

const PaymentCard = ({ onValidityChange }: PaymentCardProps) => {
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [middleNameError, setMiddleNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const isValid =
      lastName.trim() !== '' &&
      NAME_REGEX.test(lastName) &&
      firstName.trim() !== '' &&
      NAME_REGEX.test(firstName) &&
      (!middleName || NAME_REGEX.test(middleName)) &&
      phone.length === 11 &&
      EMAIL_REGEX.test(email);

    if (onValidityChange) {
      onValidityChange(isValid);
    }
  }, [
    lastName,
    firstName,
    middleName,
    phone,
    email,
    onValidityChange,
  ]);

  const handleNameChange = (
    value: string,
    setter: (v: string) => void,
    errorSetter: (v: string) => void
  ) => {
    if (NAME_REGEX.test(value)) {
      setter(value);
      errorSetter('');
    } else {
      errorSetter('Только русские буквы');
    }
  };

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (!digits) {
      setPhone('');
      setPhoneError('');
      return;
    }
    const withCode = digits.startsWith('7') ? digits : `7${digits}`;
    setPhone(withCode.slice(0, 11));
    setPhoneError('');
  };

  const handlePhoneFocus = () => {
    if (!phone) {
      setPhone('7');
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value && !EMAIL_REGEX.test(value)) {
      setEmailError('Неверный e-mail');
    } else {
      setEmailError('');
    }
  };

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
            <input
              type="text"
              className={styles.paymentCard__input}
              value={lastName}
              onChange={(e) =>
                handleNameChange(e.target.value, setLastName, setLastNameError)
              }
            />
            {lastNameError && (
              <span className={styles.paymentCard__error}>{lastNameError}</span>
            )}
          </div>
          <div className={styles.paymentCard__field}>
            <span className={styles.paymentCard__label}>Имя</span>
            <input
              type="text"
              className={styles.paymentCard__input}
              value={firstName}
              onChange={(e) =>
                handleNameChange(
                  e.target.value,
                  setFirstName,
                  setFirstNameError
                )
              }
            />
            {firstNameError && (
              <span className={styles.paymentCard__error}>
                {firstNameError}
              </span>
            )}
          </div>
          <div className={styles.paymentCard__field}>
            <span className={styles.paymentCard__label}>Отчество</span>
            <input
              type="text"
              className={styles.paymentCard__input}
              value={middleName}
              onChange={(e) =>
                handleNameChange(
                  e.target.value,
                  setMiddleName,
                  setMiddleNameError
                )
              }
            />
            {middleNameError && (
              <span className={styles.paymentCard__error}>
                {middleNameError}
              </span>
            )}
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
            value={formatPhoneDisplay(phone)}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onFocus={handlePhoneFocus}
          />
          {phoneError && (
            <span className={styles.paymentCard__error}>{phoneError}</span>
          )}
        </div>

        <div className={styles.paymentCard__field}>
          <span className={styles.paymentCard__label}>E-mail</span>
          <input
            type="text"
            placeholder="inbox@gmail.ru"
            className={`${styles.paymentCard__input} ${styles.paymentCard__input_wide}`}
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          {emailError && (
            <span className={styles.paymentCard__error}>{emailError}</span>
          )}
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
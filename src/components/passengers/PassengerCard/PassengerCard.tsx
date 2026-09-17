import { useState } from 'react';
import styles from './PassengerCard.module.scss';

type PassengerCardProps = {
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
};

const NAME_REGEX = /^[А-Яа-яЁё\s-]*$/;

const formatDate = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  const parts = [];
  if (digits.length > 0) parts.push(digits.slice(0, 2));
  if (digits.length > 2) parts.push(digits.slice(2, 4));
  if (digits.length > 4) parts.push(digits.slice(4, 8));
  return parts.join('/');
};

const validateDate = (value: string): string => {
  const parts = value.split('/');
  if (parts[0] && parts[0].length === 2) {
    const day = Number(parts[0]);
    if (day < 1 || day > 31) return 'Неверная дата';
  }
  if (parts[1] && parts[1].length === 2) {
    const month = Number(parts[1]);
    if (month < 1 || month > 12) return 'Неверная дата';
  }
  if (value.length === 10) {
    const [day, month, year] = value.split('/').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) return 'Неверная дата';
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    if (age < 0 || age > 120) return 'Неверная дата';
  }
  return '';
};

const getAge = (value: string): number => {
  const [day, month, year] = value.split('/').map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

const PassengerCard = ({ index, isExpanded, onToggle }: PassengerCardProps) => {
  const [gender, setGender] = useState<'m' | 'f'>('m');
  const [passengerType, setPassengerType] = useState<'adult' | 'child'>(
    'adult'
  );
  const [documentType, setDocumentType] = useState('passport');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [passportSeries, setPassportSeries] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [middleNameError, setMiddleNameError] = useState('');
  const [birthDateError, setBirthDateError] = useState('');
  const [passportSeriesError, setPassportSeriesError] = useState('');
  const [passportNumberError, setPassportNumberError] = useState('');

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

  const handleBirthDateChange = (value: string) => {
    const formatted = formatDate(value);
    setBirthDate(formatted);
    const error = validateDate(formatted);
    setBirthDateError(error);
    if (!error && formatted.length === 10) {
      const age = getAge(formatted);
      const type = age < 18 ? 'child' : 'adult';
      setPassengerType(type);
      setDocumentType(type === 'adult' ? 'passport' : 'birth');
    }
  };

  const handleSeriesChange = (value: string) => {
    if (!/^\d*$/.test(value)) {
      setPassportSeriesError('Неверная серия');
      return;
    }
    setPassportSeries(value.slice(0, 4));
    setPassportSeriesError('');
  };

  const handleNumberChange = (value: string) => {
    if (documentType === 'birth') {
      setPassportNumber(value);
      setPassportNumberError('');
      return;
    }
    if (!/^\d*$/.test(value)) {
      setPassportNumberError('Неверный номер');
      return;
    }
    setPassportNumber(value.slice(0, 6));
    setPassportNumberError('');
  };

  const handlePassengerTypeChange = (value: 'adult' | 'child') => {
    setPassengerType(value);
    setDocumentType(value === 'adult' ? 'passport' : 'birth');
    setBirthDate('');
    setBirthDateError('');
    setPassportNumber('');
    setPassportSeries('');
    setPassportNumberError('');
    setPassportSeriesError('');
  };

  const handleDocumentTypeChange = (value: string) => {
    setDocumentType(value);
    setPassengerType(value === 'passport' ? 'adult' : 'child');
    setPassportNumber('');
    setPassportSeries('');
    setPassportNumberError('');
    setPassportSeriesError('');
  };

  return (
    <div className={styles.passengerCard}>
      <div className={styles.passengerCard__header}>
        <button
          type="button"
          className={styles.passengerCard__toggle}
          onClick={onToggle}
        >
          <svg viewBox="0 0 32 32" width="32" height="32">
            <circle
              cx="16"
              cy="16"
              r="15"
              fill="none"
              stroke="#928F94"
              strokeWidth="2"
            />
            <line
              x1="10"
              y1="16"
              x2="22"
              y2="16"
              stroke="#928F94"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {!isExpanded && (
              <line
                x1="16"
                y1="10"
                x2="16"
                y2="22"
                stroke="#928F94"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
        <span className={styles.passengerCard__title}>
          Пассажир {index + 1}
        </span>
        <button type="button" className={styles.passengerCard__close}>
          <svg viewBox="0 0 12 12" width="12" height="12">
            <line
              x1="1"
              y1="1"
              x2="11"
              y2="11"
              stroke="#292929"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="11"
              y1="1"
              x2="1"
              y2="11"
              stroke="#292929"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className={styles.passengerCard__content}>
          <div className={styles.passengerCard__divider} />

          <select
            className={styles.passengerCard__select}
            value={passengerType}
            onChange={(e) =>
              handlePassengerTypeChange(e.target.value as 'adult' | 'child')
            }
          >
            <option value="adult">Взрослый</option>
            <option value="child">Детский</option>
          </select>

          <div className={styles.passengerCard__row}>
            <div className={styles.passengerCard__field}>
              <span className={styles.passengerCard__label}>Фамилия</span>
              <input
                type="text"
                className={styles.passengerCard__input}
                value={lastName}
                onChange={(e) =>
                  handleNameChange(
                    e.target.value,
                    setLastName,
                    setLastNameError
                  )
                }
              />
              {lastNameError && (
                <span className={styles.passengerCard__error}>
                  {lastNameError}
                </span>
              )}
            </div>
            <div className={styles.passengerCard__field}>
              <span className={styles.passengerCard__label}>Имя</span>
              <input
                type="text"
                className={styles.passengerCard__input}
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
                <span className={styles.passengerCard__error}>
                  {firstNameError}
                </span>
              )}
            </div>
            <div className={styles.passengerCard__field}>
              <span className={styles.passengerCard__label}>Отчество</span>
              <input
                type="text"
                className={styles.passengerCard__input}
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
                <span className={styles.passengerCard__error}>
                  {middleNameError}
                </span>
              )}
            </div>
          </div>

          <div className={styles.passengerCard__row}>
            <div className={styles.passengerCard__field}>
              <span className={styles.passengerCard__label}>Пол</span>
              <div className={styles.passengerCard__gender}>
                <button
                  type="button"
                  className={`${styles.passengerCard__genderBtn} ${
                    gender === 'm' ? styles.passengerCard__genderBtn_active : ''
                  }`}
                  onClick={() => setGender('m')}
                >
                  м
                </button>
                <button
                  type="button"
                  className={`${styles.passengerCard__genderBtn} ${
                    gender === 'f' ? styles.passengerCard__genderBtn_active : ''
                  }`}
                  onClick={() => setGender('f')}
                >
                  ж
                </button>
              </div>
            </div>
            <div className={styles.passengerCard__field}>
              <span className={styles.passengerCard__label}>Дата рождения</span>
              <input
                type="text"
                placeholder="ДД/ММ/ГГГГ"
                className={styles.passengerCard__input}
                value={birthDate}
                onChange={(e) => handleBirthDateChange(e.target.value)}
              />
              {birthDateError && (
                <span className={styles.passengerCard__error}>
                  {birthDateError}
                </span>
              )}
            </div>
          </div>

          <label className={styles.passengerCard__mobility}>
            <input type="checkbox" className={styles.passengerCard__checkbox} />
            <span className={styles.passengerCard__mobilityText}>
              ограниченная подвижность
            </span>
          </label>

          <div className={styles.passengerCard__divider} />

          <div className={styles.passengerCard__row}>
            <div className={styles.passengerCard__field}>
              <span className={styles.passengerCard__label}>Тип документа</span>
              <select
                className={`${styles.passengerCard__select} ${
                  documentType === 'birth'
                    ? styles.passengerCard__select_wide
                    : styles.passengerCard__select_short
                }`}
                value={documentType}
                onChange={(e) => handleDocumentTypeChange(e.target.value)}
              >
                <option value="passport">Паспорт РФ</option>
                <option value="birth">Свидетельство о рождении</option>
              </select>
            </div>
            {documentType === 'passport' && (
              <div className={styles.passengerCard__field}>
                <span className={styles.passengerCard__label}>Серия</span>
                <input
                  type="text"
                  className={`${styles.passengerCard__input} ${styles.passengerCard__input_short}`}
                  value={passportSeries}
                  onChange={(e) => handleSeriesChange(e.target.value)}
                />
                {passportSeriesError && (
                  <span className={styles.passengerCard__error}>
                    {passportSeriesError}
                  </span>
                )}
              </div>
            )}
            <div className={styles.passengerCard__field}>
              <span className={styles.passengerCard__label}>Номер</span>
              <input
                type="text"
                className={`${styles.passengerCard__input} ${
                  documentType === 'birth'
                    ? styles.passengerCard__input_wide
                    : styles.passengerCard__input_short
                }`}
                value={passportNumber}
                onChange={(e) => handleNumberChange(e.target.value)}
              />
              {passportNumberError && (
                <span className={styles.passengerCard__error}>
                  {passportNumberError}
                </span>
              )}
            </div>
          </div>

          <div className={styles.passengerCard__divider} />

          <button type="button" className={styles.passengerCard__next}>
            Следующий пассажир
          </button>
        </div>
      )}
    </div>
  );
};

export default PassengerCard;

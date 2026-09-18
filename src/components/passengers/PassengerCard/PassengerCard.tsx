import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import {
  updatePassenger,
  type Passenger,
} from '../../../store/slices/bookingSlice';
import styles from './PassengerCard.module.scss';

type PassengerCardProps = {
  passengerId: string;
  index: number;
  defaultExpanded: boolean;
  onRemove: () => void;
  onNext: () => void;
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

const PassengerCard = ({
  passengerId,
  index,
  defaultExpanded,
  onRemove,
  onNext,
}: PassengerCardProps) => {
  const dispatch = useDispatch();
  const passenger = useSelector((state: RootState) =>
    state.booking.passengers.find((p) => p.passengerId === passengerId)
  );
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [lastNameError, setLastNameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [middleNameError, setMiddleNameError] = useState('');
  const [birthDateError, setBirthDateError] = useState('');
  const [passportSeriesError, setPassportSeriesError] = useState('');
  const [passportNumberError, setPassportNumberError] = useState('');

  if (!passenger) {
    return null;
  }

  const update = (data: Partial<Passenger>) => {
    dispatch(updatePassenger({ passengerId, data }));
  };

  const handleNameChange = (
    value: string,
    field: 'lastName' | 'firstName' | 'patronymic',
    errorSetter: (v: string) => void
  ) => {
    if (NAME_REGEX.test(value)) {
      update({ [field]: value } as Partial<Passenger>);
      errorSetter('');
    } else {
      errorSetter('Только русские буквы');
    }
  };

  const handleBirthDateChange = (value: string) => {
    const formatted = formatDate(value);
    const error = validateDate(formatted);
    setBirthDateError(error);
    if (!error && formatted.length === 10) {
      const age = getAge(formatted);
      const isAdult = age >= 18;
      update({
        birthday: formatted,
        isAdult,
        isChild: !isAdult,
        documentType: isAdult ? 'passport' : 'birth',
      });
      return;
    }
    update({ birthday: formatted });
  };

  const handleSeriesChange = (value: string) => {
    if (!/^\d*$/.test(value)) {
      setPassportSeriesError('Неверная серия');
      return;
    }
    const currentNumber = passenger.documentData.slice(4, 10);
    update({ documentData: value.slice(0, 4) + currentNumber });
    setPassportSeriesError('');
  };

  const handleNumberChange = (value: string) => {
    if (passenger.documentType === 'birth') {
      update({ documentData: value });
      setPassportNumberError('');
      return;
    }
    if (!/^\d*$/.test(value)) {
      setPassportNumberError('Неверный номер');
      return;
    }
    const currentSeries = passenger.documentData.slice(0, 4);
    update({ documentData: currentSeries + value.slice(0, 6) });
    setPassportNumberError('');
  };

  const handlePassengerTypeChange = (value: 'adult' | 'child') => {
    update({
      isAdult: value === 'adult',
      isChild: value === 'child',
      documentType: value === 'adult' ? 'passport' : 'birth',
      birthday: '',
      documentData: '',
    });
    setBirthDateError('');
    setPassportNumberError('');
    setPassportSeriesError('');
  };

  const handleDocumentTypeChange = (value: string) => {
    update({
      documentType: value,
      isAdult: value === 'passport',
      isChild: value !== 'passport',
      documentData: '',
    });
    setPassportNumberError('');
    setPassportSeriesError('');
  };

  const series = passenger.documentData.slice(0, 4);
  const number =
    passenger.documentType === 'birth'
      ? passenger.documentData
      : passenger.documentData.slice(4, 10);

  return (
    <div className={styles.passengerCard}>
      <div className={styles.passengerCard__header}>
        <button
          type="button"
          className={styles.passengerCard__toggle}
          onClick={() => setIsExpanded(!isExpanded)}
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
        <button
          type="button"
          className={styles.passengerCard__close}
          onClick={onRemove}
        >
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
            value={passenger.isAdult ? 'adult' : 'child'}
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
                value={passenger.lastName}
                onChange={(e) =>
                  handleNameChange(e.target.value, 'lastName', setLastNameError)
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
                value={passenger.firstName}
                onChange={(e) =>
                  handleNameChange(
                    e.target.value,
                    'firstName',
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
                value={passenger.patronymic}
                onChange={(e) =>
                  handleNameChange(
                    e.target.value,
                    'patronymic',
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
                    passenger.gender
                      ? styles.passengerCard__genderBtn_active
                      : ''
                  }`}
                  onClick={() => update({ gender: true })}
                >
                  м
                </button>
                <button
                  type="button"
                  className={`${styles.passengerCard__genderBtn} ${
                    !passenger.gender
                      ? styles.passengerCard__genderBtn_active
                      : ''
                  }`}
                  onClick={() => update({ gender: false })}
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
                value={passenger.birthday}
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
                  passenger.documentType === 'birth'
                    ? styles.passengerCard__select_wide
                    : styles.passengerCard__select_short
                }`}
                value={passenger.documentType}
                onChange={(e) => handleDocumentTypeChange(e.target.value)}
              >
                <option value="passport">Паспорт РФ</option>
                <option value="birth">Свидетельство о рождении</option>
              </select>
            </div>
            {passenger.documentType === 'passport' && (
              <div className={styles.passengerCard__field}>
                <span className={styles.passengerCard__label}>Серия</span>
                <input
                  type="text"
                  className={`${styles.passengerCard__input} ${styles.passengerCard__input_short}`}
                  value={series}
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
                  passenger.documentType === 'birth'
                    ? styles.passengerCard__input_wide
                    : styles.passengerCard__input_short
                }`}
                value={number}
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

          <button
            type="button"
            className={styles.passengerCard__next}
            onClick={onNext}
          >
            Следующий пассажир
          </button>
        </div>
      )}
    </div>
  );
};

export default PassengerCard;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import {
  setPassengerCount,
  togglePassengerCollapsed,
  updatePassenger,
  type Passenger,
} from '../../../store/slices/bookingSlice';
import { formatDate } from '../../../utils/format';
import { getAge, validatePassenger } from '../../../utils/validation';
import styles from './PassengerCard.module.scss';

type PassengerCardProps = {
  passengerId: string;
  index: number;
  isActive: boolean;
  onNext: () => void;
  onActivate: () => void;
  onRemove: () => void;
};

const NAME_REGEX = /^[А-Яа-яЁё\s-]*$/;

const PassengerCard = ({
  passengerId,
  index,
  isActive,
  onNext,
  onActivate,
  onRemove,
}: PassengerCardProps) => {
  const dispatch = useDispatch();
  const passenger = useSelector((state: RootState) =>
    state.booking.passengers.find((p) => p.passengerId === passengerId)
  );
  const passengerCount = useSelector(
    (state: RootState) => state.booking.passengerCount
  );
  const [birthDateError, setBirthDateError] = useState('');
  const [passportSeriesError, setPassportSeriesError] = useState('');
  const [passportNumberError, setPassportNumberError] = useState('');

  if (!passenger) {
    return null;
  }

  const errors = validatePassenger(passenger);
  const isValid = errors.length === 0;
  const firstError = errors[0]?.message ?? '';

  const update = (data: Partial<Passenger>) => {
    dispatch(updatePassenger({ passengerId, data }));
  };

  const handleHeaderClick = () => {
    onActivate();
    if (passenger.isCollapsed) {
      dispatch(togglePassengerCollapsed(passengerId));
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onActivate();
    dispatch(togglePassengerCollapsed(passengerId));
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  const handleNameChange = (field: keyof Passenger, value: string) => {
    if (NAME_REGEX.test(value)) {
      update({ [field]: value } as Partial<Passenger>);
    }
  };

  const handleBirthDateChange = (value: string) => {
    const formatted = formatDate(value);
    const age = getAge(formatted);
    const wasAdult = passenger.isAdult;

    if (age !== null) {
      const isAdult = age >= 18;

      update({
        birthday: formatted,
        isAdult,
        isChild: !isAdult,
        documentType: isAdult ? 'passport' : 'birth',
        documentData: '',
      });

      if (wasAdult !== isAdult) {
        dispatch(
          setPassengerCount({
            adults: isAdult
              ? passengerCount.adults + 1
              : Math.max(0, passengerCount.adults - 1),
            children: isAdult
              ? Math.max(0, passengerCount.children - 1)
              : passengerCount.children + 1,
          })
        );
      }
    } else {
      update({ birthday: formatted });
    }

    setBirthDateError('');
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
    const wasAdult = passenger.isAdult;
    const willBeAdult = value === 'adult';

    if (wasAdult === willBeAdult) return;

    update({
      isAdult: willBeAdult,
      isChild: !willBeAdult,
      documentType: willBeAdult ? 'passport' : 'birth',
      birthday: '',
      documentData: '',
    });

    dispatch(
      setPassengerCount({
        adults: willBeAdult
          ? passengerCount.adults + 1
          : Math.max(0, passengerCount.adults - 1),
        children: willBeAdult
          ? Math.max(0, passengerCount.children - 1)
          : passengerCount.children + 1,
      })
    );

    setBirthDateError('');
    setPassportNumberError('');
    setPassportSeriesError('');
  };

  const handleDocumentTypeChange = (value: string) => {
    const wasAdult = passenger.isAdult;
    const willBeAdult = value === 'passport';

    update({
      documentType: value,
      isAdult: willBeAdult,
      isChild: !willBeAdult,
      documentData: '',
    });

    if (wasAdult !== willBeAdult) {
      dispatch(
        setPassengerCount({
          adults: willBeAdult
            ? passengerCount.adults + 1
            : Math.max(0, passengerCount.adults - 1),
          children: willBeAdult
            ? Math.max(0, passengerCount.children - 1)
            : passengerCount.children + 1,
        })
      );
    }

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
      <div className={styles.passengerCard__header} onClick={handleHeaderClick}>
        <button
          type="button"
          className={styles.passengerCard__toggle}
          onClick={handleToggle}
        >
          <svg viewBox="0 0 32 32" width="32" height="32">
            <circle
              cx="16"
              cy="16"
              r="15"
              fill="none"
              stroke="#FFA800"
              strokeWidth="2"
            />
            <line
              x1="10"
              y1="16"
              x2="22"
              y2="16"
              stroke="#FFA800"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {passenger.isCollapsed && (
              <line
                x1="16"
                y1="10"
                x2="16"
                y2="22"
                stroke="#FFA800"
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
          onClick={handleRemove}
        >
          <svg viewBox="0 0 12 12" width="12" height="12">
            <line
              x1="1"
              y1="1"
              x2="11"
              y2="11"
              stroke="#928F94"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="11"
              y1="1"
              x2="1"
              y2="11"
              stroke="#928F94"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {!passenger.isCollapsed && (
        <>
          <div className={styles.passengerCard__content}>
            <div className={styles.passengerCard__divider} />

            <select
              className={styles.passengerCard__select}
              value={passenger.isAdult ? 'adult' : 'child'}
              onChange={(e) =>
                handlePassengerTypeChange(e.target.value as 'adult' | 'child')
              }
              disabled={!isActive}
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
                  onChange={(e) => handleNameChange('lastName', e.target.value)}
                  disabled={!isActive}
                />
              </div>
              <div className={styles.passengerCard__field}>
                <span className={styles.passengerCard__label}>Имя</span>
                <input
                  type="text"
                  className={styles.passengerCard__input}
                  value={passenger.firstName}
                  onChange={(e) =>
                    handleNameChange('firstName', e.target.value)
                  }
                  disabled={!isActive}
                />
              </div>
              <div className={styles.passengerCard__field}>
                <span className={styles.passengerCard__label}>Отчество</span>
                <input
                  type="text"
                  className={styles.passengerCard__input}
                  value={passenger.patronymic}
                  onChange={(e) =>
                    handleNameChange('patronymic', e.target.value)
                  }
                  disabled={!isActive}
                />
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
                    disabled={!isActive}
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
                    disabled={!isActive}
                  >
                    ж
                  </button>
                </div>
              </div>
              <div className={styles.passengerCard__field}>
                <span className={styles.passengerCard__label}>
                  Дата рождения
                </span>
                <input
                  type="text"
                  placeholder="ДД/ММ/ГГГГ"
                  className={styles.passengerCard__input}
                  value={passenger.birthday}
                  onChange={(e) => handleBirthDateChange(e.target.value)}
                  disabled={!isActive}
                />
                {birthDateError && (
                  <span className={styles.passengerCard__error}>
                    {birthDateError}
                  </span>
                )}
              </div>
            </div>

            <label className={styles.passengerCard__mobility}>
              <input
                type="checkbox"
                className={styles.passengerCard__checkbox}
                disabled={!isActive}
              />
              <span className={styles.passengerCard__mobilityText}>
                ограниченная подвижность
              </span>
            </label>

            <div className={styles.passengerCard__divider} />

            <div className={styles.passengerCard__row}>
              <div className={styles.passengerCard__field}>
                <span className={styles.passengerCard__label}>
                  Тип документа
                </span>
                <select
                  className={`${styles.passengerCard__select} ${
                    passenger.documentType === 'birth'
                      ? styles.passengerCard__select_wide
                      : styles.passengerCard__select_short
                  }`}
                  value={passenger.documentType}
                  onChange={(e) => handleDocumentTypeChange(e.target.value)}
                  disabled={!isActive}
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
                    disabled={!isActive}
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
                  disabled={!isActive}
                />
                {passportNumberError && (
                  <span className={styles.passengerCard__error}>
                    {passportNumberError}
                  </span>
                )}
              </div>
            </div>
          </div>

          {isActive && (
            <div
              className={`${styles.passengerCard__status} ${
                isValid
                  ? styles.passengerCard__status_success
                  : styles.passengerCard__status_error
              }`}
            >
              <div className={styles.passengerCard__statusIcon}>
                <img
                  src={
                    isValid
                      ? `${import.meta.env.BASE_URL}images/icon-success-check.svg`
                      : `${import.meta.env.BASE_URL}images/icon-success-error.svg`
                  }
                  alt=""
                  className={styles.passengerCard__statusSvg}
                />
              </div>
              {isValid ? (
                <>
                  <span className={styles.passengerCard__statusText}>
                    Готово
                  </span>
                  <button
                    type="button"
                    className={styles.passengerCard__next}
                    onClick={onNext}
                  >
                    Следующий пассажир
                  </button>
                </>
              ) : (
                <span className={styles.passengerCard__statusError}>
                  {firstError}
                </span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PassengerCard;
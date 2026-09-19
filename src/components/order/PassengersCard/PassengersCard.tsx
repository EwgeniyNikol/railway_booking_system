import styles from './PassengersCard.module.scss';

const formatBirthday = (value: string): string => {
  return value.replace(/\//g, '.');
};

const formatDocument = (type: string, data: string): string => {
  if (type === 'passport') {
    const series = data.slice(0, 4);
    const number = data.slice(4, 10);
    return `Паспорт РФ ${series} ${number}`.trim();
  }
  return `Свидетельство о рождении ${data}`;
};

const testPassengers = [
  {
    passengerId: 'test-1',
    firstName: 'Ирина',
    lastName: 'Мартынюк',
    patronymic: 'Эдуардовна',
    gender: false,
    birthday: '17/02/1985',
    documentType: 'passport',
    documentData: '4204380694',
    isAdult: true,
  },
  {
    passengerId: 'test-2',
    firstName: 'Кирилл',
    lastName: 'Мартынюк',
    patronymic: 'Сергеевич',
    gender: true,
    birthday: '25/01/2006',
    documentType: 'birth',
    documentData: 'VIII УН 256319',
    isAdult: false,
  },
  {
    passengerId: 'test-3',
    firstName: 'Сергей',
    lastName: 'Мартынюк',
    patronymic: 'Петрович',
    gender: true,
    birthday: '19/06/1982',
    documentType: 'passport',
    documentData: '4204380694',
    isAdult: true,
  },
];

const testTotal = '7 760';

const PassengersCard = () => {
  const passengers = testPassengers;

  return (
    <div className={styles.passengersCard}>
      <div className={styles.passengersCard__header}>
        <h2 className={styles.passengersCard__title}>Пассажиры</h2>
      </div>

      <div className={styles.passengersCard__body}>
        <div className={styles.passengersCard__list}>
          {passengers.map((passenger, index) => (
            <div key={passenger.passengerId}>
              {index > 0 && (
                <div className={styles.passengersCard__innerDivider} />
              )}
              <div className={styles.passengersCard__item}>
                <div className={styles.passengersCard__left}>
                  <img
                    src="/src/images/icon-user.svg"
                    alt=""
                    className={styles.passengersCard__icon}
                  />
                  <span className={styles.passengersCard__type}>
                    {passenger.isAdult ? 'Взрослый' : 'Детский'}
                  </span>
                </div>
                <div className={styles.passengersCard__info}>
                  <span className={styles.passengersCard__name}>
                    {passenger.lastName} {passenger.firstName}{' '}
                    {passenger.patronymic}
                  </span>
                  <span className={styles.passengersCard__detail}>
                    Пол {passenger.gender ? 'мужской' : 'женский'}
                  </span>
                  <span className={styles.passengersCard__detail}>
                    Дата рождения {formatBirthday(passenger.birthday)}
                  </span>
                  <span className={styles.passengersCard__detail}>
                    {formatDocument(
                      passenger.documentType,
                      passenger.documentData
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.passengersCard__aside}>
          <div className={styles.passengersCard__total}>
            <span className={styles.passengersCard__totalLabel}>Всего</span>
            <span className={styles.passengersCard__totalSum}>
              {testTotal}
            </span>
            <img
              src="/src/images/icon-ruble.svg"
              alt=""
              className={styles.passengersCard__totalCurrency}
            />
          </div>
          <button type="button" className={styles.passengersCard__change}>
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengersCard;
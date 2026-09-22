import styles from './ProgressSteps.module.scss';

type ProgressStepsProps = {
  activeStep: number;
};

const steps = ['Билеты', 'Пассажиры', 'Оплата', 'Проверка'];

const ProgressSteps = ({ activeStep }: ProgressStepsProps) => {
  return (
    <div className={styles.progress}>
      {steps.map((label, index) => (
        <div key={label} className={styles.progress__wrapper}>
          <div
            className={`${styles.progress__step} ${
              index < activeStep ? styles.progress__step_passed : ''
            } ${index === activeStep ? styles.progress__step_active : ''}`}
          >
            <span className={styles.progress__number}>{index + 1}</span>
            <span className={styles.progress__label}>{label}</span>
          </div>
          {index > activeStep && index < steps.length - 1 && (
            <img
              src={`${import.meta.env.BASE_URL}images/strel.svg`}
              alt=""
              className={styles.progress__arrow}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;

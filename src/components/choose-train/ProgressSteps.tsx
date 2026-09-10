import { useState } from 'react';
import styles from './ProgressSteps.module.scss';

const steps = ['Билеты', 'Пассажиры', 'Оплата', 'Проверка'];

const ProgressSteps = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className={styles.progress}>
      {steps.map((label, index) => (
        <div key={label} className={styles.progress__wrapper}>
          <div
            className={`${styles.progress__step} ${
              index === activeStep ? styles.progress__step_active : ''
            }`}
            onClick={() => setActiveStep(index)}
          >
            <span className={styles.progress__number}>{index + 1}</span>
            <span className={styles.progress__label}>{label}</span>
          </div>
          {index > 0 && index < steps.length - 1 && (
            <img
              src="/src/images/strel.svg"
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

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTrain from '../components/choose-train/HeaderTrain/HeaderTrain';
import ProgressSteps from '../components/choose-train/ProgressSteps/ProgressSteps';
import TripDetails from '../components/passengers/TripDetails/TripDetails';
import PassengerCard from '../components/passengers/PassengerCard/PassengerCard';
import NextButton from '../components/common/NextButton/NextButton';
import Footer from '../components/Footer/Footer';
import { addPassenger, initPassengers } from '../store/slices/bookingSlice';
import type { RootState } from '../store/store';
import { validatePassenger } from '../utils/validation';
import styles from './PassengersPage.module.scss';

const PassengersPage = () => {
  const dispatch = useDispatch();
  const passengers = useSelector(
    (state: RootState) => state.booking.passengers
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(initPassengers());
  }, [dispatch]);

  const handleNext = () => {
    if (activeIndex < passengers.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handleAddPassenger = () => {
    dispatch(addPassenger());
  };

  const allValid = passengers.every((p) => validatePassenger(p).length === 0);

  return (
    <>
      <HeaderTrain />
      <ProgressSteps activeStep={1} />
      <div className={styles.page}>
        <div className={styles.page__sidebar}>
          <TripDetails />
        </div>
        <div className={styles.page__content}>
          {passengers.map((p, i) => (
            <PassengerCard
              key={p.passengerId}
              passengerId={p.passengerId}
              index={i}
              isActive={i === activeIndex}
              onNext={handleNext}
              onActivate={() => setActiveIndex(i)}
            />
          ))}
          <button
            type="button"
            className={styles.page__addPassenger}
            onClick={handleAddPassenger}
          >
            <span className={styles.page__addPassengerText}>
              Добавить пассажира
            </span>
            <svg viewBox="0 0 16 16" width="12.79" height="12.79">
              <line
                x1="8"
                y1="1"
                x2="8"
                y2="15"
                stroke="#FFA800"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="1"
                y1="8"
                x2="15"
                y2="8"
                stroke="#FFA800"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {allValid && (
            <div className={styles.page__next}>
              <NextButton to="/payment" />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PassengersPage;
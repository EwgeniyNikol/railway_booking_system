import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTrain from '../components/choose-train/HeaderTrain/HeaderTrain';
import ProgressSteps from '../components/choose-train/ProgressSteps/ProgressSteps';
import TripDetails from '../components/passengers/TripDetails/TripDetails';
import PassengerCard from '../components/passengers/PassengerCard/PassengerCard';
import NextButton from '../components/common/NextButton/NextButton';
import Footer from '../components/Footer/Footer';
import {
  initPassengers,
  removePassenger,
  setPassengerCount,
} from '../store/slices/bookingSlice';
import type { RootState } from '../store/store';
import styles from './PassengersPage.module.scss';

const PassengersPage = () => {
  const dispatch = useDispatch();
  const passengers = useSelector(
    (state: RootState) => state.booking.passengers
  );
  const passengerCount = useSelector(
    (state: RootState) => state.booking.passengerCount
  );

  useEffect(() => {
    dispatch(initPassengers());
  }, [dispatch]);

  const handleRemove = (id: string) => {
    dispatch(removePassenger(id));
  };

  const handleNext = () => {
    dispatch(
      setPassengerCount({
        children: passengerCount.children + 1,
      })
    );
  };

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
              defaultExpanded={i < 2}
              onRemove={() => handleRemove(p.passengerId)}
              onNext={handleNext}
            />
          ))}
          <div className={styles.page__next}>
            <NextButton to="/payment" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PassengersPage;

import { useEffect, useState } from 'react';
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
  togglePlace,
  updatePassenger,
  type Passenger,
} from '../store/slices/bookingSlice';
import { getSeatType, getSeatPrice } from '../utils/seatType';
import type { RootState } from '../store/store';
import { validatePassenger } from '../utils/validation';
import styles from './PassengersPage.module.scss';

type CoachClass = 'first' | 'second' | 'third' | 'fourth';

const PassengersPage = () => {
  const dispatch = useDispatch();
  const passengers = useSelector(
    (state: RootState) => state.booking.passengers
  );
  const passengerCount = useSelector(
    (state: RootState) => state.booking.passengerCount
  );
  const selectedPlaces = useSelector(
    (state: RootState) => state.booking.selectedPlaces
  );
  const seats = useSelector((state: RootState) => state.booking.seats);
  const returnSeats = useSelector(
    (state: RootState) => state.booking.returnSeats
  );
  const selectedReturnRoute = useSelector(
    (state: RootState) => state.booking.selectedReturnRoute
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(initPassengers());
  }, [dispatch]);

  useEffect(() => {
    if (passengers.length === 0) return;

    const forwardPlaces = [...selectedPlaces]
      .filter((p) => p.direction === 'forward')
      .sort((a, b) => a.seatNumber - b.seatNumber);

    const backPlaces = [...selectedPlaces]
      .filter((p) => p.direction === 'back')
      .sort((a, b) => a.seatNumber - b.seatNumber);

    const usedForward = new Set(
      passengers.map((p) => p.placeId).filter(Boolean) as string[]
    );
    const usedBack = new Set(
      passengers.map((p) => p.returnPlaceId).filter(Boolean) as string[]
    );

    const freeForward = forwardPlaces.filter((p) => !usedForward.has(p.id));
    const freeBack = backPlaces.filter((p) => !usedBack.has(p.id));

    let fIdx = 0;
    let bIdx = 0;

    passengers.forEach((passenger) => {
      const updates: Partial<Passenger> = {};

      if (!passenger.placeId && freeForward[fIdx]) {
        updates.placeId = freeForward[fIdx].id;
        fIdx += 1;
      }
      if (!passenger.returnPlaceId && freeBack[bIdx]) {
        updates.returnPlaceId = freeBack[bIdx].id;
        bIdx += 1;
      }

      if (Object.keys(updates).length > 0) {
        dispatch(
          updatePassenger({
            passengerId: passenger.passengerId,
            data: updates,
          })
        );
      }
    });
  }, [dispatch, passengers, selectedPlaces]);

  const handleNext = () => {
    if (activeIndex < passengers.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const findFreePlace = (
    coaches: typeof seats,
    direction: 'forward' | 'back'
  ) => {
    for (const item of coaches) {
      const coach = item.coach;
      const takenSeats = selectedPlaces
        .filter((p) => p.coachId === coach._id && p.direction === direction)
        .map((p) => p.seatNumber);

      for (const seat of item.seats) {
        if (seat.available && !takenSeats.includes(seat.index)) {
          const seatType = getSeatType(seat.index, coach.class_type);
          const price = getSeatPrice(coach, seatType);

          return {
            id: crypto.randomUUID(),
            coachId: coach._id,
            seatNumber: seat.index,
            classType: coach.class_type as CoachClass,
            price,
            direction,
            linensPrice: coach.linens_price,
            wifiPrice: coach.wifi_price,
            airConditioningPrice: coach.air_conditioning_price ?? 0,
            isLinensIncluded: coach.is_linens_included,
          };
        }
      }
    }
    return null;
  };

  const handleAddPassenger = () => {
    if (passengerCount.adults >= 4) return;

    const forwardPlace = findFreePlace(seats, 'forward');
    if (!forwardPlace) return;

    let returnPlace = null;
    if (selectedReturnRoute) {
      returnPlace = findFreePlace(returnSeats, 'back');
    }

    dispatch(setPassengerCount({ adults: passengerCount.adults + 1 }));

    dispatch(togglePlace(forwardPlace));

    if (returnPlace) {
      dispatch(togglePlace(returnPlace));
    }
  };

  const handleRemove = (index: number) => {
    dispatch(removePassenger(passengers[index].passengerId));
    if (index <= activeIndex) {
      setActiveIndex(Math.max(0, activeIndex - 1));
    }
  };

  const allValid =
    passengers.length > 0 &&
    passengers.every((p) => validatePassenger(p).length === 0);

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
              onRemove={() => handleRemove(i)}
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
          <div className={styles.page__next}>
            <NextButton to="/payment" disabled={!allValid} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PassengersPage;

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import HeaderTrain from '../components/choose-train/HeaderTrain/HeaderTrain';
import ProgressSteps from '../components/choose-train/ProgressSteps/ProgressSteps';
import Sidebar from '../components/choose-train/Sidebar/Sidebar';
import LastTickets from '../components/choose-train/LastTickets/LastTickets';
import PageTitle from '../components/choose-seats/PageTitle/PageTitle';
import ChooseSeatsCard from '../components/choose-seats/ChooseSeatsCard/ChooseSeatsCard';
import ChooseAnotherButton from '../components/choose-seats/ChooseAnotherButton/ChooseAnotherButton';
import RouteInfo from '../components/choose-seats/RouteInfo/RouteInfo';
import PassengerCount from '../components/choose-seats/PassengerCount/PassengerCount';
import CarTypeSelect from '../components/choose-seats/CarTypeSelect/CarTypeSelect';
import SeatsBlock from '../components/choose-seats/SeatsBlock/SeatsBlock';
import NextButton from '../components/common/NextButton/NextButton';
import Footer from '../components/Footer/Footer';
import { getSeats, getReturnSeats } from '../store/slices/bookingSlice';
import type { RootState, AppDispatch } from '../store/store';
import styles from './ChooseSeatsPage.module.scss';

type CoachClass = 'first' | 'second' | 'third' | 'fourth';

const ChooseSeatsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedRoute = useSelector(
    (state: RootState) => state.booking.selectedRoute
  );
  const selectedReturnRoute = useSelector(
    (state: RootState) => state.booking.selectedReturnRoute
  );
  const seats = useSelector((state: RootState) => state.booking.seats);
  const returnSeats = useSelector(
    (state: RootState) => state.booking.returnSeats
  );

  const [selectedCarType, setSelectedCarType] = useState<string>('');
  const [selectedCarTypeBack, setSelectedCarTypeBack] = useState<string>('');

  const normalizedSeats = seats.map((item, index) => ({
    ...item.coach,
    number: index + 1,
    seats: item.seats,
  }));

  const normalizedReturnSeats = returnSeats.map((item, index) => ({
    ...item.coach,
    number: index + 1,
    seats: item.seats,
  }));

  const availableCarTypes = Array.from(
    new Set(normalizedSeats.map((c) => c.class_type))
  ) as CoachClass[];

  const availableCarTypesBack = Array.from(
    new Set(normalizedReturnSeats.map((c) => c.class_type))
  ) as CoachClass[];

  useEffect(() => {
    if (selectedRoute) {
      dispatch(getSeats({ routeId: selectedRoute._id, params: {} }));
    }
    if (selectedReturnRoute) {
      dispatch(
        getReturnSeats({ routeId: selectedReturnRoute._id, params: {} })
      );
    }
  }, [dispatch, selectedRoute, selectedReturnRoute]);

  if (!selectedRoute) {
    return <Navigate to="/choose-train" replace />;
  }

  return (
    <>
      <HeaderTrain />
      <ProgressSteps />
      <div className={styles.page}>
        <div className={styles.page__sidebar}>
          <Sidebar />
          <LastTickets />
        </div>
        <div className={styles.page__content}>
          <PageTitle>Выбор мест</PageTitle>

          <div className={styles.page__cardWrap}>
            <ChooseSeatsCard>
              <ChooseAnotherButton />
              <RouteInfo
                trainName={selectedRoute.train.name}
                from={selectedRoute.from}
                to={selectedRoute.to}
                duration={selectedRoute.duration}
              />
              <PassengerCount />
              <CarTypeSelect
                selectedType={selectedCarType}
                onTypeChange={setSelectedCarType}
                availableApiTypes={availableCarTypes}
              />
              {selectedCarType && (
                <SeatsBlock
                  key={selectedCarType}
                  coaches={normalizedSeats.filter(
                    (c) => c.class_type === selectedCarType
                  )}
                  direction="forward"
                />
              )}
            </ChooseSeatsCard>
          </div>

          {selectedReturnRoute && (
            <div className={styles.page__cardWrapLast}>
              <ChooseSeatsCard>
                <ChooseAnotherButton direction="backward" />
                <RouteInfo
                  trainName={selectedReturnRoute.train.name}
                  direction="backward"
                  from={selectedReturnRoute.from}
                  to={selectedReturnRoute.to}
                  duration={selectedReturnRoute.duration}
                />
                <PassengerCount />
                <CarTypeSelect
                  selectedType={selectedCarTypeBack}
                  onTypeChange={setSelectedCarTypeBack}
                  availableApiTypes={availableCarTypesBack}
                />
                {selectedCarTypeBack && (
                  <SeatsBlock
                    key={`back-${selectedCarTypeBack}`}
                    coaches={normalizedReturnSeats.filter(
                      (c) => c.class_type === selectedCarTypeBack
                    )}
                    direction="back"
                  />
                )}
              </ChooseSeatsCard>
            </div>
          )}

          <div className={styles.page__next}>
            <NextButton />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChooseSeatsPage;

import { useState } from 'react';
import HeaderTrain from '../components/choose-train/HeaderTrain/HeaderTrain';
import ProgressSteps from '../components/choose-train/ProgressSteps/ProgressSteps';
import TripDetails from '../components/passengers/TripDetails/TripDetails';
import PassengerCard from '../components/passengers/PassengerCard/PassengerCard';
import NextButton from '../components/common/NextButton/NextButton';
import Footer from '../components/Footer/Footer';
import styles from './PassengersPage.module.scss';

const passengers = [
  { id: 1, isExpandedDefault: true },
  { id: 2, isExpandedDefault: true },
  { id: 3, isExpandedDefault: false },
];

const PassengersPage = () => {
  const [expanded, setExpanded] = useState<number[]>(
    passengers.filter((p) => p.isExpandedDefault).map((p) => p.id)
  );

  const toggle = (id: number) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <>
      <HeaderTrain />
      <ProgressSteps />
      <div className={styles.page}>
        <div className={styles.page__sidebar}>
          <TripDetails />
        </div>
        <div className={styles.page__content}>
          {passengers.map((p, i) => (
            <PassengerCard
              key={p.id}
              index={i}
              isExpanded={expanded.includes(p.id)}
              onToggle={() => toggle(p.id)}
            />
          ))}
          <div className={styles.page__next}>
            <NextButton />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PassengersPage;

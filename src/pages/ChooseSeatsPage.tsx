import { useState } from 'react';
import HeaderTrain from '../components/choose-train/HeaderTrain';
import ProgressSteps from '../components/choose-train/ProgressSteps';
import Sidebar from '../components/choose-train/Sidebar';
import LastTickets from '../components/choose-train/LastTickets';
import PageTitle from '../components/choose-seats/PageTitle';
import ChooseSeatsCard from '../components/choose-seats/ChooseSeatsCard';
import ChooseAnotherButton from '../components/choose-seats/ChooseAnotherButton';
import RouteInfo from '../components/choose-seats/RouteInfo';
import PassengerCount from '../components/choose-seats/PassengerCount';
import CarTypeSelect from '../components/choose-seats/CarTypeSelect';
import SeatsBlock from '../components/choose-seats/SeatsBlock';
import NextButton from '../components/common/NextButton';
import Footer from '../components/Footer';
import styles from './ChooseSeatsPage.module.scss';

type CoachClass = 'first' | 'second' | 'third' | 'fourth';

type Seat = {
  index: number;
  available: boolean;
};

type Coach = {
  _id: string;
  number: number;
  name: string;
  class_type: CoachClass;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  price: number;
  top_price: number;
  bottom_price: number;
  side_price: number;
  linens_price: number;
  wifi_price: number;
  is_linens_included: boolean;
  available_seats: number;
  seats: Seat[];
};

const allCoaches: Coach[] = [
  {
    _id: '1',
    number: 1,
    name: 'ОНГДС-26',
    class_type: 'second',
    have_wifi: true,
    have_air_conditioning: false,
    price: 0,
    top_price: 2871,
    bottom_price: 2781,
    side_price: 0,
    linens_price: 53,
    wifi_price: 225,
    is_linens_included: true,
    available_seats: 32,
    seats: [
      { index: 1, available: true },
      { index: 2, available: true },
      { index: 3, available: false },
      { index: 4, available: true },
      { index: 5, available: true },
      { index: 6, available: false },
      { index: 7, available: true },
      { index: 8, available: true },
      { index: 9, available: true },
      { index: 10, available: true },
      { index: 11, available: false },
      { index: 12, available: true },
      { index: 13, available: true },
      { index: 14, available: true },
      { index: 15, available: true },
      { index: 16, available: true },
      { index: 17, available: true },
      { index: 18, available: false },
      { index: 19, available: true },
      { index: 20, available: true },
      { index: 21, available: true },
      { index: 22, available: true },
      { index: 23, available: true },
      { index: 24, available: true },
      { index: 25, available: true },
      { index: 26, available: true },
      { index: 27, available: true },
      { index: 28, available: true },
      { index: 29, available: true },
      { index: 30, available: true },
      { index: 31, available: true },
      { index: 32, available: true },
    ],
  },
  {
    _id: '2',
    number: 2,
    name: 'ВПЕТ-35',
    class_type: 'first',
    have_wifi: false,
    have_air_conditioning: false,
    price: 4060,
    top_price: 2520,
    bottom_price: 3095,
    side_price: 0,
    linens_price: 208,
    wifi_price: 250,
    is_linens_included: true,
    available_seats: 18,
    seats: [
      { index: 1, available: true },
      { index: 2, available: true },
      { index: 3, available: true },
      { index: 4, available: false },
      { index: 5, available: true },
      { index: 6, available: true },
      { index: 7, available: true },
      { index: 8, available: true },
      { index: 9, available: true },
      { index: 10, available: true },
      { index: 11, available: true },
      { index: 12, available: true },
      { index: 13, available: true },
      { index: 14, available: true },
      { index: 15, available: true },
      { index: 16, available: true },
      { index: 17, available: true },
      { index: 18, available: true },
    ],
  },
  {
    _id: '3',
    number: 3,
    name: 'ОТИУ-83',
    class_type: 'second',
    have_wifi: true,
    have_air_conditioning: false,
    price: 0,
    top_price: 2727,
    bottom_price: 2265,
    side_price: 0,
    linens_price: 86,
    wifi_price: 144,
    is_linens_included: true,
    available_seats: 32,
    seats: [
      { index: 1, available: true },
      { index: 2, available: true },
      { index: 3, available: true },
      { index: 4, available: true },
      { index: 5, available: true },
      { index: 6, available: true },
      { index: 7, available: true },
      { index: 8, available: true },
      { index: 9, available: false },
      { index: 10, available: true },
      { index: 11, available: true },
      { index: 12, available: true },
      { index: 13, available: true },
      { index: 14, available: true },
      { index: 15, available: true },
      { index: 16, available: false },
      { index: 17, available: true },
      { index: 18, available: true },
      { index: 19, available: true },
      { index: 20, available: true },
      { index: 21, available: true },
      { index: 22, available: true },
      { index: 23, available: true },
      { index: 24, available: true },
      { index: 25, available: true },
      { index: 26, available: true },
      { index: 27, available: true },
      { index: 28, available: true },
      { index: 29, available: true },
      { index: 30, available: true },
      { index: 31, available: true },
      { index: 32, available: true },
    ],
  },
  {
    _id: '4',
    number: 4,
    name: 'ПЛАЦКАРТ-01',
    class_type: 'third',
    have_wifi: true,
    have_air_conditioning: true,
    price: 0,
    top_price: 1800,
    bottom_price: 2000,
    side_price: 1500,
    linens_price: 100,
    wifi_price: 150,
    is_linens_included: true,
    available_seats: 48,
    seats: Array.from({ length: 48 }, (_, i) => ({
      index: i + 1,
      available: i % 7 !== 0 && i % 11 !== 0,
    })),
  },
  {
    _id: '5',
    number: 5,
    name: 'СИДЯЧИЙ-01',
    class_type: 'fourth',
    have_wifi: true,
    have_air_conditioning: true,
    price: 1200,
    top_price: 0,
    bottom_price: 0,
    side_price: 0,
    linens_price: 0,
    wifi_price: 100,
    is_linens_included: false,
    available_seats: 62,
    seats: Array.from({ length: 62 }, (_, i) => ({
      index: i + 1,
      available: i % 5 !== 0 && i % 9 !== 0,
    })),
  },
];

const availableCarTypes = Array.from(
  new Set(allCoaches.map((c) => c.class_type))
);

const ChooseSeatsPage = () => {
  const [selectedCarType, setSelectedCarType] = useState<string>(
    availableCarTypes[0] || 'second'
  );
  const [selectedCarTypeBack, setSelectedCarTypeBack] = useState<string>(
    availableCarTypes[0] || 'second'
  );

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
                trainName="Иволга - 116С"
                from={{
                  railway_station_name: 'Курский вокзал',
                  city: { _id: '1', name: 'москва' },
                  datetime: 1704978475,
                }}
                to={{
                  railway_station_name: 'Ладожский вокзал',
                  city: { _id: '2', name: 'санкт-петербург' },
                  datetime: 1705363555,
                }}
                duration={34920}
              />
              <PassengerCount />
              <CarTypeSelect
                selectedType={selectedCarType}
                onTypeChange={setSelectedCarType}
                availableApiTypes={availableCarTypes}
              />
              <SeatsBlock
                coaches={allCoaches.filter(
                  (c) => c.class_type === selectedCarType
                )}
              />
            </ChooseSeatsCard>
          </div>

          <div className={styles.page__cardWrapLast}>
            <ChooseSeatsCard>
              <ChooseAnotherButton direction="backward" />
              <RouteInfo
                trainName="Брусника - 58"
                direction="backward"
                from={{
                  railway_station_name: 'Ладожский вокзал',
                  city: { _id: '2', name: 'санкт-петербург' },
                  datetime: 1705363555,
                }}
                to={{
                  railway_station_name: 'Курский вокзал',
                  city: { _id: '1', name: 'москва' },
                  datetime: 1704978475,
                }}
                duration={34920}
              />
              <PassengerCount />
              <CarTypeSelect
                selectedType={selectedCarTypeBack}
                onTypeChange={setSelectedCarTypeBack}
                availableApiTypes={availableCarTypes}
              />
              <SeatsBlock
                coaches={allCoaches.filter(
                  (c) => c.class_type === selectedCarTypeBack
                )}
              />
            </ChooseSeatsCard>
          </div>

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

import { useState } from 'react';
import HeaderTrain from '../components/choose-train/HeaderTrain';
import ProgressSteps from '../components/choose-train/ProgressSteps';
import Sidebar from '../components/choose-train/Sidebar';
import LastTickets from '../components/choose-train/LastTickets';
import TicketsToolbar from '../components/choose-train/TicketsToolbar';
import TicketCard from '../components/choose-train/TicketCard';
import Pagination from '../components/choose-train/Pagination';
import Footer from '../components/Footer';
import styles from './ChooseTrainPage.module.scss';

type SortValue = 'времени' | 'стоимости' | 'длительности';

const testRoute = {
  _id: '67ceb6778c75f00047c91a37',
  have_first_class: true,
  have_second_class: true,
  have_third_class: true,
  have_fourth_class: true,
  have_wifi: true,
  have_air_conditioning: true,
  is_express: true,
  have_food: true,
  have_linens: true,
  min_price: 2265,
  duration: 385080,
  available_seats: 82,
  available_seats_info: { first: 18, second: 64, third: 48, fourth: 62 },
  train: { _id: '67ceb6578c75f00047c900b0', name: 'Иволга - 10' },
  from: {
    railway_station_name: 'Московский',
    city: { _id: '67ceb6548c75f00047c8f78e', name: 'санкт-петербург' },
    datetime: 1704978475,
  },
  to: {
    railway_station_name: 'Архангельск',
    city: { _id: '67ceb6548c75f00047c8f794', name: 'архангельск' },
    datetime: 1705363555,
  },
  price_info: {
    first: {
      price: 4060,
      top_price: 2520,
      bottom_price: 3095,
      top_seats: 10,
      bottom_seats: 8,
    },
    second: {
      top_price: 2727,
      bottom_price: 2265,
      top_seats: 19,
      bottom_seats: 45,
    },
    third: {
      top_price: 4195,
      bottom_price: 3655,
      side_price: 3525,
      top_seats: 20,
      bottom_seats: 20,
      side_seats: 8,
    },
    fourth: {
      top_price: 685,
      bottom_price: 709,
      top_seats: 30,
      bottom_seats: 32,
    },
  },
};

const testReturnRoute = {
  _id: '67ceb6748c75f00047c9178b',
  have_first_class: false,
  have_second_class: false,
  have_third_class: true,
  have_fourth_class: false,
  have_wifi: true,
  have_air_conditioning: true,
  is_express: false,
  min_price: 3550,
  duration: 308580,
  available_seats: 96,
  available_seats_info: { third: 96 },
  train: { _id: '67ceb6598c75f00047c901ab', name: 'Брусника - 58' },
  from: {
    railway_station_name: 'Архангельск',
    city: { _id: '67ceb6548c75f00047c8f794', name: 'архангельск' },
    datetime: 1705059112,
  },
  to: {
    railway_station_name: 'Ладожский',
    city: { _id: '67ceb6548c75f00047c8f78e', name: 'санкт-петербург' },
    datetime: 1705367692,
  },
  price_info: {
    third: { top_price: 4475, bottom_price: 4390, side_price: 3550 },
  },
};

const testRoutes = [
  { departureRoute: testRoute, returnRoute: testReturnRoute },
  { departureRoute: testRoute, returnRoute: testReturnRoute },
  { departureRoute: testRoute, returnRoute: testReturnRoute },
  { departureRoute: testRoute, returnRoute: testReturnRoute },
  { departureRoute: testRoute, returnRoute: testReturnRoute },
];

const ChooseTrainPage = () => {
  const [sortBy, setSortBy] = useState<SortValue>('времени');
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

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
          <TicketsToolbar
            sortBy={sortBy}
            onSortChange={setSortBy}
            limit={limit}
            onLimitChange={setLimit}
          />
          <div className={styles.page__tickets}>
            {testRoutes.map((route, index) => (
              <TicketCard
                key={index}
                departureRoute={route.departureRoute}
                returnRoute={route.returnRoute}
              />
            ))}
          </div>
          <div className={styles.page__pagination}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChooseTrainPage;

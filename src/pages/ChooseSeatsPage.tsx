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
import Footer from '../components/Footer';
import styles from './ChooseSeatsPage.module.scss';

const ChooseSeatsPage = () => {
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
            <CarTypeSelect />
            <SeatsBlock
              coaches={[
                {
                  _id: '1',
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
                  available_seats: 20,
                },
                {
                  _id: '2',
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
                  available_seats: 6,
                },
                {
                  _id: '3',
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
                  available_seats: 20,
                },
              ]}
            />
          </ChooseSeatsCard>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChooseSeatsPage;

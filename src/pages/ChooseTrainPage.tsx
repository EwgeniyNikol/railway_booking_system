import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTrain from '../components/choose-train/HeaderTrain/HeaderTrain';
import ProgressSteps from '../components/choose-train/ProgressSteps/ProgressSteps';
import Sidebar from '../components/choose-train/Sidebar/Sidebar';
import LastTickets from '../components/choose-train/LastTickets/LastTickets';
import TicketsToolbar from '../components/choose-train/TicketsToolbar/TicketsToolbar';
import TicketCard from '../components/choose-train/TicketCard/TicketCard';
import Pagination from '../components/choose-train/Pagination/Pagination';
import LoadingScreen from '../components/choose-train/LoadingScreen/LoadingScreen';
import Footer from '../components/Footer/Footer';
import { searchRoutes } from '../store/slices/searchSlice';
import type { RootState, AppDispatch } from '../store/store';
import styles from './ChooseTrainPage.module.scss';

type SortValue = 'времени' | 'стоимости' | 'длительности';

const sortMap: Record<SortValue, 'date' | 'price' | 'duration'> = {
  времени: 'date',
  стоимости: 'price',
  длительности: 'duration',
};

const ChooseTrainPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [sortBy, setSortBy] = useState<SortValue>('времени');
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const routes = useSelector((state: RootState) => state.search.routes);
  const returnRoutes = useSelector(
    (state: RootState) => state.search.returnRoutes
  );
  const status = useSelector((state: RootState) => state.search.status);
  const returnStatus = useSelector(
    (state: RootState) => state.search.returnStatus
  );
  const savedFromCity = useSelector(
    (state: RootState) => state.search.from_city
  );
  const params = useSelector((state: RootState) => state.search.params);
  const totalCount = useSelector(
    (state: RootState) => state.search.total_count
  );

  const {
    from_city_id,
    to_city_id,
    date_start,
    date_end,
    have_first_class,
    have_second_class,
    have_third_class,
    have_fourth_class,
    have_wifi,
    have_express,
    price_from,
    price_to,
    have_air_conditioning,
    start_departure_hour_from,
    start_departure_hour_to,
    start_arrival_hour_from,
    start_arrival_hour_to,
    end_departure_hour_from,
    end_departure_hour_to,
    end_arrival_hour_from,
    end_arrival_hour_to,
  } = params;

  const totalPages = Math.ceil(totalCount / limit) || 1;

  useEffect(() => {
    if (!from_city_id || !to_city_id) return;

    const offset = (currentPage - 1) * limit;

    dispatch(
      searchRoutes({
        from_city_id,
        to_city_id,
        date_start,
        date_end,
        have_first_class,
        have_second_class,
        have_third_class,
        have_fourth_class,
        have_wifi,
        have_express,
        price_from,
        price_to,
        have_air_conditioning,
        start_departure_hour_from,
        start_departure_hour_to,
        start_arrival_hour_from,
        start_arrival_hour_to,
        end_departure_hour_from,
        end_departure_hour_to,
        end_arrival_hour_from,
        end_arrival_hour_to,
        sort: sortMap[sortBy],
        limit,
        offset,
      })
    );
  }, [
    dispatch,
    sortBy,
    limit,
    currentPage,
    from_city_id,
    to_city_id,
    date_start,
    date_end,
    have_first_class,
    have_second_class,
    have_third_class,
    have_fourth_class,
    have_wifi,
    have_express,
    price_from,
    price_to,
    have_air_conditioning,
    start_departure_hour_from,
    start_departure_hour_to,
    start_arrival_hour_from,
    start_arrival_hour_to,
    end_departure_hour_from,
    end_departure_hour_to,
    end_arrival_hour_from,
    end_arrival_hour_to,
  ]);

  const isLoading = status === 'loading' || returnStatus === 'loading';

  if (isLoading) {
    return (
      <>
        <HeaderTrain key={savedFromCity?._id || 'empty'} />
        <LoadingScreen />
        <Footer />
      </>
    );
  }

  return (
    <>
      <HeaderTrain key={savedFromCity?._id || 'empty'} />
      <ProgressSteps activeStep={0} />
      <div className={styles.page}>
        <div className={styles.page__sidebar}>
          <Sidebar />
          <LastTickets />
        </div>
        <div className={styles.page__content}>
          <TicketsToolbar
            foundCount={totalCount}
            sortBy={sortBy}
            onSortChange={(value) => {
              setSortBy(value);
              setCurrentPage(1);
            }}
            limit={limit}
            onLimitChange={(value) => {
              setLimit(value);
              setCurrentPage(1);
            }}
          />

          {routes.length > 0 && (
            <div className={styles.page__tickets}>
              {routes.map((route) => {
                const pair = returnRoutes.find(
                  (r) => r.departure.train._id === route.departure.train._id
                );
                return (
                  <TicketCard
                    key={route.departure._id}
                    departureRoute={route.departure}
                    returnRoute={pair?.departure}
                  />
                );
              })}
            </div>
          )}

          {routes.length === 0 && status === 'success' && (
            <div className={styles.page__empty}>Ничего не найдено</div>
          )}

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

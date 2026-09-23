import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setSelectedRoute,
  setSelectedReturnRoute,
} from '../../../store/slices/bookingSlice';
import {
  capitalizeCity,
  formatTime,
  formatDuration,
} from '../../../utils/format';
import { useTooltip } from '../../../hooks/useTooltip';
import TrainIcons from '../../common/TrainIcons/TrainIcons';
import type { AppDispatch } from '../../../store/store';
import styles from './TicketCard.module.scss';

type City = {
  _id: string;
  name: string;
};

type Station = {
  railway_station_name: string;
  city: City;
  datetime: number;
};

type PriceInfo = {
  top_price?: number;
  bottom_price?: number;
  side_price?: number;
  price?: number;
  top_seats?: number;
  bottom_seats?: number;
  side_seats?: number;
};

type Departure = {
  _id: string;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  have_food?: boolean;
  have_linens?: boolean;
  min_price: number;
  duration: number;
  available_seats: number;
  available_seats_info: {
    first?: number;
    second?: number;
    third?: number;
    fourth?: number;
  };
  train: {
    _id: string;
    name: string;
  };
  from: Station;
  to: Station;
  price_info: {
    first?: PriceInfo;
    second?: PriceInfo;
    third?: PriceInfo;
    fourth?: PriceInfo;
  };
};

type TicketCardProps = {
  departureRoute: Departure;
  returnRoute?: Departure;
};

const TicketCard = ({ departureRoute, returnRoute }: TicketCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const trainNumber = departureRoute.train.name.split(' - ')[1] || '';
  const { openTooltip, toggle, ref } = useTooltip('ticketCard');

  return (
    <div className={styles.ticketCard} ref={ref}>
      <div className={styles.ticketCard__left}>
        <img
          src={`${import.meta.env.BASE_URL}images/icon-train.svg`}
          alt=""
          className={styles.ticketCard__trainIcon}
        />
        <div className={styles.ticketCard__trainNumber}>{trainNumber}</div>
        <div className={styles.ticketCard__route}>
          {capitalizeCity(departureRoute.from.city.name)} →{' '}
          {capitalizeCity(departureRoute.to.city.name)}
        </div>
      </div>

      <div className={styles.ticketCard__center}>
        <div className={styles.ticketCard__row}>
          <div className={styles.ticketCard__timeBlock}>
            <div className={styles.ticketCard__time}>
              {formatTime(departureRoute.from.datetime)}
            </div>
            <div className={styles.ticketCard__city}>
              {capitalizeCity(departureRoute.from.city.name)}
            </div>
            <div className={styles.ticketCard__station}>
              {departureRoute.from.railway_station_name} вокзал
            </div>
          </div>

          <div className={styles.ticketCard__arrowBlock}>
            <div className={styles.ticketCard__duration}>
              {formatDuration(
                departureRoute.from.datetime,
                departureRoute.to.datetime
              )}
            </div>
            <img
              src={`${import.meta.env.BASE_URL}images/arrow-right.svg`}
              alt=""
              className={styles.ticketCard__arrow}
            />
          </div>

          <div className={styles.ticketCard__timeBlock}>
            <div className={styles.ticketCard__time}>
              {formatTime(departureRoute.to.datetime)}
            </div>
            <div className={styles.ticketCard__city}>
              {capitalizeCity(departureRoute.to.city.name)}
            </div>
            <div className={styles.ticketCard__station}>
              {departureRoute.to.railway_station_name} вокзал
            </div>
          </div>
        </div>

        {returnRoute && (
          <div className={styles.ticketCard__row}>
            <div className={styles.ticketCard__timeBlock}>
              <div className={styles.ticketCard__time}>
                {formatTime(returnRoute.from.datetime)}
              </div>
              <div className={styles.ticketCard__city}>
                {capitalizeCity(returnRoute.from.city.name)}
              </div>
              <div className={styles.ticketCard__station}>
                {returnRoute.from.railway_station_name} вокзал
              </div>
            </div>

            <div className={styles.ticketCard__arrowBlock}>
              <div className={styles.ticketCard__duration}>
                {formatDuration(
                  returnRoute.from.datetime,
                  returnRoute.to.datetime
                )}
              </div>
              <img
                src={`${import.meta.env.BASE_URL}images/arrow-left.svg`}
                alt=""
                className={styles.ticketCard__arrow}
              />
            </div>

            <div className={styles.ticketCard__timeBlock}>
              <div className={styles.ticketCard__time}>
                {formatTime(returnRoute.to.datetime)}
              </div>
              <div className={styles.ticketCard__city}>
                {capitalizeCity(returnRoute.to.city.name)}
              </div>
              <div className={styles.ticketCard__station}>
                {returnRoute.to.railway_station_name} вокзал
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.ticketCard__right}>
        {departureRoute.have_fourth_class &&
          departureRoute.price_info.fourth && (
            <div className={styles.ticketCard__seatType}>
              <span className={styles.ticketCard__seatName}>Сидячий</span>
              <span
                className={styles.ticketCard__seatCount}
                onClick={() => toggle('fourth')}
              >
                {departureRoute.available_seats_info.fourth ?? 0}
              </span>
              <span className={styles.ticketCard__seatLabel}>от</span>
              <span className={styles.ticketCard__seatPrice}>
                {(
                  departureRoute.price_info.fourth.bottom_price ??
                  departureRoute.price_info.fourth.price ??
                  0
                ).toLocaleString('ru-RU')}
              </span>
              <img
                src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
                alt=""
                className={styles.ticketCard__seatCurrency}
              />
              {openTooltip === 'fourth' && (
                <div className={styles.ticketCard__tooltip}>
                  {departureRoute.price_info.fourth.bottom_seats !==
                    undefined && (
                    <div className={styles.ticketCard__tooltipRow}>
                      <span className={styles.ticketCard__tooltipName}>
                        Нижние
                      </span>
                      <span className={styles.ticketCard__tooltipCount}>
                        {departureRoute.price_info.fourth.bottom_seats}
                      </span>
                      <span className={styles.ticketCard__tooltipPrice}>
                        {departureRoute.price_info.fourth.bottom_price?.toLocaleString(
                          'ru-RU'
                        )}
                      </span>
                      <img
                        src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
                        alt=""
                        className={styles.ticketCard__tooltipCurrency}
                      />
                    </div>
                  )}
                  {departureRoute.price_info.fourth.bottom_seats ===
                    undefined &&
                    departureRoute.price_info.fourth.top_seats === undefined &&
                    departureRoute.price_info.fourth.side_seats ===
                      undefined && (
                      <div className={styles.ticketCard__tooltipRow}>
                        <span className={styles.ticketCard__tooltipName}>
                          Все места
                        </span>
                        <span className={styles.ticketCard__tooltipCount}>
                          {departureRoute.available_seats_info.fourth ?? 0}
                        </span>
                        <span className={styles.ticketCard__tooltipPrice}>
                          {departureRoute.price_info.fourth.bottom_price?.toLocaleString(
                            'ru-RU'
                          )}
                        </span>
                        <img
                          src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
                          alt=""
                          className={styles.ticketCard__tooltipCurrency}
                        />
                      </div>
                    )}
                </div>
              )}
            </div>
          )}

        {departureRoute.have_third_class && departureRoute.price_info.third && (
          <div className={styles.ticketCard__seatType}>
            <span className={styles.ticketCard__seatName}>Плацкарт</span>
            <span
              className={styles.ticketCard__seatCount}
              onClick={() => toggle('third')}
            >
              {departureRoute.available_seats_info.third ?? 0}
            </span>
            <span className={styles.ticketCard__seatLabel}>от</span>
            <span className={styles.ticketCard__seatPrice}>
              {(
                departureRoute.price_info.third.bottom_price ??
                departureRoute.price_info.third.price ??
                0
              ).toLocaleString('ru-RU')}
            </span>
            <img
              src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
              alt=""
              className={styles.ticketCard__seatCurrency}
            />
            {openTooltip === 'third' && (
              <div className={styles.ticketCard__tooltip}>
                {departureRoute.price_info.third.top_seats !== undefined && (
                  <div className={styles.ticketCard__tooltipRow}>
                    <span className={styles.ticketCard__tooltipName}>
                      Верхние
                    </span>
                    <span className={styles.ticketCard__tooltipCount}>
                      {departureRoute.price_info.third.top_seats}
                    </span>
                    <span className={styles.ticketCard__tooltipPrice}>
                      {departureRoute.price_info.third.top_price?.toLocaleString(
                        'ru-RU'
                      )}
                    </span>
                    <img
                      src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
                      alt=""
                      className={styles.ticketCard__tooltipCurrency}
                    />
                  </div>
                )}
                {departureRoute.price_info.third.bottom_seats !== undefined && (
                  <div className={styles.ticketCard__tooltipRow}>
                    <span className={styles.ticketCard__tooltipName}>
                      Нижние
                    </span>
                    <span className={styles.ticketCard__tooltipCount}>
                      {departureRoute.price_info.third.bottom_seats}
                    </span>
                    <span className={styles.ticketCard__tooltipPrice}>
                      {departureRoute.price_info.third.bottom_price?.toLocaleString(
                        'ru-RU'
                      )}
                    </span>
                    <img
                      src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
                      alt=""
                      className={styles.ticketCard__tooltipCurrency}
                    />
                  </div>
                )}
                {departureRoute.price_info.third.side_seats !== undefined && (
                  <div className={styles.ticketCard__tooltipRow}>
                    <span className={styles.ticketCard__tooltipName}>
                      Боковые
                    </span>
                    <span className={styles.ticketCard__tooltipCount}>
                      {departureRoute.price_info.third.side_seats}
                    </span>
                    <span className={styles.ticketCard__tooltipPrice}>
                      {departureRoute.price_info.third.side_price?.toLocaleString(
                        'ru-RU'
                      )}
                    </span>
                    <img
                      src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
                      alt=""
                      className={styles.ticketCard__tooltipCurrency}
                    />
                  </div>
                )}
                {departureRoute.price_info.third.bottom_seats === undefined &&
                  departureRoute.price_info.third.top_seats === undefined &&
                  departureRoute.price_info.third.side_seats === undefined && (
                    <div className={styles.ticketCard__tooltipRow}>
                      <span className={styles.ticketCard__tooltipName}>
                        Все места
                      </span>
                      <span className={styles.ticketCard__tooltipCount}>
                        {departureRoute.available_seats_info.third ?? 0}
                      </span>
                      <span className={styles.ticketCard__tooltipPrice}>
                        {departureRoute.price_info.third.bottom_price?.toLocaleString(
                          'ru-RU'
                        )}
                      </span>
                      <img
                        src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
                        alt=""
                        className={styles.ticketCard__tooltipCurrency}
                      />
                    </div>
                  )}
              </div>
            )}
          </div>
        )}

        {departureRoute.have_second_class &&
          departureRoute.price_info.second && (
            <div className={styles.ticketCard__seatType}>
              <span className={styles.ticketCard__seatName}>Купе</span>
              <span
                className={styles.ticketCard__seatCount}
                onClick={() => toggle('second')}
              >
                {departureRoute.available_seats_info.second ?? 0}
              </span>
              <span className={styles.ticketCard__seatLabel}>от</span>
              <span className={styles.ticketCard__seatPrice}>
                {(
                  departureRoute.price_info.second.bottom_price ??
                  departureRoute.price_info.second.price ??
                  0
                ).toLocaleString('ru-RU')}
              </span>
              <img
                src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
                alt=""
                className={styles.ticketCard__seatCurrency}
              />
              {openTooltip === 'second' && (
                <div className={styles.ticketCard__tooltip}>
                  {departureRoute.price_info.second.top_seats !== undefined && (
                    <div className={styles.ticketCard__tooltipRow}>
                      <span className={styles.ticketCard__tooltipName}>
                        Верхние
                      </span>
                      <span className={styles.ticketCard__tooltipCount}>
                        {departureRoute.price_info.second.top_seats}
                      </span>
                      <span className={styles.ticketCard__tooltipPrice}>
                        {departureRoute.price_info.second.top_price?.toLocaleString(
                          'ru-RU'
                        )}
                      </span>
                      <img
                        src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
                        alt=""
                        className={styles.ticketCard__tooltipCurrency}
                      />
                    </div>
                  )}
                  {departureRoute.price_info.second.bottom_seats !==
                    undefined && (
                    <div className={styles.ticketCard__tooltipRow}>
                      <span className={styles.ticketCard__tooltipName}>
                        Нижние
                      </span>
                      <span className={styles.ticketCard__tooltipCount}>
                        {departureRoute.price_info.second.bottom_seats}
                      </span>
                      <span className={styles.ticketCard__tooltipPrice}>
                        {departureRoute.price_info.second.bottom_price?.toLocaleString(
                          'ru-RU'
                        )}
                      </span>
                      <img
                        src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
                        alt=""
                        className={styles.ticketCard__tooltipCurrency}
                      />
                    </div>
                  )}
                  {departureRoute.price_info.second.bottom_seats ===
                    undefined &&
                    departureRoute.price_info.second.top_seats ===
                      undefined && (
                      <div className={styles.ticketCard__tooltipRow}>
                        <span className={styles.ticketCard__tooltipName}>
                          Все места
                        </span>
                        <span className={styles.ticketCard__tooltipCount}>
                          {departureRoute.available_seats_info.second ?? 0}
                        </span>
                        <span className={styles.ticketCard__tooltipPrice}>
                          {departureRoute.price_info.second.bottom_price?.toLocaleString(
                            'ru-RU'
                          )}
                        </span>
                        <img
                          src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
                          alt=""
                          className={styles.ticketCard__tooltipCurrency}
                        />
                      </div>
                    )}
                </div>
              )}
            </div>
          )}

        {departureRoute.have_first_class && departureRoute.price_info.first && (
          <div className={styles.ticketCard__seatType}>
            <span className={styles.ticketCard__seatName}>Люкс</span>
            <span
              className={styles.ticketCard__seatCount}
              onClick={() => toggle('first')}
            >
              {departureRoute.available_seats_info.first ?? 0}
            </span>
            <span className={styles.ticketCard__seatLabel}>от</span>
            <span className={styles.ticketCard__seatPrice}>
              {(
                departureRoute.price_info.first.bottom_price ??
                departureRoute.price_info.first.price ??
                0
              ).toLocaleString('ru-RU')}
            </span>
            <img
              src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
              alt=""
              className={styles.ticketCard__seatCurrency}
            />
            {openTooltip === 'first' && (
              <div className={styles.ticketCard__tooltip}>
                {departureRoute.price_info.first.bottom_seats !== undefined && (
                  <div className={styles.ticketCard__tooltipRow}>
                    <span className={styles.ticketCard__tooltipName}>
                      Нижние
                    </span>
                    <span className={styles.ticketCard__tooltipCount}>
                      {departureRoute.price_info.first.bottom_seats}
                    </span>
                    <span className={styles.ticketCard__tooltipPrice}>
                      {departureRoute.price_info.first.bottom_price?.toLocaleString(
                        'ru-RU'
                      )}
                    </span>
                    <img
                      src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
                      alt=""
                      className={styles.ticketCard__tooltipCurrency}
                    />
                  </div>
                )}
                {departureRoute.price_info.first.bottom_seats === undefined &&
                  departureRoute.price_info.first.top_seats === undefined && (
                    <div className={styles.ticketCard__tooltipRow}>
                      <span className={styles.ticketCard__tooltipName}>
                        Все места
                      </span>
                      <span className={styles.ticketCard__tooltipCount}>
                        {departureRoute.available_seats_info.first ?? 0}
                      </span>
                      <span className={styles.ticketCard__tooltipPrice}>
                        {departureRoute.price_info.first.bottom_price?.toLocaleString(
                          'ru-RU'
                        )}
                      </span>
                      <img
                        src={`${import.meta.env.BASE_URL}images/icon-ruble.svg`}
                        alt=""
                        className={styles.ticketCard__tooltipCurrency}
                      />
                    </div>
                  )}
              </div>
            )}
          </div>
        )}

        <div className={styles.ticketCard__icons}>
          <TrainIcons route={departureRoute} />
        </div>

        <button
          type="button"
          className={styles.ticketCard__button}
          onClick={() => {
            dispatch(setSelectedRoute(departureRoute));
            dispatch(setSelectedReturnRoute(returnRoute || null));
            navigate('/choose-seats');
          }}
        >
          Выбрать места
        </button>
      </div>
    </div>
  );
};

export default TicketCard;

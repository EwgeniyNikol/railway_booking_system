import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPassengerCount } from '../../../store/slices/bookingSlice';
import type { RootState, AppDispatch } from '../../../store/store';
import styles from './PassengerCount.module.scss';

type FieldType = 'adults' | 'children' | 'childrenNoSeat';

const PassengerCount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const passengerCount = useSelector(
    (state: RootState) => state.booking.passengerCount
  );

  const adults = passengerCount.adults;
  const children = passengerCount.children;
  const childrenNoSeat = passengerCount.childrenWithoutSeat;

  const [activeField, setActiveField] = useState<FieldType | null>(null);

  const adultsRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const childrenNoSeatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeField === null) return;

      const refsMap = {
        adults: adultsRef,
        children: childrenRef,
        childrenNoSeat: childrenNoSeatRef,
      };

      const activeRef = refsMap[activeField];

      if (
        activeRef.current &&
        !activeRef.current.contains(event.target as Node)
      ) {
        setActiveField(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeField]);

  const handleFieldClick = (field: FieldType) => {
    setActiveField(activeField === field ? null : field);
  };

  const handleIncrement = (field: FieldType) => {
    if (field === 'adults' && adults < 4)
      dispatch(setPassengerCount({ adults: adults + 1 }));
    if (field === 'children' && children < adults - 1)
      dispatch(setPassengerCount({ children: children + 1 }));
    if (field === 'childrenNoSeat' && childrenNoSeat < adults)
      dispatch(setPassengerCount({ childrenWithoutSeat: childrenNoSeat + 1 }));
  };

  const handleDecrement = (field: FieldType) => {
    if (field === 'adults' && adults > 1)
      dispatch(setPassengerCount({ adults: adults - 1 }));
    if (field === 'children' && children > 0)
      dispatch(setPassengerCount({ children: children - 1 }));
    if (field === 'childrenNoSeat' && childrenNoSeat > 0)
      dispatch(setPassengerCount({ childrenWithoutSeat: childrenNoSeat - 1 }));
  };

  return (
    <div className={styles.passengerCount}>
      <h3 className={styles.passengerCount__title}>Количество билетов</h3>

      <div className={styles.passengerCount__fields}>
        <div className={styles.passengerCount__fieldWrapper} ref={adultsRef}>
          <button
            type="button"
            className={`${styles.passengerCount__field} ${
              activeField === 'adults'
                ? styles.passengerCount__field_active
                : ''
            }`}
            onClick={() => handleFieldClick('adults')}
          >
            Взрослых — {adults}
          </button>

          {activeField === 'adults' && (
            <div className={styles.passengerCount__popover}>
              <button
                type="button"
                className={styles.passengerCount__counter}
                onClick={() => handleDecrement('adults')}
                disabled={adults <= 1}
              >
                −
              </button>
              <span className={styles.passengerCount__value}>{adults}</span>
              <button
                type="button"
                className={styles.passengerCount__counter}
                onClick={() => handleIncrement('adults')}
                disabled={adults >= 4}
              >
                +
              </button>
            </div>
          )}

          <div className={styles.passengerCount__hint}>
            Можно добавить еще {4 - adults} пассажиров
          </div>
        </div>

        <div className={styles.passengerCount__fieldWrapper} ref={childrenRef}>
          <button
            type="button"
            className={`${styles.passengerCount__field} ${
              activeField === 'children'
                ? styles.passengerCount__field_active
                : ''
            }`}
            onClick={() => handleFieldClick('children')}
          >
            Детских — {children}
          </button>

          {activeField === 'children' && (
            <div className={styles.passengerCount__popover}>
              <button
                type="button"
                className={styles.passengerCount__counter}
                onClick={() => handleDecrement('children')}
                disabled={children <= 0}
              >
                −
              </button>
              <span className={styles.passengerCount__value}>{children}</span>
              <button
                type="button"
                className={styles.passengerCount__counter}
                onClick={() => handleIncrement('children')}
                disabled={children >= adults - 1}
              >
                +
              </button>
            </div>
          )}

          <div className={styles.passengerCount__hintRight}>
            Можно добавить еще {Math.max(0, adults - 1 - children)} детей до 10
            лет. Одно место в вагоне, как у взрослого, но с оплатой 50%
          </div>
        </div>

        <div
          className={styles.passengerCount__fieldWrapper}
          ref={childrenNoSeatRef}
        >
          <button
            type="button"
            className={`${styles.passengerCount__field} ${
              activeField === 'childrenNoSeat'
                ? styles.passengerCount__field_active
                : ''
            }`}
            onClick={() => handleFieldClick('childrenNoSeat')}
          >
            Детских «без места» — {childrenNoSeat}
          </button>

          {activeField === 'childrenNoSeat' && (
            <div className={styles.passengerCount__popover}>
              <button
                type="button"
                className={styles.passengerCount__counter}
                onClick={() => handleDecrement('childrenNoSeat')}
                disabled={childrenNoSeat <= 0}
              >
                −
              </button>
              <span className={styles.passengerCount__value}>
                {childrenNoSeat}
              </span>
              <button
                type="button"
                className={styles.passengerCount__counter}
                onClick={() => handleIncrement('childrenNoSeat')}
                disabled={childrenNoSeat >= adults}
              >
                +
              </button>
            </div>
          )}

          <div className={styles.passengerCount__hintRight}>
            Можно добавить еще {Math.max(0, adults - childrenNoSeat)} детей до 5
            лет. Без места, на руках у взрослого
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerCount;

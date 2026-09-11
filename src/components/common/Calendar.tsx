import { useState, useRef, useEffect } from 'react';
import styles from './Calendar.module.scss';

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

type CalendarProps = {
  onSelect?: (date: string) => void;
  onClose?: () => void;
};

const Calendar = ({ onSelect, onClose }: CalendarProps) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(
    today.getDate()
  );

  const calendarRef = useRef<HTMLDivElement>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  let startOffset = firstDayOfMonth.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const cells: { day: number; type: 'prev' | 'current' | 'next' }[] = [];

  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, type: 'prev' });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ day: i, type: 'current' });
  }

  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ day: nextDay++, type: 'next' });
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        if (onClose) onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const handleDayClick = (day: number, type: string) => {
    if (type === 'current') {
      setSelectedDay(day);
      if (onSelect) {
        const formatted = `${String(day).padStart(2, '0')}.${String(
          month + 1
        ).padStart(2, '0')}.${year}`;
        onSelect(formatted);
      }
    }
  };

  return (
    <div className={styles.calendar} ref={calendarRef}>
      <div className={styles.calendar__header}>
        <button
          type="button"
          className={styles.calendar__arrow}
          onClick={handlePrevMonth}
        >
          ◄
        </button>
        <span className={styles.calendar__month}>{MONTHS[month]}</span>
        <button
          type="button"
          className={styles.calendar__arrow}
          onClick={handleNextMonth}
        >
          ►
        </button>
      </div>

      <div className={styles.calendar__grid}>
        {cells.map((cell, index) => {
          const isSelected =
            cell.type === 'current' && cell.day === selectedDay;

          const cellDate = new Date(
            year,
            cell.type === 'prev'
              ? month - 1
              : cell.type === 'next'
                ? month + 1
                : month,
            cell.day
          );
          const dayOfWeek = cellDate.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

          return (
            <button
              key={index}
              type="button"
              className={`${styles.calendar__cell} ${
                cell.type !== 'current' ? styles.calendar__cell_disabled : ''
              } ${isSelected ? styles.calendar__cell_selected : ''} ${
                isWeekend && cell.type === 'current'
                  ? styles.calendar__cell_weekend
                  : ''
              }`}
              onClick={() => handleDayClick(cell.day, cell.type)}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

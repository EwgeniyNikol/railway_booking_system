import { useState } from 'react';
import styles from './TicketsToolbar.module.scss';

type SortValue = 'времени' | 'стоимости' | 'длительности';

type TicketsToolbarProps = {
  foundCount?: number;
  sortBy?: SortValue;
  onSortChange?: (value: SortValue) => void;
  limit?: number;
  onLimitChange?: (value: number) => void;
};

const TicketsToolbar = ({
  foundCount = 20,
  sortBy = 'времени',
  onSortChange,
  limit = 5,
  onLimitChange,
}: TicketsToolbarProps) => {
  const [sortOpen, setSortOpen] = useState(false);

  const sortOptions: SortValue[] = ['времени', 'стоимости', 'длительности'];

  const handleSortSelect = (value: SortValue) => {
    if (onSortChange) onSortChange(value);
    setSortOpen(false);
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__found}>найдено {foundCount}</div>

      <div className={styles.toolbar__sort}>
        <span className={styles.toolbar__label}>сортировать по:</span>
        <button
          type="button"
          className={styles.toolbar__sortButton}
          onClick={() => setSortOpen(!sortOpen)}
        >
          {sortBy}
        </button>
        {sortOpen && (
          <ul className={styles.toolbar__sortList}>
            {sortOptions.map((option) => (
              <li
                key={option}
                className={styles.toolbar__sortItem}
                onClick={() => handleSortSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.toolbar__limit}>
        <span className={styles.toolbar__label}>показывать по:</span>
        {[5, 10, 20].map((value) => (
          <button
            key={value}
            type="button"
            className={`${styles.toolbar__limitButton} ${
              value === limit ? styles.toolbar__limitButton_active : ''
            }`}
            onClick={() => onLimitChange && onLimitChange(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicketsToolbar;

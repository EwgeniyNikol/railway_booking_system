import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.pagination__arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg width="18" height="29" viewBox="0 0 18 29" fill="none">
          <path
            d="M15 2L3 14.5L15 27"
            stroke="#928F94"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`${styles.pagination__page} ${
            page === currentPage ? styles.pagination__page_active : ''
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={styles.pagination__arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg width="18" height="29" viewBox="0 0 18 29" fill="none">
          <path
            d="M3 2L15 14.5L3 27"
            stroke="#928F94"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;

import { useNavigate } from 'react-router-dom';
import styles from './ChooseAnotherButton.module.scss';

type ChooseAnotherButtonProps = {
  onClick?: () => void;
  direction?: 'forward' | 'backward';
};

const ChooseAnotherButton = ({
  onClick,
  direction = 'forward',
}: ChooseAnotherButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/choose-train');
    }
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${
        direction === 'backward' ? styles.button_backward : ''
      }`}
      onClick={handleClick}
    >
      {direction === 'forward' ? (
        <span className={styles.button__icon}>
          <img src="/src/images/arrow-right-white.svg" alt="" />
        </span>
      ) : (
        <img
          src="/src/images/arrow-back-white.svg"
          alt=""
          className={styles.button__iconFull}
        />
      )}
      <span className={styles.button__text}>Выбрать другой поезд</span>
    </button>
  );
};

export default ChooseAnotherButton;

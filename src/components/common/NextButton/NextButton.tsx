import { useNavigate } from 'react-router-dom';
import styles from './NextButton.module.scss';

type NextButtonProps = {
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: string;
};

const NextButton = ({
  to,
  onClick,
  disabled = false,
  children = 'Далее',
}: NextButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    if (to) navigate(to);
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${disabled ? styles.button_disabled : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default NextButton;

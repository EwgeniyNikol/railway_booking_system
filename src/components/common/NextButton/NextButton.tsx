import { useNavigate } from 'react-router-dom';
import styles from './NextButton.module.scss';

type NextButtonProps = {
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
  wide?: boolean;
  children?: string;
};

const NextButton = ({
  to,
  onClick,
  disabled = false,
  wide = false,
  children = 'Далее',
}: NextButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    if (to) navigate(to);
  };

  const className = [
    styles.button,
    wide ? styles.button_wide : '',
    disabled ? styles.button_disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default NextButton;

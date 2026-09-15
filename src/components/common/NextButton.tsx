import styles from './NextButton.module.scss';

type NextButtonProps = {
  onClick?: () => void;
  children?: string;
};

const NextButton = ({ onClick, children = 'Далее' }: NextButtonProps) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default NextButton;

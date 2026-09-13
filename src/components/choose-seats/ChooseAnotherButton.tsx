import styles from './ChooseAnotherButton.module.scss';

type ChooseAnotherButtonProps = {
  onClick?: () => void;
};

const ChooseAnotherButton = ({ onClick }: ChooseAnotherButtonProps) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <span className={styles.button__icon}>
        <img src="/src/images/arrow-right-white.svg" alt="" />
      </span>
      <span className={styles.button__text}>Выбрать другой поезд</span>
    </button>
  );
};

export default ChooseAnotherButton;

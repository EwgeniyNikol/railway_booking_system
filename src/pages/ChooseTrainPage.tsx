import HeaderTrain from '../components/choose-train/HeaderTrain';
import ProgressSteps from '../components/choose-train/ProgressSteps';
import Sidebar from '../components/choose-train/Sidebar';
import LastTickets from '../components/choose-train/LastTickets';
import styles from './ChooseTrainPage.module.scss';

const ChooseTrainPage = () => {
  return (
    <>
      <HeaderTrain />
      <ProgressSteps />
      <div className={styles.page}>
        <div className={styles.page__sidebar}>
          <Sidebar />
          <LastTickets />
        </div>
      </div>
    </>
  );
};

export default ChooseTrainPage;

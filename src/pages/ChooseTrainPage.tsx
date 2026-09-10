import HeaderTrain from '../components/choose-train/HeaderTrain';
import ProgressSteps from '../components/choose-train/ProgressSteps';
import Sidebar from '../components/choose-train/Sidebar';
import styles from './ChooseTrainPage.module.scss';

const ChooseTrainPage = () => {
  return (
    <>
      <HeaderTrain />
      <ProgressSteps />
      <div className={styles.page}>
        <Sidebar />
      </div>
    </>
  );
};

export default ChooseTrainPage;

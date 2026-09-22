import { useEffect, useState } from 'react';
import styles from './LoadingBar.module.scss';

type LoadingBarProps = {
  isLoading: boolean;
};

const LoadingBar = ({ isLoading }: LoadingBarProps) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const t = setTimeout(() => {
        setVisible(true);
        setProgress(0);
      }, 0);
      return () => clearTimeout(t);
    }

    const t1 = setTimeout(() => setProgress(100), 0);
    const t2 = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading || !visible) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        const step = prev < 50 ? 8 : prev < 75 ? 4 : 1;
        return Math.min(prev + step, 90);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading, visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.bar}>
      <div className={styles.bar__fill} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default LoadingBar;

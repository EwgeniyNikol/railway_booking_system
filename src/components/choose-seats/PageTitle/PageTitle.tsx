import styles from './PageTitle.module.scss';

type PageTitleProps = {
  children: string;
};

const PageTitle = ({ children }: PageTitleProps) => {
  return <h1 className={styles.pageTitle}>{children}</h1>;
};

export default PageTitle;

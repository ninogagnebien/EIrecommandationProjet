import Header from '../Header/Header';

import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.LayoutContainer}>
      <Header />
      <div className={styles.LayoutContent}>{children}</div>
    </div>
  );
};

export default Layout;

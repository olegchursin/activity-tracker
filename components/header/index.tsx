import styles from './Header.module.css';

const Header: React.FunctionComponent = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerName}>Header</div>
    </header>
  );
};

export default Header;

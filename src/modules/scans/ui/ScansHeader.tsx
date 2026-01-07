import { Link } from '@tanstack/react-router';

type Styles = Record<string, string>;

export const ScansHeader = ({ styles }: { styles: Styles }) => {
  return (
    <div className={styles.pageHeader}>
      <div>
        <h1 className={styles.title}>Сканы</h1>
        <p className={styles.subtitle}>История запусков групп сканирования (groupId).</p>
      </div>

      <div className={styles.headerActions}>
        <Link to="/dashboard" className={styles.primaryLink}>
          Запустить новый
        </Link>
      </div>
    </div>
  );
};

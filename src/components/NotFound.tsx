import { Link } from '@tanstack/react-router';

type Styles = Record<string, string>;

export const NotFound = ({ styles }: { styles: Styles }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTag}>NOT FOUND</div>
          <h2 className={styles.cardTitle}>Группа не найдена</h2>
        </div>
        <Link to="/scans" className={styles.ghostBtn}>
          К списку
        </Link>
      </div>

      <div className={styles.hint}>
        Проверь groupId в URL или права доступа (ownership на backend).
      </div>
    </div>
  );
};

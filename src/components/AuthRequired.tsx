import { Link } from '@tanstack/react-router';

type Styles = Record<string, string>;

export const AuthRequired = ({ styles }: { styles: Styles }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTag}>AUTH REQUIRED</div>
          <h2 className={styles.cardTitle}>Требуется авторизация</h2>
        </div>
      </div>

      <div className={styles.authRequired}>
        <div className={styles.authTitle}>Войдите, чтобы открыть группу</div>
        <div className={styles.authText}>Детали сканов доступны только авторизованным.</div>
        <Link to="/auth" className={styles.primaryBtn}>
          Перейти к входу
        </Link>
      </div>
    </div>
  );
};

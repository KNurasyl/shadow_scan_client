import { Link } from '@tanstack/react-router';

type Styles = Record<string, string>;

export const AuthRequiredCard = ({ styles }: { styles: Styles }) => {
  return (
    <div className={styles.card}>
      <div className={styles.emptyTitle}>Требуется авторизация</div>
      <div className={styles.emptyText}>
        Чтобы просматривать историю запусков, войдите в систему.
      </div>
      <Link to="/auth" className={styles.primaryLink}>
        Перейти к входу
      </Link>
    </div>
  );
};

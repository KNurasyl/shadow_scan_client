import { Link } from '@tanstack/react-router';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
  user: { email: string } | null;
};

export const DashboardHeader = ({ styles, user }: Props) => {
  return (
    <div className={styles.pageHeader}>
      <div>
        <h1 className={styles.title}>Панель</h1>
        <p className={styles.subtitle}>
          Запускайте OSINT-сканы по таргету и получайте статус выполнения в реальном времени.
        </p>
      </div>

      <div className={styles.headerActions}>
        {user ? (
          <div className={styles.userPill}>
            <span className={styles.userDot} />
            {user.email}
          </div>
        ) : (
          <Link to="/auth" className={styles.headerLink}>
            Войти
          </Link>
        )}
      </div>
    </div>
  );
};

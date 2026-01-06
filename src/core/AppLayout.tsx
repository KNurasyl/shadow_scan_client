import { Link, Outlet } from '@tanstack/react-router';
import { userStore } from '../share/store/user.store';
import styles from './AppLayout.module.css';

export const AppLayout = () => {
  const { user, logout } = userStore((s) => ({
    user: s.user,
    logout: s.logout,
  }));

  return (
    <div className={styles.appLayout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <Link to="/" className={styles.logoText}>
              Shadow Scan
            </Link>
          </div>

          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>
              Главная
            </Link>
          </nav>

          <div className={styles.navActions}>
            {!user ? (
              <>
                <Link to="/auth" className={styles.navGhost}>
                  Войти
                </Link>
                <button className={styles.navPrimary}>Пробный анализ</button>
              </>
            ) : (
              <>
                <span className={styles.userName}>{user.email}</span>
                <button className={styles.navGhost} onClick={logout}>
                  Выйти
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className={styles.appLayoutContent}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerLeft}>
            © {new Date().getFullYear()} Shadow Scan. Digital Footprint Intelligence.
          </span>
        </div>
      </footer>
    </div>
  );
};

import { Link, Outlet } from '@tanstack/react-router'
import styles from './AppLayout.module.css'

export const AppLayout = () => {
	return (
		<div className={styles.appLayout}>
			<header className={styles.header}>
				<div className={styles.headerInner}>
					<div className={styles.logo}>
						<Link
							to='/'
							activeOptions={{ exact: true }}
							activeProps={{
								className: `${styles.logoText} ${styles.logoTextActive}`,
							}}
							inactiveProps={{ className: styles.logoText }}
						>
							Shadow Scan
						</Link>
					</div>

					<nav className={styles.nav}>
						<Link
							to='/'
							activeOptions={{ exact: true }}
							activeProps={{
								className: `${styles.navLink} ${styles.navLinkActive}`,
							}}
							inactiveProps={{ className: styles.navLink }}
						>
							Главная
						</Link>
					</nav>

					<div className={styles.navActions}>
						<button className={styles.navGhost}>Войти</button>
						<button className={styles.navPrimary}>Пробный анализ</button>
					</div>
				</div>
			</header>

			<main className={styles.appLayoutContent}>
				<Outlet />
			</main>

			<footer className={styles.footer}>
				<div className={styles.footerInner}>
					<span className={styles.footerLeft}>
						© {new Date().getFullYear()} Shadow Scan. Digital Footprint
						Intelligence.
					</span>

					<div className={styles.footerRight}>
						<a href='#' className={styles.footerLink}>
							Privacy
						</a>
						<a href='#' className={styles.footerLink}>
							Terms
						</a>
						<a href='#' className={styles.footerLink}>
							Status
						</a>
					</div>
				</div>
			</footer>
		</div>
	)
}

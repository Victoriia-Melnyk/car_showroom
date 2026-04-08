import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.header__container}>
				<nav className={styles.header__nav}>
					<Link to="/" className={styles.header__logo}>
						<span className={styles.header__icon} aria-hidden="true">
							🚗
						</span>
						<span className={styles.header__brand}>Car Showroom</span>
					</Link>
				</nav>
			</div>
		</header>
	);
}

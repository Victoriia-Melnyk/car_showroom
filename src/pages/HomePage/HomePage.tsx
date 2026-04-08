import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { VehicleCard } from '../../components/VehicleCard/VehicleCard';
import styles from './HomePage.module.css';
import type { Vehicle, VehiclesResponse } from '../../types/vehicle';

export function HomePage() {
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [search, setSearch] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch('https://dummyjson.com/products/category/vehicle')
			.then(res => {
				if (!res.ok) throw new Error('Failed to fetch');
				return res.json();
			})
			.then((data: VehiclesResponse) => {
				console.log('Fetched vehicles:', data.products);
				setVehicles(data.products);
				setLoading(false);
			})
			.catch(() => {
				setError(true);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedSearch(search);
		}, 300);

		return () => clearTimeout(timeout);
	}, [search]);

	const filteredVehicles = useMemo(() => {
		return vehicles.filter(vehicle =>
			`${vehicle.brand} ${vehicle.title}`
				.toLowerCase()
				.includes(debouncedSearch.toLowerCase()),
		);
	}, [vehicles, debouncedSearch]);

	if (loading) return <p>Loading cars...</p>;
	if (error) return <p>Something went wrong</p>;

	return (
		<div className={styles.home}>
			<section className={styles.home__hero}>
				<h1 className={styles.home__title}>Find your perfect car</h1>

				<p className={styles.home__subtitle}>
					Browse our premium collection of vehicles
				</p>

				<form
					className={styles.home__search}
					onSubmit={e => e.preventDefault()}
				>
					<input
						id="search"
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder="Search by brand or model..."
					/>
				</form>
			</section>

			<p className={styles.home__results}>
				{filteredVehicles.length > 0 && `${filteredVehicles.length} cars found`}
			</p>

			<ul className={styles.home__list}>
				{filteredVehicles.map(vehicle => (
					<li key={vehicle.id} className={styles.home__item}>
						<Link to={`/vehicles/${vehicle.id}`}>
							<VehicleCard vehicle={vehicle} />
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

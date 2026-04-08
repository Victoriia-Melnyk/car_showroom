import { memo } from 'react';
import type { Vehicle } from '../../types/vehicle';
import styles from './VehicleCard.module.css';

type Props = {
	vehicle: Vehicle;
};

export const VehicleCard = memo(function VehicleCard({ vehicle }: Props) {
	return (
		<article className={styles.card}>
			<div className={styles.card__imageWrapper}>
				{vehicle.availabilityStatus === 'In Stock' && (
					<span className={styles.card__badge}>In stock</span>
				)}

				<img
					src={vehicle.thumbnail}
					alt={`${vehicle.brand} ${vehicle.title}`}
					className={styles.card__image}
				/>
			</div>

			<div className={styles.card__content}>
				<h3 className={styles.card__title}>
					{vehicle.brand} {vehicle.title}
				</h3>

				<p className={styles.card__price}>${vehicle.price}</p>

				<p className={styles.card__rating}>⭐ {vehicle.rating}</p>
			</div>
		</article>
	);
});

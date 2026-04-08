import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Vehicle } from '../../types/vehicle';
import { CommentForm } from '../../components/CommentForm/CommentForm';
import { CommentList } from '../../components/CommentList/CommentList';
import styles from './VehiclePage.module.css';

export function VehiclePage() {
	const { id } = useParams<{ id?: string }>();

	const [vehicle, setVehicle] = useState<Vehicle | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [comment, setComment] = useState('');
	const [localComments, setLocalComments] = useState<string[]>(() => {
		const stored = JSON.parse(localStorage.getItem('comments') || '{}');
		return id ? stored[id] || [] : [];
	});

	useEffect(() => {
		if (!id) return;
		fetch(`https://dummyjson.com/products/${id}`)
			.then(res => {
				if (!res.ok) throw new Error('Failed to fetch');
				return res.json();
			})
			.then((data: Vehicle) => {
				setVehicle(data);
				setLoading(false);
			})
			.catch(() => {
				setError(true);
				setLoading(false);
			});
	}, [id]);

	const allComments = useMemo(() => {
		const apiComments =
			vehicle?.reviews?.map(review => ({
				text: review.comment,
				author: review.reviewerName,
			})) || [];

		const localFormatted = localComments.map(c => ({
			text: c,
			author: 'You',
		}));

		return [...apiComments, ...localFormatted];
	}, [vehicle, localComments]);

	const handleSubmit = useCallback(
		(e: React.SyntheticEvent) => {
			e.preventDefault();

			if (!comment.trim() || !id) return;

			const stored = JSON.parse(localStorage.getItem('comments') || '{}');
			const vehicleComments = stored[id] || [];

			const updatedComments = [...vehicleComments, comment];

			const updated: Record<string, string[]> = {
				...stored,
				[id]: updatedComments,
			};

			localStorage.setItem('comments', JSON.stringify(updated));

			setLocalComments(updatedComments);
			setComment('');
		},
		[comment, id],
	);

	if (!id) return <p>Invalid vehicle ID</p>;
	if (loading) return <p role="status">Loading vehicle...</p>;
	if (error || !vehicle) return <p role="alert">Failed to load vehicle</p>;

	return (
		<article className={styles.page}>
			<section className={styles.top}>
				<div className={styles.top__left}>
					<ul className={styles.gallery}>
						{vehicle.images.map((img, index) => (
							<li key={index}>
								<img
									src={img}
									alt={`${vehicle.brand} ${vehicle.title}`}
									className={styles.gallery__image}
								/>
							</li>
						))}
					</ul>
				</div>

				<section className={styles.top__right}>
					<h1 className={styles.info__title}>
						{vehicle.brand} {vehicle.title}
					</h1>

					<p className={styles.info__price}>${vehicle.price}</p>
					<p className={styles.info__rating}>⭐ {vehicle.rating}</p>

					<p className={styles.info__description}>{vehicle.description}</p>

					<button type="button" className={styles.info__cta}>
						Contact dealer
					</button>

					<dl className={styles.info__grid}>
						<dt>Availability</dt>
						<dd>{vehicle.availabilityStatus}</dd>

						<dt>Stock</dt>
						<dd>{vehicle.stock}</dd>

						<dt>Warranty</dt>
						<dd>{vehicle.warrantyInformation}</dd>

						<dt>Shipping</dt>
						<dd>{vehicle.shippingInformation}</dd>

						<dt>Weight</dt>
						<dd>{vehicle.weight} kg</dd>

						<dt>Dimensions</dt>
						<dd>
							{vehicle.dimensions.width} × {vehicle.dimensions.height} ×{' '}
							{vehicle.dimensions.depth}
						</dd>
					</dl>
				</section>
			</section>

			<section className={styles.comments}>
				<CommentForm
					comment={comment}
					setComment={setComment}
					onSubmit={handleSubmit}
				/>

				<CommentList comments={allComments} />
			</section>
		</article>
	);
}

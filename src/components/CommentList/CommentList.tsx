import type { Comment } from '../../types/vehicle';
import styles from './CommentList.module.css';

type Props = {
	comments: Comment[];
};

export function CommentList({ comments }: Props) {
	return (
		<section className={styles.list}>
			<h2 className={styles.list__title}>Comments</h2>

			{comments.length === 0 ? (
				<p className={styles.list__empty}>No comments yet</p>
			) : (
				<ul className={styles.list__items}>
					{comments.map((comment, i) => (
						<li key={`${comment.text}-${i}`}>
							<article className={styles.list__item}>
								<p className={styles.list__author}>{comment.author}</p>
								<p className={styles.list__text}>{comment.text}</p>
							</article>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}

import styles from './CommentForm.module.css';

type Props = {
	comment: string;
	setComment: (value: string) => void;
	onSubmit: (e: React.SyntheticEvent) => void;
};

export function CommentForm({ comment, setComment, onSubmit }: Props) {
	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<textarea
				id="comment"
				className={styles.form__input}
				value={comment}
				onChange={e => setComment(e.target.value)}
				placeholder="Write a comment..."
				rows={3}
				required
				maxLength={200}
			/>

			<button type="submit" className={styles.form__button}>
				Add
			</button>
		</form>
	);
}

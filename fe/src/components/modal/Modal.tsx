import styles from './Modal.module.css';

function Modal({children}: ModalProps) {
	return (
		<div className={styles.Modal}>
			<div className={styles.ModalContent}>
				{children}
			</div>
		</div>
	);
}
interface ModalProps {
	children: React.ReactNode;
}

export default Modal;

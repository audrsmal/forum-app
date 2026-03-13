import styles from "./styles.module.css";

type ConfirmModalProps = {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDanger?: boolean;
};

const ConfirmModal = ({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDanger = false,
}: ConfirmModalProps) => {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{title}</h2>

        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onCancel}>
            {cancelText}
          </button>

          <button
            className={isDanger ? styles.dangerButton : styles.confirmButton}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

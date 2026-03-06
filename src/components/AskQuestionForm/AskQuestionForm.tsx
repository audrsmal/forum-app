import { useState } from "react";
import styles from "./styles.module.css";

type AskQuestionFormProps = {
  topic: string;
  onSubmit: (data: {
    title: string;
    body: string;
    topic: string;
  }) => Promise<void>;
  onClose: () => void;
};

const AskQuestionForm = ({
  topic,
  onSubmit,
  onClose,
}: AskQuestionFormProps) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);

    try {
      await onSubmit({
        title,
        body,
        topic,
      });

      setTitle("");
      setBody("");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Ask question</h2>

        <div className={styles.field}>
          <div className={styles.fieldTitle}>Title</div>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.fieldTitle}>Body</div>
          <textarea
            className={styles.textarea}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.secondaryButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.button} onClick={submit} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionForm;

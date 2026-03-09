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
    if (!title.trim() || !body.trim()) return;

    setLoading(true);

    try {
      await onSubmit({
        title: title.trim(),
        body: body.trim(),
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

        <div className={styles.form}>
          <div className={styles.field}>
            <div className={styles.label}>Title</div>
            <input
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write your question title"
            />
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Body</div>
            <textarea
              className={styles.textarea}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Describe your question"
            />
          </div>

          <div className={styles.actions}>
            <button
              className={styles.secondaryButton}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className={styles.button}
              onClick={submit}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionForm;

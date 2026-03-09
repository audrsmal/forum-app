import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

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

  const [showClearDraftModal, setShowClearDraftModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const hasDraft = title.trim() || body.trim();

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

  const onCloseRequest = () => {
    if (hasDraft) {
      setShowLeaveModal(true);
      return;
    }

    onClose();
  };

  const onClearDraft = () => {
    setTitle("");
    setBody("");
    setShowClearDraftModal(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasDraft) return;

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasDraft]);

  return (
    <>
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
                onClick={() => setShowClearDraftModal(true)}
                disabled={loading || !hasDraft}
              >
                Clear draft
              </button>

              <button
                className={styles.secondaryButton}
                onClick={onCloseRequest}
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

      {showClearDraftModal ? (
        <ConfirmModal
          title="Clear draft"
          message="Do you want to remove everything you wrote?"
          confirmText="Clear"
          cancelText="Cancel"
          onConfirm={onClearDraft}
          onCancel={() => setShowClearDraftModal(false)}
        />
      ) : null}

      {showLeaveModal ? (
        <ConfirmModal
          title="Leave page"
          message="You have unsaved changes. Are you sure you want to close this form?"
          confirmText="Leave"
          cancelText="Stay"
          isDanger
          onConfirm={() => {
            setShowLeaveModal(false);
            onClose();
          }}
          onCancel={() => setShowLeaveModal(false)}
        />
      ) : null}
    </>
  );
};

export default AskQuestionForm;

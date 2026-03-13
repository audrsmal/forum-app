import { useRouter } from "next/router";
import styles from "./styles.module.css";
import { QuestionType } from "../../api/questions";
import { formatDate } from "../../utils/formatDate";

type QuestionCardProps = {
  question: QuestionType;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onDelete?: (id: string) => void;
  canDelete?: boolean;
};

export default function QuestionCard({
  question,
  onLike,
  onDislike,
  onDelete,
  canDelete,
}: QuestionCardProps) {
  const router = useRouter();

  const openQuestion = () => {
    router.push(`/question/${question.id}`);
  };

  return (
    <article className={styles.card}>
      <div className={styles.mainArea} onClick={openQuestion}>
        <div className={styles.header}>
          <div className={styles.meta}>
            <span>{question.author?.name || "Unknown author"}</span>
            <span>•</span>
            <span>{formatDate(question.createdAt)}</span>
          </div>
        </div>

        <h2 className={styles.title}>{question.title}</h2>

        <div className={styles.body}>{question.body}</div>
      </div>

      <div className={styles.footer}>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>
              {question.answersCount || 0}
            </span>
            <span className={styles.statLabel}>answers</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={
              question.userVote === 1 ? styles.activeButton : styles.button
            }
            onClick={() => onLike(question.id)}
          >
            👍 {question.likes ?? 0}
          </button>

          <button
            className={
              question.userVote === -1 ? styles.activeButton : styles.button
            }
            onClick={() => onDislike(question.id)}
          >
            👎 {question.dislikes ?? 0}
          </button>

          {canDelete ? (
            <button
              className={styles.deleteButton}
              onClick={() => onDelete?.(question.id)}
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

import Link from "next/link";
import styles from "./styles.module.css";
import { QuestionType } from "../../api/questions";
import { formatDate } from "../../utils/formatDate";

type QuestionCardProps = {
  question: QuestionType;
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
  onDelete?: (id: string) => void;
  canDelete?: boolean;
};

const QuestionCard = ({
  question,
  onLike,
  onDislike,
  onDelete,
  canDelete,
}: QuestionCardProps) => {
  return (
    <div className={styles.card}>
      <Link href={`/question/${question.id}`} className={styles.content}>
        <div className={styles.top}>
          <div className={styles.title}>{question.title}</div>
          <div className={styles.answers}>
            Answers: {question.answersCount ?? 0}
          </div>
        </div>

        <div className={styles.meta}>
          <span>{question.author?.name || "Unknown author"}</span>
          <span>•</span>
          <span>{formatDate(question.createdAt)}</span>
        </div>

        <div className={styles.body}>{question.body}</div>
      </Link>

      <div className={styles.actions}>
        <button
          className={
            question.userVote === 1 ? styles.activeButton : styles.button
          }
          onClick={() => onLike?.(question.id)}
        >
          👍 {question.likes ?? 0}
        </button>

        <button
          className={
            question.userVote === -1 ? styles.activeButton : styles.button
          }
          onClick={() => onDislike?.(question.id)}
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
  );
};

export default QuestionCard;

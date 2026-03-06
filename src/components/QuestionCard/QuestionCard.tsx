import Link from "next/link";
import styles from "./styles.module.css";
import { QuestionType } from "../../api/questions";

type QuestionCardProps = {
  question: QuestionType;
};

const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <Link href={`/question/${question.id}`} className={styles.card}>
      <div className={styles.top}>
        <div className={styles.title}>{question.title}</div>
        <div className={styles.answers}>
          Answers: {question.answersCount ?? 0}
        </div>
      </div>

      <div className={styles.body}>{question.body}</div>
    </Link>
  );
};

export default QuestionCard;

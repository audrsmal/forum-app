import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

import {
  AnswerType,
  createAnswer,
  getAnswersByQuestionId,
  getQuestionById,
  QuestionType,
} from "../../api/questions";

export default function QuestionPage() {
  const router = useRouter();
  const { id } = router.query;

  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [answerBody, setAnswerBody] = useState("");

  const fetchData = async () => {
    if (!id || typeof id !== "string") return;

    const questionResponse = await getQuestionById(id);
    const answersResponse = await getAnswersByQuestionId(id);

    setQuestion(questionResponse.question);
    setAnswers(answersResponse.answers);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const onCreateAnswer = async () => {
    if (!id || typeof id !== "string" || !answerBody.trim()) return;

    await createAnswer(id, { body: answerBody });
    setAnswerBody("");
    await fetchData();
  };

  if (!question) {
    return <div className={styles.main}>Loading...</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.questionBox}>
        <h1 className={styles.title}>{question.title}</h1>
        <div className={styles.body}>{question.body}</div>
      </div>

      <div className={styles.answerForm}>
        <div className={styles.fieldTitle}>Your answer</div>
        <textarea
          className={styles.textarea}
          value={answerBody}
          onChange={(e) => setAnswerBody(e.target.value)}
        />
        <button className={styles.button} onClick={onCreateAnswer}>
          Submit answer
        </button>
      </div>

      <div className={styles.answers}>
        {answers.map((answer) => (
          <div key={answer.id} className={styles.answerCard}>
            {answer.body}
          </div>
        ))}
      </div>
    </div>
  );
}

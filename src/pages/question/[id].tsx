import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "./styles.module.css";

import PageTemplate from "../../components/PageTemplate/PageTemplate";
import {
  AnswerType,
  createAnswer,
  deleteAnswer,
  deleteQuestion,
  dislikeAnswer,
  dislikeQuestion,
  getAnswersByQuestionId,
  getQuestionById,
  likeAnswer,
  likeQuestion,
  QuestionType,
} from "../../api/questions";
import { formatDate } from "../../utils/formatDate";
import { api } from "../../api/axios";

type MeResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export default function QuestionPage() {
  const router = useRouter();
  const { id } = router.query;

  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [answerBody, setAnswerBody] = useState("");
  const [userId, setUserId] = useState<string>("");

  const fetchMe = async () => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const response = await api.get<MeResponse>("/users/me");
      setUserId(response.data.user.id);
    } catch {
      setUserId("");
    }
  };

  const fetchData = async (currentUserId?: string) => {
    if (!id || typeof id !== "string") return;

    const finalUserId = currentUserId || userId || undefined;

    const questionResponse = await getQuestionById(id, finalUserId);
    const answersResponse = await getAnswersByQuestionId(id, finalUserId);

    setQuestion(questionResponse.question);
    setAnswers(answersResponse.answers);
  };

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    fetchData();
  }, [id, userId]);

  const onCreateAnswer = async () => {
    if (!id || typeof id !== "string" || !answerBody.trim()) return;

    await createAnswer(id, { body: answerBody });
    setAnswerBody("");
    await fetchData();
  };

  const onLikeQuestion = async () => {
    if (!id || typeof id !== "string") return;

    await likeQuestion(id);
    await fetchData();
  };

  const onDislikeQuestion = async () => {
    if (!id || typeof id !== "string") return;

    await dislikeQuestion(id);
    await fetchData();
  };

  const onDeleteQuestion = async () => {
    if (!id || typeof id !== "string") return;

    const confirmed = confirm("Are you sure you want to delete this question?");
    if (!confirmed) return;

    await deleteQuestion(id);
    router.push("/main");
  };

  const onLikeAnswer = async (answerId: string) => {
    await likeAnswer(answerId);
    await fetchData();
  };

  const onDislikeAnswer = async (answerId: string) => {
    await dislikeAnswer(answerId);
    await fetchData();
  };

  const onDeleteAnswer = async (answerId: string) => {
    const confirmed = confirm("Delete this answer?");
    if (!confirmed) return;

    await deleteAnswer(answerId);
    await fetchData();
  };

  return (
    <PageTemplate>
      <div className={styles.main}>
        {!question ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className={styles.questionBox}>
              <h1 className={styles.title}>{question.title}</h1>

              <div className={styles.meta}>
                <span>{question.author?.name || "Unknown author"}</span>
                <span>•</span>
                <span>{formatDate(question.createdAt)}</span>
              </div>

              <div className={styles.body}>{question.body}</div>

              <div className={styles.actions}>
                <button
                  className={
                    question.userVote === 1
                      ? styles.activeButton
                      : styles.button
                  }
                  onClick={onLikeQuestion}
                >
                  👍 {question.likes ?? 0}
                </button>

                <button
                  className={
                    question.userVote === -1
                      ? styles.activeButton
                      : styles.button
                  }
                  onClick={onDislikeQuestion}
                >
                  👎 {question.dislikes ?? 0}
                </button>

                {question.userId === userId ? (
                  <button
                    className={styles.deleteButton}
                    onClick={onDeleteQuestion}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Answers</h2>

              <div className={styles.answers}>
                {answers.length > 0 ? (
                  answers.map((answer) => (
                    <div key={answer.id} className={styles.answerCard}>
                      <div className={styles.answerMeta}>
                        <span>{answer.author?.name || "Unknown author"}</span>
                        <span>•</span>
                        <span>{formatDate(answer.createdAt)}</span>
                      </div>

                      <div className={styles.answerBody}>{answer.body}</div>

                      <div className={styles.actions}>
                        <button
                          className={
                            answer.userVote === 1
                              ? styles.activeButton
                              : styles.button
                          }
                          onClick={() => onLikeAnswer(answer.id)}
                        >
                          👍 {answer.likes ?? 0}
                        </button>

                        <button
                          className={
                            answer.userVote === -1
                              ? styles.activeButton
                              : styles.button
                          }
                          onClick={() => onDislikeAnswer(answer.id)}
                        >
                          👎 {answer.dislikes ?? 0}
                        </button>

                        {answer.userId === userId ? (
                          <button
                            className={styles.deleteButton}
                            onClick={() => onDeleteAnswer(answer.id)}
                          >
                            Delete
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.emptyText}>No answers yet.</div>
                )}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Write your answer</h2>

              <div className={styles.answerForm}>
                <textarea
                  className={styles.textarea}
                  value={answerBody}
                  onChange={(e) => setAnswerBody(e.target.value)}
                />
                <button className={styles.button} onClick={onCreateAnswer}>
                  Submit answer
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </PageTemplate>
  );
}

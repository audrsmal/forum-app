import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./styles.module.css";

import PageTemplate from "../../components/PageTemplate/PageTemplate";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
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

export default function QuestionPage() {
  const router = useRouter();
  const { id } = router.query;

  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [answerBody, setAnswerBody] = useState("");
  const [userId, setUserId] = useState<string>("");

  const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(false);
  const [deleteAnswerId, setDeleteAnswerId] = useState<string | null>(null);

  const fetchData = async () => {
    if (!id || typeof id !== "string") return;

    const questionResponse = await getQuestionById(id, userId || undefined);
    const answersResponse = await getAnswersByQuestionId(
      id,
      userId || undefined,
    );

    setQuestion(questionResponse.question);
    setAnswers(answersResponse.answers);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || "";
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    fetchData();
  }, [id, userId]);

  const onCreateAnswer = async () => {
    if (!id || typeof id !== "string" || !answerBody.trim()) return;

    await createAnswer(id, { body: answerBody.trim() });
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

  const onConfirmDeleteQuestion = async () => {
    if (!id || typeof id !== "string") return;

    await deleteQuestion(id);
    setShowDeleteQuestionModal(false);
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

  const onConfirmDeleteAnswer = async () => {
    if (!deleteAnswerId) return;

    await deleteAnswer(deleteAnswerId);
    setDeleteAnswerId(null);
    await fetchData();
  };

  return (
    <PageTemplate>
      <div className={styles.main}>
        {!question ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <>
            <section className={styles.questionSection}>
              <div className={styles.questionTop}>
                <div className={styles.questionTag}>Question</div>
                <div className={styles.questionMeta}>
                  <span>{question.author?.name || "Unknown author"}</span>
                  <span>•</span>
                  <span>{formatDate(question.createdAt)}</span>
                </div>
              </div>

              <h1 className={styles.title}>{question.title}</h1>

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
                    onClick={() => setShowDeleteQuestionModal(true)}
                  >
                    Delete question
                  </button>
                ) : null}
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Answers</h2>
                <div className={styles.sectionCount}>
                  {answers.length} {answers.length === 1 ? "answer" : "answers"}
                </div>
              </div>

              <div className={styles.answers}>
                {answers.length > 0 ? (
                  answers.map((answer) => (
                    <article key={answer.id} className={styles.answerCard}>
                      <div className={styles.answerHeader}>
                        <div className={styles.answerMeta}>
                          <span>{answer.author?.name || "Unknown author"}</span>
                          <span>•</span>
                          <span>{formatDate(answer.createdAt)}</span>
                        </div>
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
                            onClick={() => setDeleteAnswerId(answer.id)}
                          >
                            Delete answer
                          </button>
                        ) : null}
                      </div>
                    </article>
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    No answers yet. Be the first to answer.
                  </div>
                )}
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Write your answer</h2>
              </div>

              <div className={styles.answerForm}>
                <textarea
                  className={styles.textarea}
                  value={answerBody}
                  onChange={(e) => setAnswerBody(e.target.value)}
                  placeholder="Share your answer..."
                />
                <button
                  className={styles.submitButton}
                  onClick={onCreateAnswer}
                  disabled={!answerBody.trim()}
                >
                  Submit answer
                </button>
              </div>

              {question.topic ? (
                <div className={styles.backArea}>
                  <Link
                    href={`/topic/${question.topic}`}
                    className={styles.backButton}
                  >
                    ← Back to {question.topic} questions
                  </Link>
                </div>
              ) : null}
            </section>
          </>
        )}
      </div>

      {showDeleteQuestionModal ? (
        <ConfirmModal
          title="Delete question"
          message="This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          isDanger
          onConfirm={onConfirmDeleteQuestion}
          onCancel={() => setShowDeleteQuestionModal(false)}
        />
      ) : null}

      {deleteAnswerId ? (
        <ConfirmModal
          title="Delete answer"
          message="This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          isDanger
          onConfirm={onConfirmDeleteAnswer}
          onCancel={() => setDeleteAnswerId(null)}
        />
      ) : null}
    </PageTemplate>
  );
}

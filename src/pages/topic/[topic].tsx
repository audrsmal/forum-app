import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "./styles.module.css";

import PageTemplate from "../../components/PageTemplate/PageTemplate";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import TopicToolbar from "../../components/TopicToolbar/TopicToolbar";
import AskQuestionForm from "../../components/AskQuestionForm/AskQuestionForm";
import {
  createQuestion,
  deleteQuestion,
  dislikeQuestion,
  getQuestions,
  likeQuestion,
  QuestionType,
} from "../../api/questions";
import { api } from "../../api/axios";

type MeResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export default function TopicPage() {
  const router = useRouter();
  const { topic } = router.query;

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [filter, setFilter] = useState<"all" | "answered" | "unanswered">(
    "all",
  );
  const [showAskModal, setShowAskModal] = useState(false);
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

  const fetchQuestions = async (currentUserId?: string) => {
    if (!topic || typeof topic !== "string") return;

    const response = await getQuestions({
      topic,
      answered: filter === "all" ? undefined : filter,
      userId: currentUserId || userId || undefined,
    });

    setQuestions(response.questions);
  };

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [topic, filter, userId]);

  const onCreateQuestion = async (data: {
    title: string;
    body: string;
    topic: string;
  }) => {
    await createQuestion(data);
    await fetchQuestions();
  };

  const onLikeQuestion = async (id: string) => {
    await likeQuestion(id);
    await fetchQuestions();
  };

  const onDislikeQuestion = async (id: string) => {
    await dislikeQuestion(id);
    await fetchQuestions();
  };

  const onDeleteQuestion = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this question?");
    if (!confirmed) return;

    await deleteQuestion(id);
    await fetchQuestions();
  };

  return (
    <PageTemplate>
      <div className={styles.main}>
        <TopicToolbar
          filter={filter}
          setFilter={setFilter}
          onAskQuestionClick={() => setShowAskModal(true)}
        />

        <h1 className={styles.title}>{topic}</h1>

        <div className={styles.questions}>
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onLike={onLikeQuestion}
              onDislike={onDislikeQuestion}
              onDelete={onDeleteQuestion}
              canDelete={question.userId === userId}
            />
          ))}
        </div>

        {showAskModal && typeof topic === "string" ? (
          <AskQuestionForm
            topic={topic}
            onSubmit={onCreateQuestion}
            onClose={() => setShowAskModal(false)}
          />
        ) : null}
      </div>
    </PageTemplate>
  );
}

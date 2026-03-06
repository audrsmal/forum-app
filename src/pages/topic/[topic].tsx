import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

import QuestionCard from "../../components/QuestionCard/QuestionCard";
import TopicToolbar from "../../components/TopicToolbar/TopicToolbar";
import AskQuestionForm from "../../components/AskQuestionForm/AskQuestionForm";
import {
  createQuestion,
  getQuestions,
  QuestionType,
} from "../../api/questions";

export default function TopicPage() {
  const router = useRouter();
  const { topic } = router.query;

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [filter, setFilter] = useState<"all" | "answered" | "unanswered">(
    "all",
  );
  const [showAskModal, setShowAskModal] = useState(false);

  const fetchQuestions = async () => {
    if (!topic || typeof topic !== "string") return;

    const response = await getQuestions({
      topic,
      answered: filter === "all" ? undefined : filter,
    });

    setQuestions(response.questions);
  };

  useEffect(() => {
    fetchQuestions();
  }, [topic, filter]);

  const onCreateQuestion = async (data: {
    title: string;
    body: string;
    topic: string;
  }) => {
    await createQuestion(data);
    await fetchQuestions();
  };

  return (
    <div className={styles.main}>
      <TopicToolbar
        filter={filter}
        setFilter={setFilter}
        onAskQuestionClick={() => setShowAskModal(true)}
      />

      <h1 className={styles.title}>{topic}</h1>

      <div className={styles.questions}>
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
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
  );
}

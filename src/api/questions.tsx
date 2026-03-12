import { api } from "./axios";

export type AuthorType = {
  id: string;
  name: string;
  email: string;
};

export type QuestionType = {
  id: string;
  userId: string;
  title: string;
  body: string;
  topic: string;
  createdAt?: string;
  answersCount?: number;
  likes?: number;
  dislikes?: number;
  userVote?: number;
  author?: AuthorType | null;
};

export type AnswerType = {
  id: string;
  questionId: string;
  userId: string;
  body: string;
  createdAt?: string;
  likes?: number;
  dislikes?: number;
  userVote?: number;
  author?: AuthorType | null;
};

export async function getQuestions(params?: {
  topic?: string;
  answered?: "answered" | "unanswered";
  userId?: string;
}) {
  const response = await api.get<{ questions: QuestionType[] }>("/questions", {
    params,
  });

  return response.data;
}

export async function createQuestion(data: {
  title: string;
  body: string;
  topic: string;
}) {
  const response = await api.post("/question", data);
  return response.data;
}

export async function getQuestionById(id: string, userId?: string) {
  const response = await api.get<{ question: QuestionType }>(
    `/question/${id}`,
    {
      params: { userId },
    },
  );

  return response.data;
}

export async function getAnswersByQuestionId(id: string, userId?: string) {
  const response = await api.get<{ answers: AnswerType[] }>(
    `/question/${id}/answers`,
    {
      params: { userId },
    },
  );

  return response.data;
}

export async function createAnswer(id: string, data: { body: string }) {
  const response = await api.post(`/question/${id}/answers`, data);
  return response.data;
}

export async function likeQuestion(id: string) {
  const response = await api.post(`/question/${id}/like`);
  return response.data;
}

export async function dislikeQuestion(id: string) {
  const response = await api.post(`/question/${id}/dislike`);
  return response.data;
}

export async function likeAnswer(id: string) {
  const response = await api.post(`/answer/${id}/like`);
  return response.data;
}

export async function dislikeAnswer(id: string) {
  const response = await api.post(`/answer/${id}/dislike`);
  return response.data;
}
export async function deleteQuestion(id: string) {
  const response = await api.delete(`/question/${id}`);
  return response.data;
}

export async function deleteAnswer(id: string) {
  const response = await api.delete(`/answer/${id}`);
  return response.data;
}

export type TopicStatsType = {
  topic: string;
  questionsCount: number;
  answersCount: number;
};

export async function getTopicStats() {
  const response = await api.get<{ topics: TopicStatsType[] }>("/topics/stats");
  return response.data;
}

import { api } from "./axios";

export type QuestionType = {
  id: string;
  userId: string;
  title: string;
  body: string;
  topic: string;
  createdAt?: string;
  answersCount?: number;
};

export type AnswerType = {
  id: string;
  questionId: string;
  userId: string;
  body: string;
  createdAt?: string;
};

export async function getQuestions(params?: {
  topic?: string;
  answered?: "answered" | "unanswered";
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

export async function getQuestionById(id: string) {
  const response = await api.get<{ question: QuestionType }>(`/question/${id}`);
  return response.data;
}

export async function getAnswersByQuestionId(id: string) {
  const response = await api.get<{ answers: AnswerType[] }>(
    `/question/${id}/answers`,
  );
  return response.data;
}

export async function createAnswer(id: string, data: { body: string }) {
  const response = await api.post(`/question/${id}/answers`, data);
  return response.data;
}

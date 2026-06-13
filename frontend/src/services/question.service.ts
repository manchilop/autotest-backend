import api from "./api";
import { CreateQuestionRequest, QuestionResponse } from "../types/question";

export const createQuestion = async (
  data: CreateQuestionRequest
): Promise<QuestionResponse> => {
  const response = await api.post<QuestionResponse>(
    "/api/questions",
    data
  );

  return response.data;
};

export const getNextQuestion = async (token: string) => {
  const response = await api.get("/api/questions/next", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const answerQuestion = async (
  questionId: number,
  choiceId: number,
  token: string
) => {
  const response = await api.post(
    `/api/questions/${questionId}/answer`,
    { choiceId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getCompletedQuestions = async (token: string) => {
  const response = await api.get("/api/user-questions/completed", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Teacher

export const getPendingQuestions = async () => {
  const response = await api.get(
    "/api/questions?status=PENDING"
  );
  return response.data;
};

export const approveQuestion = async (id: number) => {
  const response = await api.patch(
    `/api/questions/${id}/approve`
  );
  return response.data;
};

export const rejectQuestion = async (id: number) => {
  const response = await api.patch(
    `/api/questions/${id}/reject`
  );
  return response.data;
};
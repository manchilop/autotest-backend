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
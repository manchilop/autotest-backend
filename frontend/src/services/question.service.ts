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
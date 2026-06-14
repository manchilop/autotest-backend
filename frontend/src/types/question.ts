export interface Choice {
  choiceText: string;
  correct: boolean;
}

export interface Question {
  id: number;
  questionText: string;
  choices: Choice[];
}

export interface CreateQuestionRequest {
  questionText: string;
  choices: Choice[];
}

export interface ChoiceResponse {
  id: number;
  choiceText: string;
  correct: boolean;
}

export interface QuestionResponse {
  id: number;
  questionText: string;
  choices: ChoiceResponse[];
}

export interface PracticeQuestionResponse {
  id: number;
  questionText: string;
  choices: PracticeChoiceResponse[];
}

export interface PracticeChoiceResponse {
  id: number;
  choiceText: string;
}

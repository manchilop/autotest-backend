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
}

export interface QuestionResponse {
  id: number;
  questionText: string;
  choices: ChoiceResponse[];
}

export interface LibraryQuestionResponse {
  id: number;
  questionText: string;
  choices: LibraryChoiceResponse[];
}

export interface LibraryChoiceResponse {
  id: number;
  choiceText: string;
  correct: boolean;
}

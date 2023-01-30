export interface Option {
  id: string;
  isHeld: boolean;
  value: string;
}

export interface OriginalQuestionData {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface ModifiedQuestionData {
  question: OriginalQuestionData & { id: string };
  options: Option[];
}

export type AnswerOption = {
  id: number;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  question: string;
  options: AnswerOption[];
  explanation?: string;
};

export type Quiz = {
  id: number;
  title: string;
  description: string;
  questions: Question[];
};

export type UserAnswer = {
  questionId: number;
  selectedOptionId: number;
};

export type QuizResult = {
  quizId: number;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  userAnswers: UserAnswer[];
};

export enum QuizStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}
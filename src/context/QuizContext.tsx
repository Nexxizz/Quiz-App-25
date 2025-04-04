import { createContext, useContext, useState, ReactNode } from 'react';
import { Quiz, QuizResult, UserAnswer, QuizStatus } from '../types/quiz.types';
import { getQuiz } from '../services/mockData';

interface QuizContextType {
  currentQuiz: Quiz | null;
  quizStatus: QuizStatus;
  userAnswers: UserAnswer[];
  currentQuestionIndex: number;
  quizResult: QuizResult | null;
  loadQuiz: (id: number) => void;
  startQuiz: () => void;
  submitAnswer: (questionId: number, selectedOptionId: number) => void;
  goToNextQuestion: () => void;
  goToPrevQuestion: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider = ({ children }: QuizProviderProps) => {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizStatus, setQuizStatus] = useState<QuizStatus>(QuizStatus.NOT_STARTED);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const loadQuiz = (id: number) => {
    const quiz = getQuiz(id);
    if (quiz) {
      setCurrentQuiz(quiz);
      resetQuiz();
    }
  };

  const startQuiz = () => {
    setQuizStatus(QuizStatus.IN_PROGRESS);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResult(null);
  };

  const submitAnswer = (questionId: number, selectedOptionId: number) => {
    setUserAnswers(prevAnswers => {
      // Check if this question has already been answered
      const existingAnswerIndex = prevAnswers.findIndex(
        answer => answer.questionId === questionId
      );

      if (existingAnswerIndex !== -1) {
        // Update existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { questionId, selectedOptionId };
        return updatedAnswers;
      } else {
        // Add new answer
        return [...prevAnswers, { questionId, selectedOptionId }];
      }
    });
  };

  const goToNextQuestion = () => {
    if (currentQuiz && currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const completeQuiz = () => {
    if (!currentQuiz) return;

    const totalQuestions = currentQuiz.questions.length;
    let correctAnswers = 0;

    // Calculate the score
    currentQuiz.questions.forEach(question => {
      const userAnswer = userAnswers.find(answer => answer.questionId === question.id);
      if (userAnswer) {
        const selectedOption = question.options.find(option => option.id === userAnswer.selectedOptionId);
        if (selectedOption && selectedOption.isCorrect) {
          correctAnswers++;
        }
      }
    });

    const score = (correctAnswers / totalQuestions) * 100;

    const result: QuizResult = {
      quizId: currentQuiz.id,
      score,
      correctAnswers,
      totalQuestions,
      userAnswers,
    };

    setQuizResult(result);
    setQuizStatus(QuizStatus.COMPLETED);
  };

  const resetQuiz = () => {
    setQuizStatus(QuizStatus.NOT_STARTED);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setQuizResult(null);
  };

  const value = {
    currentQuiz,
    quizStatus,
    userAnswers,
    currentQuestionIndex,
    quizResult,
    loadQuiz,
    startQuiz,
    submitAnswer,
    goToNextQuestion,
    goToPrevQuestion,
    completeQuiz,
    resetQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
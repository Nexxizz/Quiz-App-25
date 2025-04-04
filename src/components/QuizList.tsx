import { FC, useEffect, useState } from 'react';
import { Quiz } from '../types/quiz.types';
import { getAllQuizzes } from '../services/mockData';
import QuizCard from './QuizCard';
import { useQuiz } from '../context/QuizContext';

const QuizList: FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { loadQuiz, startQuiz } = useQuiz();

  useEffect(() => {
    // In a real app, this could be an API call
    const fetchedQuizzes = getAllQuizzes();
    setQuizzes(fetchedQuizzes);
  }, []);

  const handleStartQuiz = (quizId: number) => {
    loadQuiz(quizId);
    startQuiz();
  };

  return (
    <div className="quiz-list-container">
      <h2>Available Quizzes</h2>
      <div className="quiz-grid">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} onStart={handleStartQuiz} />
        ))}
      </div>
    </div>
  );
};

export default QuizList;
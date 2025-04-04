import { FC } from 'react';
import { Quiz } from '../types/quiz.types';

interface QuizCardProps {
  quiz: Quiz;
  onStart: (quizId: number) => void;
}

const QuizCard: FC<QuizCardProps> = ({ quiz, onStart }) => {
  return (
    <div className="quiz-card">
      <h3>{quiz.title}</h3>
      <p>{quiz.description}</p>
      <div className="quiz-info">
        <span>{quiz.questions.length} questions</span>
      </div>
      <button 
        onClick={() => onStart(quiz.id)}
        className="start-quiz-btn"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizCard;
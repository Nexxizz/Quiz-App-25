import { FC } from 'react';
import { useQuiz } from '../context/QuizContext';
import Question from './Question';

const QuizContainer: FC = () => {
  const { 
    currentQuiz, 
    currentQuestionIndex, 
    goToNextQuestion, 
    goToPrevQuestion, 
    completeQuiz,
    userAnswers
  } = useQuiz();

  if (!currentQuiz) {
    return <div>No quiz loaded</div>;
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  
  // Check if current question has been answered
  const isQuestionAnswered = userAnswers.some(
    answer => answer.questionId === currentQuestion.id
  );

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{currentQuiz.title}</h2>
        <div className="progress-info">
          <span>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</span>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${(currentQuestionIndex + 1) / currentQuiz.questions.length * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <Question question={currentQuestion} />
      
      <div className="quiz-navigation">
        <button 
          className="nav-btn prev" 
          onClick={goToPrevQuestion} 
          disabled={isFirstQuestion}
        >
          Previous
        </button>
        
        {isLastQuestion ? (
          <button 
            className="nav-btn finish" 
            onClick={completeQuiz} 
            disabled={!isQuestionAnswered}
          >
            Finish Quiz
          </button>
        ) : (
          <button 
            className="nav-btn next" 
            onClick={goToNextQuestion} 
            disabled={!isQuestionAnswered}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizContainer;
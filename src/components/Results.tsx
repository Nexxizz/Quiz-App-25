import { FC } from 'react';
import { useQuiz } from '../context/QuizContext';

const Results: FC = () => {
  const { quizResult, currentQuiz, resetQuiz } = useQuiz();

  if (!quizResult || !currentQuiz) {
    return <div>No results to display</div>;
  }

  const { score, correctAnswers, totalQuestions, userAnswers } = quizResult;
  const passStatus = score >= 70 ? 'pass' : 'fail';

  return (
    <div className="results-container">
      <h2>Quiz Results</h2>
      <h3>{currentQuiz.title}</h3>
      <div className="score-card">
        <div className={`score ${passStatus}`}>
          <span className="score-value">{score.toFixed(1)}%</span>
          <span className="score-label">
            {passStatus === 'pass' ? 'Passed!' : 'Failed'}
          </span>
        </div>

        <div className="score-details">
          <p>
            You answered {correctAnswers} out of {totalQuestions} questions correctly.
          </p>
        </div>
      </div>

      <div className="answers-review">
        <h4>Review Your Answers</h4>
        {currentQuiz.questions.map(question => {
          const userAnswer = userAnswers.find(answer => answer.questionId === question.id);
          const selectedOption = userAnswer 
            ? question.options.find(opt => opt.id === userAnswer.selectedOptionId) 
            : null;
          const correctOption = question.options.find(opt => opt.isCorrect);
          const isCorrect = selectedOption?.isCorrect || false;

          return (
            <div key={question.id} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
              <p className="review-question">{question.question}</p>
              <div className="review-answers">
                <p>
                  <strong>Your answer:</strong> {selectedOption?.text || 'No answer provided'}
                  {!isCorrect && selectedOption && ' ❌'}
                </p>
                {!isCorrect && (
                  <p className="correct-answer">
                    <strong>Correct answer:</strong> {correctOption?.text} ✅
                  </p>
                )}
                {question.explanation && (
                  <p className="explanation">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="action-buttons">
        <button className="btn retry" onClick={resetQuiz}>
          Try Again
        </button>
        <button className="btn home" onClick={resetQuiz}>
          Back to Quizzes
        </button>
      </div>
    </div>
  );
};

export default Results;
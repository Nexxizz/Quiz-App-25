import { FC, useState, useEffect } from 'react';
import { Question as QuestionType } from '../types/quiz.types';
import { useQuiz } from '../context/QuizContext';

interface QuestionProps {
  question: QuestionType;
}

const Question: FC<QuestionProps> = ({ question }) => {
  const { submitAnswer, userAnswers } = useQuiz();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    // Set selected option if the user has already answered this question
    const existingAnswer = userAnswers.find(answer => answer.questionId === question.id);
    if (existingAnswer) {
      setSelectedOption(existingAnswer.selectedOptionId);
    } else {
      setSelectedOption(null);
    }
  }, [question.id, userAnswers]);

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
    submitAnswer(question.id, optionId);
  };

  return (
    <div className="question-container">
      <h3 className="question-text">{question.question}</h3>
      <div className="options-container">
        {question.options.map((option) => (
          <div 
            key={option.id} 
            className={`option ${selectedOption === option.id ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option.id)}
          >
            <span className="option-letter">
              {String.fromCharCode(64 + option.id)}
            </span>
            <span className="option-text">{option.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
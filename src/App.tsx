import { QuizProvider, useQuiz } from './context/QuizContext';
import { QuizStatus } from './types/quiz.types';
import QuizList from './components/QuizList';
import QuizContainer from './components/QuizContainer';
import Results from './components/Results';
import './App.css';

const QuizApp = () => {
  const { quizStatus } = useQuiz();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Interactive Quiz</h1>
      </header>
      <main>
        {quizStatus === QuizStatus.NOT_STARTED && <QuizList />}
        {quizStatus === QuizStatus.IN_PROGRESS && <QuizContainer />}
        {quizStatus === QuizStatus.COMPLETED && <Results />}
      </main>
      <footer className="app-footer">
        <p>© 2025 Quiz App | Built with React & TypeScript</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
}

export default App;

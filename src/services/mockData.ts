import { Quiz } from '../types/quiz.types';

export const quizzes: Quiz[] = [
  {
    id: 1,
    title: 'Basic React Knowledge',
    description: 'Test your knowledge of React fundamentals',
    questions: [
      {
        id: 1,
        question: 'What is React?',
        options: [
          { id: 1, text: 'A JavaScript library for building user interfaces', isCorrect: true },
          { id: 2, text: 'A programming language', isCorrect: false },
          { id: 3, text: 'A database management system', isCorrect: false },
          { id: 4, text: 'A server-side framework', isCorrect: false }
        ],
        explanation: 'React is a JavaScript library developed by Facebook for building user interfaces.'
      },
      {
        id: 2,
        question: 'What is JSX?',
        options: [
          { id: 1, text: 'A JavaScript database', isCorrect: false },
          { id: 2, text: 'A syntax extension that allows HTML in JavaScript', isCorrect: true },
          { id: 3, text: 'A React native component', isCorrect: false },
          { id: 4, text: 'None of the above', isCorrect: false }
        ],
        explanation: 'JSX is a syntax extension for JavaScript that looks similar to HTML and allows you to write HTML structures in the same file as JavaScript code.'
      },
      {
        id: 3,
        question: 'What is a React component?',
        options: [
          { id: 1, text: 'A server in React applications', isCorrect: false },
          { id: 2, text: 'A reusable piece of code that returns UI elements', isCorrect: true },
          { id: 3, text: 'A database collection', isCorrect: false },
          { id: 4, text: 'A styling framework for React', isCorrect: false }
        ],
        explanation: 'Components are reusable pieces of code that return React elements describing what should appear on the screen.'
      }
    ]
  },
  {
    id: 2,
    title: 'TypeScript Basics',
    description: 'Test your knowledge of TypeScript fundamentals',
    questions: [
      {
        id: 1,
        question: 'What is TypeScript?',
        options: [
          { id: 1, text: 'A programming language', isCorrect: false },
          { id: 2, text: 'A superset of JavaScript that adds static typing', isCorrect: true },
          { id: 3, text: 'A JavaScript framework', isCorrect: false },
          { id: 4, text: 'A testing library', isCorrect: false }
        ],
        explanation: 'TypeScript is a superset of JavaScript that adds static type definitions.'
      },
      {
        id: 2,
        question: 'What file extension is used for TypeScript files?',
        options: [
          { id: 1, text: '.js', isCorrect: false },
          { id: 2, text: '.typescript', isCorrect: false },
          { id: 3, text: '.ts', isCorrect: true },
          { id: 4, text: '.type', isCorrect: false }
        ],
        explanation: 'TypeScript files use the .ts extension, while TypeScript React files use .tsx.'
      },
      {
        id: 3,
        question: 'What does the "interface" keyword do in TypeScript?',
        options: [
          { id: 1, text: 'Creates a new React component', isCorrect: false },
          { id: 2, text: 'Defines a contract for an object structure', isCorrect: true },
          { id: 3, text: 'Imports modules', isCorrect: false },
          { id: 4, text: 'None of the above', isCorrect: false }
        ],
        explanation: 'Interfaces in TypeScript define the shape that objects must conform to.'
      }
    ]
  }
];

export const getQuiz = (id: number): Quiz | undefined => {
  return quizzes.find(quiz => quiz.id === id);
};

export const getAllQuizzes = (): Quiz[] => {
  return quizzes;
};
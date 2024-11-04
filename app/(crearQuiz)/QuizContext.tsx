import React, { createContext, useContext, useState } from 'react';
import { QuestionPayload } from "../types/questionPayload";

type QuizContextType = {
  quizData: QuestionPayload[];  // Cambia a un arreglo de QuestionPayload
  setQuizData: (data: QuestionPayload[]) => void; // Ajusta el tipo de la función
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizData, setQuizData] = useState<QuestionPayload[]>([]); // Inicializa como un arreglo vacío

  return (
    <QuizContext.Provider value={{ quizData, setQuizData }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

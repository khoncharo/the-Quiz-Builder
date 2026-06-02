import { createContext, useContext, useState, type ReactNode } from 'react';
import type { IQuizSummary } from '@/shared/types';

interface IQuizStore {
  quizzes: IQuizSummary[];
  setQuizzes: (quizzes: IQuizSummary[]) => void;
  removeQuiz: (id: string) => void;
}

const QuizStoreContext = createContext<IQuizStore | null>(null);

export function QuizStoreProvider({ children }: { children: ReactNode }) {
  const [quizzes, setQuizzes] = useState<IQuizSummary[]>([]);

  const removeQuiz = (id: string) => {
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <QuizStoreContext.Provider value={{ quizzes, setQuizzes, removeQuiz }}>
      {children}
    </QuizStoreContext.Provider>
  );
}

export function useQuizStore(): IQuizStore {
  const ctx = useContext(QuizStoreContext);
  if (!ctx) throw new Error('useQuizStore must be used within QuizStoreProvider');
  return ctx;
}

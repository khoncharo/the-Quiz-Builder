import { useEffect } from 'react';
import { getQuizzes, deleteQuiz } from '../api';
import { useQuizStore } from '../store';

export function useQuizzes() {
  const { quizzes, setQuizzes, removeQuiz } = useQuizStore();

  useEffect(() => {
    void getQuizzes().then(setQuizzes);
  }, [setQuizzes]);

  const handleDelete = async (id: string) => {
    await deleteQuiz(id);
    removeQuiz(id);
  };

  return { quizzes, handleDelete };
}

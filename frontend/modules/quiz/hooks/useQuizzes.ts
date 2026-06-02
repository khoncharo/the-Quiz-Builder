import { useEffect, useState } from 'react';
import { getQuizzes, deleteQuiz } from '../api';
import { useQuizStore } from '../store';

export function useQuizzes() {
  const { quizzes, setQuizzes, removeQuiz } = useQuizStore();
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    getQuizzes().then(setQuizzes).catch(() => setLoadError(true));
  }, [setQuizzes]);

  const handleDelete = async (id: string) => {
    await deleteQuiz(id);
    removeQuiz(id);
  };

  return { quizzes, handleDelete, loadError };
}

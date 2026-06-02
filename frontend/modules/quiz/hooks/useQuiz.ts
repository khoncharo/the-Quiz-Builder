import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getQuiz } from '../api';
import type { IQuizDetail } from '@/shared/types';

export function useQuiz() {
  const router = useRouter();
  const { id } = router.query;
  const [quiz, setQuiz] = useState<IQuizDetail | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (typeof id === 'string') {
      getQuiz(id).then(setQuiz).catch(() => setNotFound(true));
    }
  }, [id]);

  return { quiz, notFound };
}

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@/routes';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    void router.replace(ROUTES.QUIZZES);
  }, [router]);

  return null;
}

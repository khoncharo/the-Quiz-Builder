import Link from 'next/link';
import { ROUTES } from '@/routes';
import { useQuizzes, QuizCard } from '@/modules/quiz';

export default function QuizzesPage() {
  const { quizzes, handleDelete } = useQuizzes();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        <Link href={ROUTES.CREATE} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Quiz
        </Link>
      </div>

      {quizzes.length === 0 && (
        <p className="text-gray-500">No quizzes yet. Create one!</p>
      )}

      <ul className="space-y-3">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} onDelete={(id) => void handleDelete(id)} />
        ))}
      </ul>
    </main>
  );
}

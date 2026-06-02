import { useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/routes';
import type { IQuizSummary } from '@/shared/types';

interface IQuizCardProps {
  quiz: IQuizSummary;
  onDelete: (id: string) => void;
}

export function QuizCard({ quiz, onDelete }: IQuizCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="font-semibold text-lg mb-1">Delete quiz?</h3>
            <p className="text-gray-500 text-sm mb-5">
              &ldquo;{quiz.title}&rdquo; will be permanently deleted.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => { onDelete(quiz.id); setShowConfirm(false); }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <li className="flex items-center justify-between border rounded-lg p-4 bg-white">
        <Link href={ROUTES.QUIZ_DETAIL(quiz.id)} className="hover:underline">
          <span className="font-medium">{quiz.title}</span>
          <span className="ml-2 text-gray-500 text-sm">
            {quiz.questionCount} question{quiz.questionCount !== 1 ? 's' : ''}
          </span>
        </Link>
        <button
          onClick={() => setShowConfirm(true)}
          className="text-gray-400 hover:text-red-500 ml-4 transition-colors"
          aria-label="Delete quiz"
        >
          ✕
        </button>
      </li>
    </>
  );
}

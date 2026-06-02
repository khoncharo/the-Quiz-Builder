import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuiz, QuestionItem } from '@/modules/quiz';

type Answer = string | string[];
type Answers = Record<string, Answer>;

export default function QuizDetailPage() {
  const router = useRouter();
  const { quiz, notFound } = useQuiz();
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  if (notFound) {
    return <main className="max-w-2xl mx-auto p-6">Quiz not found.</main>;
  }

  if (!quiz) {
    return <main className="max-w-2xl mx-auto p-6">Loading...</main>;
  }

  const allAnswered = quiz.questions.every((q) => {
    const a = answers[q.id];
    if (a === undefined) return false;
    if (Array.isArray(a)) return a.length > 0;
    return (a as string).trim().length > 0;
  });

  const handleAnswer = (id: string, value: Answer) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  if (submitted) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">{quiz.title}</h1>
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="text-4xl mb-3">✓</div>
          <p className="text-green-700 font-semibold text-lg">Quiz submitted!</p>
          <p className="text-green-600 text-sm mt-1">
            {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''} answered
          </p>
          <button
            onClick={() => { setAnswers({}); setSubmitted(false); }}
            className="mt-5 text-blue-600 hover:underline text-sm"
          >
            Retake quiz
          </button>
        </div>
        <button
          onClick={() => router.back()}
          className="mt-6 w-full border border-gray-300 text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{quiz.title}</h1>
      <div className="space-y-2">
        {quiz.questions.map((q, i) => (
          <QuestionItem
            key={q.id}
            question={q}
            index={i}
            answer={answers[q.id]}
            onAnswer={(val) => handleAnswer(q.id, val)}
          />
        ))}
      </div>
      <button
        onClick={() => setSubmitted(true)}
        disabled={!allAnswered}
        className="mt-8 w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Submit Quiz
      </button>
      <button
        onClick={() => router.back()}
        className="mt-3 w-full border border-gray-300 text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
      >
        ← Back
      </button>
    </main>
  );
}

const BASE = process.env.NEXT_PUBLIC_API_URL;

export const getQuizzes = () => fetch(`${BASE}/quizzes`).then((r) => r.json());
export const getQuiz = (id: string) => fetch(`${BASE}/quizzes/${id}`).then((r) => r.json());
export const createQuiz = (body: unknown) =>
  fetch(`${BASE}/quizzes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((r) => r.json());
export const deleteQuiz = (id: string) =>
  fetch(`${BASE}/quizzes/${id}`, { method: 'DELETE' });

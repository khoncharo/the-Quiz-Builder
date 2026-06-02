const BASE = process.env.NEXT_PUBLIC_API_URL;

async function parseOk<T>(r: Response): Promise<T> {
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json() as Promise<T>;
}

export const getQuizzes = () => fetch(`${BASE}/quizzes`).then((r) => parseOk(r));
export const getQuiz = (id: string) => fetch(`${BASE}/quizzes/${id}`).then((r) => parseOk(r));
export const createQuiz = (body: unknown) =>
  fetch(`${BASE}/quizzes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((r) => parseOk(r));
export const deleteQuiz = (id: string) =>
  fetch(`${BASE}/quizzes/${id}`, { method: 'DELETE' }).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
  });

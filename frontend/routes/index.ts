export const ROUTES = {
  HOME: '/',
  QUIZZES: '/quizzes',
  QUIZ_DETAIL: (id: string) => `/quizzes/${id}`,
  CREATE: '/create',
} as const;

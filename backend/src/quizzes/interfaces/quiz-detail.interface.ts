import { Quiz, Question } from '@prisma/client';

export interface IQuizDetail extends Quiz {
  questions: Question[];
}

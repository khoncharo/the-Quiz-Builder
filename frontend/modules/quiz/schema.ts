import { z } from 'zod';

export const questionSchema = z.object({
  type: z.enum(['BOOLEAN', 'INPUT', 'CHECKBOX']),
  label: z.string().min(1, 'Question is required').max(500, 'Question must be 500 characters or fewer'),
  options: z.array(z.string()).optional(),
}).superRefine((data, ctx) => {
  if (data.type === 'CHECKBOX') {
    const opts = data.options ?? [];
    if (opts.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one option is required for checkbox questions',
        path: ['options'],
      });
      return;
    }
    opts.forEach((opt, i) => {
      if (!opt || !opt.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Option cannot be empty',
          path: ['options', i],
        });
      }
    });
  }
});

export const quizSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  questions: z.array(questionSchema).min(1, 'At least one question is required'),
});

export type IQuizForm = z.infer<typeof quizSchema>;

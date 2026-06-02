import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTES } from '@/routes';
import { createQuiz, quizSchema, type IQuizForm, QuestionField } from '@/modules/quiz';

export default function CreatePage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<IQuizForm>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      questions: [{ type: 'BOOLEAN', label: '', options: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'questions' });
  const watchedTitle = watch('title');
  const watchedQuestions = watch('questions');

  const onSubmit = async (data: IQuizForm) => {
    setSubmitError(null);
    try {
      await createQuiz(data);
      void router.push(ROUTES.QUIZZES);
    } catch {
      setSubmitError('Failed to create quiz. Please try again.');
    }
  };

  const addOption = (questionIndex: number) => {
    const current = watchedQuestions[questionIndex].options ?? [];
    setValue(`questions.${questionIndex}.options`, [...current, '']);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const current = watchedQuestions[questionIndex].options ?? [];
    setValue(`questions.${questionIndex}.options`, current.filter((_, i) => i !== optionIndex));
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>

      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Quiz Title</label>
          <input
            {...register('title')}
            className="border rounded px-3 py-2 w-full"
            placeholder="Enter quiz title"
            maxLength={500}
          />
          <div className="flex justify-between mt-1">
            {errors.title
              ? <p className="text-red-500 text-sm">{errors.title.message}</p>
              : <span />}
            <p className={`text-xs ${watchedTitle.length >= 500 ? 'text-red-500' : 'text-gray-400'}`}>
              {watchedTitle.length}/500
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold">Questions</h2>

          {fields.map((field, index) => (
            <QuestionField
              key={field.id}
              index={index}
              questionType={watchedQuestions[index]?.type ?? 'BOOLEAN'}
              labelValue={watchedQuestions[index]?.label ?? ''}
              options={watchedQuestions[index]?.options ?? []}
              canRemove={fields.length > 1}
              register={register}
              errors={errors}
              onRemove={() => remove(index)}
              onAddOption={() => addOption(index)}
              onRemoveOption={(optIndex) => removeOption(index, optIndex)}
            />
          ))}

          <button
            type="button"
            onClick={() => append({ type: 'BOOLEAN', label: '', options: [] })}
            className="border-2 border-dashed border-gray-300 rounded p-3 w-full text-gray-500 hover:border-blue-400 hover:text-blue-500"
          >
            + Add Question
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {submitError && (
            <p className="text-red-500 text-sm text-center">{submitError}</p>
          )}
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full">
            Create Quiz
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full border border-gray-300 text-gray-600 px-6 py-2 rounded font-medium hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
        </div>
      </form>
    </main>
  );
}

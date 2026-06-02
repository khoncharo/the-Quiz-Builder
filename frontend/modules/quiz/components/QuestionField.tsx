import { useState } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IQuizForm } from '../schema';

interface IQuestionFieldProps {
  index: number;
  questionType: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
  labelValue: string;
  options: string[];
  canRemove: boolean;
  register: UseFormRegister<IQuizForm>;
  errors: FieldErrors<IQuizForm>;
  onRemove: () => void;
  onAddOption: () => void;
  onRemoveOption: (optionIndex: number) => void;
}

export function QuestionField({
  index,
  questionType,
  labelValue,
  options,
  canRemove,
  register,
  errors,
  onRemove,
  onAddOption,
  onRemoveOption,
}: IQuestionFieldProps) {
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const optionsErrors = errors.questions?.[index]?.options as any;
  const generalOptionsError: string | undefined =
    optionsErrors?.message ?? optionsErrors?.root?.message;

  return (
    <>
      {showRemoveConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="font-semibold text-lg mb-1">Remove question?</h3>
            <p className="text-gray-500 text-sm mb-5">
              Question {index + 1} will be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowRemoveConfirm(false)}
                className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => { onRemove(); setShowRemoveConfirm(false); }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="border rounded-lg p-4 space-y-3 bg-white">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Question {index + 1}</span>
          {canRemove && (
            <button
              type="button"
              onClick={() => setShowRemoveConfirm(true)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Question</label>
          <input
            {...register(`questions.${index}.label`)}
            className="border rounded px-3 py-2 w-full"
            placeholder="Enter your question"
            maxLength={500}
          />
          <div className="flex justify-between mt-1">
            {errors.questions?.[index]?.label
              ? <p className="text-red-500 text-sm">{errors.questions[index].label?.message}</p>
              : <span />}
            <p className={`text-xs ${labelValue.length >= 500 ? 'text-red-500' : 'text-gray-400'}`}>
              {labelValue.length}/500
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            {...register(`questions.${index}.type`)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="BOOLEAN">Boolean (True/False)</option>
            <option value="INPUT">Text Input</option>
            <option value="CHECKBOX">Checkbox</option>
          </select>
        </div>

        {questionType === 'CHECKBOX' && (
          <div>
            <label className="block text-sm font-medium mb-1">Options</label>
            <div className="space-y-2">
              {options.map((optValue, optIndex) => (
                <div key={optIndex} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <input
                      {...register(`questions.${index}.options.${optIndex}`)}
                      className="border rounded px-3 py-1.5 w-full"
                      placeholder={`Option ${optIndex + 1}`}
                      maxLength={500}
                    />
                    <div className="flex justify-between mt-0.5">
                      {optionsErrors?.[optIndex]?.message
                        ? <p className="text-red-500 text-xs">{optionsErrors[optIndex].message}</p>
                        : <span />}
                      <p className={`text-xs ${(optValue?.length ?? 0) >= 500 ? 'text-red-500' : 'text-gray-400'}`}>
                        {optValue?.length ?? 0}/500
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveOption(optIndex)}
                    className="text-red-400 hover:text-red-600 mt-1.5 p-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {generalOptionsError && (
                <p className="text-red-500 text-sm">{generalOptionsError}</p>
              )}
              <button
                type="button"
                onClick={onAddOption}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Option
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

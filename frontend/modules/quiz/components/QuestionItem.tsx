import type { IQuestion } from '@/shared/types';

interface IQuestionItemProps {
  question: IQuestion;
  index?: number;
  answer?: string | string[];
  onAnswer?: (value: string | string[]) => void;
}

export function QuestionItem({ question, index, answer, onAnswer }: IQuestionItemProps) {
  const label = (
    <p className="font-medium mb-3 text-gray-800">
      {index !== undefined && (
        <span className="text-gray-400 mr-2 font-normal">{index + 1}.</span>
      )}
      {question.label}
    </p>
  );

  if (question.type === 'BOOLEAN') {
    return (
      <div className="mb-5">
        {label}
        <div className="flex gap-3">
          {['True', 'False'].map((opt) => {
            const isSelected = answer === opt;
            return (
              <label
                key={opt}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full border-2 select-none transition-all ${
                  onAnswer ? 'cursor-pointer' : 'cursor-default'
                } ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    isSelected ? 'border-blue-500' : 'border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 block" />
                  )}
                </span>
                <input
                  type="radio"
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => onAnswer?.(opt)}
                  readOnly={!onAnswer}
                />
                {opt}
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  if (question.type === 'INPUT') {
    const textValue = typeof answer === 'string' ? answer : '';
    return (
      <div className="mb-5">
        {label}
        <input
          type="text"
          value={textValue}
          onChange={(e) => onAnswer?.(e.target.value.slice(0, 500))}
          readOnly={!onAnswer}
          placeholder={onAnswer ? 'Type your answer…' : 'Text answer'}
          maxLength={500}
          className={`border-2 rounded-lg px-3 py-2 w-full transition-colors outline-none ${
            onAnswer
              ? 'border-gray-200 focus:border-blue-400 bg-white'
              : 'border-gray-200 bg-gray-50 text-gray-400 cursor-default'
          }`}
        />
        {onAnswer && textValue.length > 0 && (
          <p className={`text-xs mt-1 text-right ${textValue.length >= 500 ? 'text-red-500' : 'text-gray-400'}`}>
            {textValue.length}/500
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mb-5">
      {label}
      <div className="flex flex-col gap-2">
        {question.options.map((opt, i) => {
          const isChecked = Array.isArray(answer) && answer.includes(opt);
          const toggle = () => {
            if (!onAnswer) return;
            const current = Array.isArray(answer) ? answer : [];
            onAnswer(isChecked ? current.filter((v) => v !== opt) : [...current, opt]);
          };
          return (
            <label
              key={i}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border-2 select-none transition-all ${
                onAnswer ? 'cursor-pointer' : 'cursor-default'
              } ${
                isChecked
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <span
                className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all ${
                  isChecked ? 'bg-blue-500 border-blue-500' : 'border-gray-300 bg-white'
                }`}
              >
                {isChecked && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 12 10"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 5l3.5 3.5L11 1" />
                  </svg>
                )}
              </span>
              <input type="checkbox" className="sr-only" checked={isChecked} onChange={toggle} />
              {opt}
            </label>
          );
        })}
      </div>
    </div>
  );
}

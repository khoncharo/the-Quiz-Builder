export interface IQuizSummary {
  id: string;
  title: string;
  questionCount: number;
}

export interface IQuestion {
  id: string;
  type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
  label: string;
  options: string[];
}

export interface IQuizDetail {
  id: string;
  title: string;
  questions: IQuestion[];
}

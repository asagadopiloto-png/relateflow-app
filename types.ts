
export enum RelationalStyle {
  VISUAL = 'VISUAL',
  AUDITORY = 'AUDITORY',
  KINESTHETIC = 'KINESTHETIC'
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    style: RelationalStyle;
  }[];
}

export interface QuizResult {
  scores: Record<RelationalStyle, number>;
  primary: RelationalStyle;
  secondary: RelationalStyle;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

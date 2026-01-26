
export enum RelationalStyle {
  VISUAL = 'VISUAL',
  AUDITORY = 'AUDITORY',
  KINESTHETIC = 'KINESTHETIC'
}
// Eixos Sensoriais Ampliados (Método EMO VÍNCULO)
export enum SensoryAxis {
  VISION = 'vision',      // visão, imagens, leitura visual
  HEARING = 'hearing',    // audição interna, tom, palavras
  TOUCH = 'touch',        // corpo, impulsividade, tempo de resposta
  MEMORY = 'memory',      // memória emocional, gatilhos inconscientes
  EXPRESSION = 'expression', // fala, engolir ou expor emoções
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

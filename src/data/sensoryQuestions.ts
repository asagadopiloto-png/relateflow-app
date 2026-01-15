
export enum SensoryAxis {
  VISION = "VISION",
  HEARING = "HEARING",
  TOUCH = "TOUCH",
  MEMORY = "MEMORY",
  EXPRESSION = "EXPRESSION",
}

export interface SensoryQuestion {
  id: string;
  block: "SELF" | "RELATIONSHIPS" | "DIGITAL" | "REGULATION";
  question: string;
  options: {
    text: string;
    axis: SensoryAxis;
  }[];
}

export const sensoryQuestions: SensoryQuestion[] = [];

export const SELF_EXPERIENCE_QUESTIONS = [
  {
    id: "self_vision_1",
    axis: SensoryAxis.VISION,
    text: "Quando algo acontece comigo, costumo criar imagens mentais para entender melhor a situação."
  },
  {
    id: "self_hearing_1",
    axis: SensoryAxis.HEARING,
    text: "As palavras que as pessoas dizem ficam ecoando na minha mente por um tempo."
  },
  {
    id: "self_touch_1",
    axis: SensoryAxis.TOUCH,
    text: "Meu corpo reage antes de eu conseguir pensar com clareza."
  },
  {
    id: "self_memory_1",
    axis: SensoryAxis.MEMORY,
    text: "Lembro de situações passadas parecidas quando algo me afeta emocionalmente."
  }
];

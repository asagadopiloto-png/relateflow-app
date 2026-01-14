export enum SensoryAxis {
  VISION = "VISION",
  HEARING = "HEARING",
  TOUCH = "TOUCH",
  MEMORY = "MEMORY",
  EXPRESSION = "EXPRESSION",
}
export interface SensoryQuestion {
  id: number;
  block: "SELF" | "RELATIONSHIPS" | "DIGITAL" | "REGULATION";
  question: string;
  options: {
    text: string;
    axis: SensoryAxis;
  }[];
}
export const sensoryQuestions: SensoryQuestion[] = [];

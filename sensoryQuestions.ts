
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
export const SELF_QUESTIONS: SensoryQuestion[] = [
  {
    id: "self_1",
    block: "SELF",
    question: "Quando algo acontece comigo, como costumo perceber primeiro a situação?",
    options: [
      {
        text: "Crio imagens mentais para entender o que está acontecendo",
        axis: SensoryAxis.VISION,
      },
      {
        text: "As palavras ou o tom das pessoas ficam ecoando na minha mente",
        axis: SensoryAxis.HEARING,
      },
      {
        text: "Meu corpo reage antes de eu conseguir pensar com clareza",
        axis: SensoryAxis.TOUCH,
      },
      {
        text: "Lembro imediatamente de situações passadas parecidas",
        axis: SensoryAxis.MEMORY,
      },
      {
        text: "Sinto vontade de falar ou explicar o que estou sentindo",
        axis: SensoryAxis.EXPRESSION,
      },
    ],
  },
];

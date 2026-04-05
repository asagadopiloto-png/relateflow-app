
import { RelationalStyle, QuizQuestion } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Quando você conhece alguém novo, o que mais chama sua atenção?",
    options: [
      { text: "A aparência, as roupas e a expressão facial.", style: RelationalStyle.VISUAL },
      { text: "O tom de voz, o jeito de falar e o que a pessoa diz.", style: RelationalStyle.AUDITORY },
      { text: "A 'energia', o aperto de mão e como me sinto perto dela.", style: RelationalStyle.KINESTHETIC }
    ]
  },
  {
    id: 2,
    question: "Como você prefere receber demonstrações de carinho?",
    options: [
      { text: "Um presente bonito ou ver a pessoa fazendo algo por mim.", style: RelationalStyle.VISUAL },
      { text: "Ouvir 'eu te amo' ou receber um elogio sincero.", style: RelationalStyle.AUDITORY },
      { text: "Um abraço apertado ou passar tempo de qualidade bem próximo.", style: RelationalStyle.KINESTHETIC }
    ]
  },
  {
    id: 3,
    question: "Em um momento de discussão, o que mais te incomoda?",
    options: [
      { text: "Ver a cara feia ou o descaso visual do outro.", style: RelationalStyle.VISUAL },
      { text: "O tom de voz agressivo ou quando param de falar comigo.", style: RelationalStyle.AUDITORY },
      { text: "O distanciamento físico ou a falta de acolhimento.", style: RelationalStyle.KINESTHETIC }
    ]
  },
  {
    id: 4,
    question: "Qual sua forma favorita de aprender algo novo?",
    options: [
      { text: "Lendo, vendo gráficos ou assistindo a um vídeo.", style: RelationalStyle.VISUAL },
      { text: "Ouvindo uma explicação ou participando de um debate.", style: RelationalStyle.AUDITORY },
      { text: "Colocando a mão na massa e praticando.", style: RelationalStyle.KINESTHETIC }
    ]
  },
  {
    id: 5,
    question: "No trabalho, o que te faz sentir mais reconhecido?",
    options: [
      { text: "Um relatório bem apresentado onde meu nome aparece com destaque.", style: RelationalStyle.VISUAL },
      { text: "Um feedback verbal positivo em frente à equipe.", style: RelationalStyle.AUDITORY },
      { text: "Sentir que faço parte de algo importante e o clima amistoso.", style: RelationalStyle.KINESTHETIC }
    ]
  }
];

export const STYLE_DETAILS = {
  [RelationalStyle.VISUAL]: {
    title: "Visual",
    pnl: "Pessoas visuais tendem a falar rápido, observam detalhes e gostam de organização. Valorizam o que veem.",
    psycho: "O olhar é central. Busca ser visto e admirado, muitas vezes refletindo o desejo de reconhecimento parental.",
    digital: "Prefere fotos, vídeos e infográficos. Mensagens sem imagens podem parecer incompletas."
  },
  [RelationalStyle.AUDITORY]: {
    title: "Auditivo",
    pnl: "Preferem conversas profundas e sons. O vocabulário é focado em 'ouvir', 'dizer' e 'soar'.",
    psycho: "Desejo de ser escutado. A falta de escuta na infância pode gerar busca constante por validação pela palavra.",
    digital: "Adora áudios e chamadas de voz. O silêncio ou apenas texto pode ser interpretado como frieza."
  },
  [RelationalStyle.KINESTHETIC]: {
    title: "Cinestésico",
    pnl: "Vive através do corpo e emoção. Valoriza o toque, o aconchego e a sensação de presença.",
    psycho: "O toque simboliza segurança emocional, refletindo a busca pelo conforto e presença física.",
    digital: "Prefere mensagens que transmitam 'calor', como emojis afetivos e vídeos que expressem proximidade."
  }
};

import { RelationalStyle } from "./types";

export const PROFILE_TEXTS = {
  [RelationalStyle.VISUAL]: {
    title: "Perfil Visual",
    text: `
Você se orienta pelo que vê, percebe detalhes e sinais sutis.
No ambiente digital, a ausência de expressões e contexto visual
faz com que sua mente complete lacunas, o que pode gerar
interpretações equivocadas e frustrações emocionais.

Caminho terapêutico:
Busque clareza antes de concluir.
Nem todo silêncio é rejeição.
Prefira comunicações visuais ou videochamadas.
`,
  },

  [RelationalStyle.AUDITORY]: {
    title: "Perfil Auditivo",
    text: `
Você organiza o mundo pela palavra, pelo diálogo e pelo tom.
No digital, a falta de voz pode gerar ruídos emocionais
e sensação de não ser compreendido.

Caminho terapêutico:
Peça esclarecimentos.
Use áudios quando necessário.
Observe se você fala para se explicar ou para aliviar ansiedade.
`,
  },

  [RelationalStyle.KINESTHETIC]: {
    title: "Perfil Cinestésico",
    text: `
Você sente intensamente o ambiente e as relações.
No mundo digital, essa sensibilidade pode gerar sobrecarga
emocional e ansiedade.

Caminho terapêutico:
Faça pausas antes de responder.
Nomeie o que sente.
Nem tudo que você sente vem do outro.
`,
  },

  MISTO: {
    title: "Perfil Misto",
    text: `
Você transita entre dois ou mais canais sensoriais.
Essa riqueza amplia sua percepção,
mas no digital pode gerar excesso de interpretações.

Caminho terapêutico:
Organize o que vê, ouve e sente.
Evite responder no impulso.
Percepção não é certeza.
`,
  },
};

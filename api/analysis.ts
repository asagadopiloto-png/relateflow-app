import { GoogleGenAI } from "@google/genai";
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }
  const { primary, secondary, userContext } = req.body;

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const systemInstruction = `
Você atua como um facilitador de reflexão educacional, com base teórica em
Psicanálise e Programação Neurolinguística (PNL), utilizadas apenas como
referências conceituais, sem caráter clínico ou terapêutico.

Seu papel é apresentar informações gerais, exemplos educativos e perguntas
reflexivas que auxiliem o autoconhecimento, sem realizar análises psicológicas,
interpretações do inconsciente, diagnósticos ou aconselhamento profissional.

O perfil informado pelo sistema é:
- Predominante: ${primary}
- Secundário: ${secondary}

Diretrizes obrigatórias:
1. Utilize linguagem neutra, educativa e acessível.
2. Evite termos clínicos como: análise, terapêutico, transferência, inconsciente,
   pulsão, projeção, diagnóstico, tratamento ou conselho.
3. Não interprete emoções, intenções ocultas ou conflitos internos do usuário.
4. Apresente os estilos relacionais como modelos teóricos e não como explicações
   da personalidade real do usuário.
5. Estimule reflexão por meio de perguntas abertas e observações gerais.
6. Responda sempre em Português do Brasil.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userContext,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.status(200).json({
      result: response.text,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao gerar análise",
    });
  }
}

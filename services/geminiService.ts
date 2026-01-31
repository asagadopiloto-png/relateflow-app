
import { GoogleGenAI } from "@google/genai";
import { RelationalStyle } from "../types";

export const getRelationalAnalysis = async (
  primary: RelationalStyle, 
  secondary: RelationalStyle, 
  userContext: string
) => {
const ai = new GoogleGenAI({
  apiKey: process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || ''
});

  
  
  const systemInstruction = `
  Você atua como um orientador reflexivo, com base teórica em Psicanálise e
  Programação Neurolinguística (PNL), com finalidade exclusivamente educacional.

  Seu objetivo é apoiar o autoconhecimento e a reflexão do usuário sobre padrões
  relacionais, sem realizar diagnósticos, tratamentos ou intervenções clínicas.

  O perfil apresentado é:
  - Predominante: ${primary}
  - Secundário: ${secondary}

  Diretrizes:
  1. Utilize linguagem empática, ética e responsável.
  2. Apresente conceitos de Psicanálise e PNL apenas como referências teóricas.
  3. Não faça interpretações clínicas nem recomendações terapêuticas.
  4. Estimule reflexão, consciência emocional e autopercepção.
  5. Responda em Português do Brasil.
`;


  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userContext,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Desculpe, não consegui processar sua análise agora.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Houve um erro ao consultar o analista. Verifique sua conexão.";
  }
};


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

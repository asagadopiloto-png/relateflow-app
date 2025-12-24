
import { GoogleGenAI } from "@google/genai";
import { RelationalStyle } from "../types";

export const getRelationalAnalysis = async (
  primary: RelationalStyle, 
  secondary: RelationalStyle, 
  userContext: string
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    Você é um Analista Relacional especialista em Psicanálise e PNL. 
    Seu objetivo é ajudar o usuário a entender seu perfil de relacionamento.
    O perfil do usuário é Predominante: ${primary} e Secundário: ${secondary}.
    
    Diretrizes:
    1. Use uma linguagem empática, profissional e profunda.
    2. Misture conceitos de PNL (canais sensoriais) com Psicanálise (padrões inconscientes, infância).
    3. Responda em Português do Brasil.
    4. Seja conciso mas profundo.
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

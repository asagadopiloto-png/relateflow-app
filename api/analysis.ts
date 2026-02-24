import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { primary, secondary, userContext } = req.body;

  const ai = new GoogleGenAI({
    apiKey: process.env.API_KEY,
  });

  const systemInstruction = `
  Você é um Analista Relacional especialista em Psicanálise e PNL.

  Perfil:
  Predominante: ${primary}
  Secundário: ${secondary}

  Diretrizes:
  - Linguagem empática e profissional
  - Misture Psicanálise + PNL
  - Português do Brasil
  - Seja conciso mas profundo
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

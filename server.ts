import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Setup
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  // API Route for Analysis (Server-side to protect API Key)
  app.post("/api/analyze", async (req, res) => {
    try {
      const { profile, secondary, userText } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "API Key not configured on server." });
      }

      const prompt = `
        Você é um assistente educativo do projeto EMO VÍNCULO. 
        O usuário realizou um teste de perfil relacional.
        Perfil Predominante: ${profile}
        Perfil Secundário: ${secondary}
        O usuário escreveu a seguinte reflexão/dúvida: "${userText}"
        
        Com base na Psicanálise e PNL, forneça uma reflexão educativa (não terapêutica) que ajude o usuário a ampliar sua percepção sobre como se relaciona. 
        Mantenha um tom acolhedor, ético e profissional. 
        Lembre-se: Não é terapia, não é diagnóstico. É um espaço de reflexão.
        Responda em português de forma clara e profunda.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      res.json({ analysis: response.text });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Erro ao processar reflexão." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { prompt, primary, secondary } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt é obrigatório" });
    }

    const systemInstruction = `
Você atua como um facilitador de reflexão educacional, com base teórica em
Psicanálise e Programação Neurolinguística (PNL), utilizadas apenas como
referências conceituais, sem caráter clínico ou terapêutico.

O perfil informado é:
- Predominante: ${primary}
- Secundário: ${secondary}

Diretrizes:
1. Linguagem neutra e educativa.
2. Não realizar análise psicológica.
3. Estimular reflexão com perguntas abertas.
4. Responder em Português do Brasil.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemInstruction}\n\n${prompt}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Erro ao consultar IA",
      });
    }

    const data = await response.json();

    let text = "Sem resposta do modelo";

    if (data?.candidates?.length) {
      const parts = data.candidates[0]?.content?.parts;

      if (parts?.length) {
        text = parts.map((p: any) => p.text).join("");
      }
    }

    return res.status(200).json({ text });
  } catch (error) {
    console.error("Erro interno:", error);

    return res.status(500).json({
      error: "Erro interno no servidor",
    });
  }
}

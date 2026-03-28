export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { prompt, primary, secondary } = req.body;

    const systemInstruction = `
Você atua como um facilitador de reflexão educacional.

Perfil:
- Predominante: ${primary}
- Secundário: ${secondary}

Responda de forma educativa, neutra e em português do Brasil.
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
      return res.status(response.status).json({ error: "Erro na API" });
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
    return res.status(500).json({ error: "Erro interno" });
  }
}

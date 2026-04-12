export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { profile, secondary, userText } = req.body;

    const systemInstruction = `
Você atua como um facilitador de reflexão educacional, com base teórica em
Psicanálise e Programação Neurolinguística (PNL), utilizadas apenas como
referências conceituais, sem caráter clínico ou terapêutico.

Seu papel é apresentar informações gerais, exemplos educativos e perguntas
reflexivas que auxiliem o autoconhecimento, sem realizar análises psicológicas,
interpretações do inconsciente, diagnósticos ou aconselhamento profissional.

O perfil informado pelo sistema é:
- Predominante: ${profile}
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
console.log("API KEY EXISTE?", !!process.env.GEMINI_API_KEY);

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
       
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemInstruction}

Reflexão do usuário:
"${userText}"
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

   const data = await response.json();
console.log("RESPOSTA GEMINI:", JSON.stringify(data, null, 2));
let text = null;

if (data?.candidates?.length) {
  const parts = data.candidates[0].content?.parts;

  if (parts && parts.length) {
    text = parts.map(p => p.text).join(" ");
  }
}

if (!text) {
  console.log("RESPOSTA GEMINI:", JSON.stringify(data, null, 2));

  return res.status(200).json({
    analysis: "Não foi possível gerar a reflexão no momento. Tente novamente."
  });
}

return res.status(200).json({ analysis: text }); 

  } catch (error) {
    console.error("Erro API:", error);
    return res.status(500).json({
      analysis: "Erro ao gerar análise.",
    });
  }
}

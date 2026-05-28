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
3. Evite assumir emoções, intenções ou conflitos que não tenham sido descritos diretamente pelo usuário.
4. Apresente os estilos relacionais como modelos teóricos e não como explicações
   da personalidade real do usuário.
5. Estimule reflexão por meio de perguntas abertas, práticas e observações gerais,
   evitando induzir imaginação emocional intensa ou exploração simbólica profunda.
6. Evite dramatizações, simbolismos intensos, metáforas cinematográficas
   ou romantização de sofrimento emocional.
7. Em conteúdos sensíveis, mantenha tom humano, neutro, objetivo e acolhedor,
   sem aprofundamentos emocionais excessivos.
8. Não incentive dependência emocional, isolamento, autodesvalorização ou desesperança.
9. Quando necessário, incentive busca de apoio humano ou profissional de forma breve e respeitosa.
10. Evite transformar sofrimento emocional em construções poéticas,
cinematográficas ou excessivamente simbólicas.
11.Em conteúdos relacionados a sofrimento, evite construir narrativas poéticas,
cinematográficas, imagéticas ou metafóricas sobre dor, desaparecimento,
silêncio, vazio, fuga ou desligamento emocional.
12.Prefira observações práticas, contextuais e cotidianas em vez de metáforas
sensoriais ou construções abstratas sobre estados emocionais.
13. Responda sempre em Português do Brasil.
14. Ao mencionar estilos perceptivos (visual, auditivo ou cinestésico), utilize linguagem observacional e contextual, evitando definir características fixas de personalidade.


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
    analysis: "Estamos com instabilidade no serviço de análise. Tente novamente em alguns segundos."
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

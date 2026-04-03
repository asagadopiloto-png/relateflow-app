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

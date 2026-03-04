import { RelationalStyle } from "../types";

export const getRelationalAnalysis = async (
  primary: RelationalStyle,
  secondary: RelationalStyle,
  userContext: string
) => {
  try {
    const response = await fetch("/api/analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        primary,
        secondary,
        userContext,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao consultar servidor");
    }

    const data = await response.json();

    return data.result;

  } catch (error) {
    console.error("Erro API:", error);
    return "Houve um erro ao consultar o EMO VÍNCULO. Verifique sua conexão.";
  }
};

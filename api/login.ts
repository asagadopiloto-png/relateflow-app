export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido'
    });
  }

  try {
    const { password } = req.body;
 console.log("APP_PASSWORD:", process.env.APP_PASSWORD);
    if (!process.env.APP_PASSWORD) {
      return res.status(500).json({
        error: 'Senha do servidor não configurada'
      });
    }


if (password !== process.env.APP_PASSWORD) {
  return res.status(401).json({
    error: 'Senha inválida'
  });
}
    

    return res.status(200).json({
      success: true
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Erro interno'
    });
  }
}

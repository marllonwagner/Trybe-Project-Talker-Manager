function isValidPass(req, res, next) {
  const { pass } = req.body;

  if (!pass) {
    return res.status(400).json({ error: 'O campo "password" é obrigatório' });
  }

  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

  if (!passRegex
    .test(pass)) {
    return res.status(400).json({ error: '"O "password" deve ter pelo menos 6 caracteres"' });
  }

  return next();
}

module.exports = isValidPass;

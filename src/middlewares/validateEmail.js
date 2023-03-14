function isValidEmail(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'O campo "email" é obrigatório" é obrigatório' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'O "email" deve ter o formato "email@email.com"' });
  }

  return next();
}

module.exports = isValidEmail;

function validRate(req, res, next) {
  const { talk: { rate } } = req.body;
  if (rate === undefined) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  if (!([1, 2, 3, 4, 5].includes(rate))) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  return next();
}

module.exports = validRate;
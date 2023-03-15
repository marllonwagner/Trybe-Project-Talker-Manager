function isAgeValid(req, res, next) {
const { age } = req.body;
if (!age) {
  return res.status(400).json({
    message: 'O campo "age" é obrigatório',
  });
}
const numAge = Number(age);
if (!Number.isInteger(numAge) && numAge < 18) {
  return res.status(400).json({
    message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
  });
}
return next();
}

module.exports = isAgeValid;
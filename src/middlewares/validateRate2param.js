async function isRate2paramValid(req, res, next) {
const { rate } = req.query;
const rateNum = Number(rate);
const rateValidation = (Number.isInteger(rateNum) && (rateNum >= 1 && rateNum <= 5));

if (!rateValidation) {
  return res.status(400).json({
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
} 

 return next();
}
module.exports = isRate2paramValid;
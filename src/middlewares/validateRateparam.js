const path = require('path');

const fs = require('fs').promises;

const talkersPath = path.resolve(__dirname, '../talker.json');

const readFile = async () => {
  try {
    const data = await fs.readFile(talkersPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Arquivo não pôde ser lido: ${error}`);
  }
};

async function isRateparamValid(req, res, next) {
const { q, rate } = req.query;
const talkers = await readFile();
const rateNum = Number(rate);
const rateValidation = (Number.isInteger(rateNum) && (rateNum >= 1 && rateNum <= 5));

if (!q && rateValidation) {
 const searchResult = talkers.filter((t) => t.talk.rate === Number(rate));
  return res.status(200).json(searchResult);
} 

 return next();
}
module.exports = isRateparamValid;
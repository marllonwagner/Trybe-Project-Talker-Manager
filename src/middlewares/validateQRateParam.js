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

async function isQRateparamValid(req, res, next) {
const { q, rate, date } = req.query;
const talkers = await readFile();

if ((q && rate) && !date) {
  const result = talkers.filter((t) => t.name.includes(q))
  .filter((t) => t.talk.rate === Number(rate));
  return res.status(200).json(result);
}

 return next();
}
module.exports = isQRateparamValid;
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

function validateDate(dateString) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(dateString);
}

async function isDate2paramValid(req, res, next) {
  const { date, rate, q } = req.query;
  const talkers = await readFile();

  if (validateDate(date) && rate === undefined && q === undefined) {
   const searchResult = talkers.filter((t) => t.talk.watchedAt === date);
   return res.status(200).json(searchResult);
  } 
    return next();
  }
  
  module.exports = isDate2paramValid;
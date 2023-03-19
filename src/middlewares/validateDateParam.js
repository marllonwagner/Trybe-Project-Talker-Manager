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

async function isDateparamValid(req, res, next) {
  const { date } = req.query;
  const talkers = await readFile();
  
  if (validateDate(date) || date === undefined) return next();
  if (date === '') return res.status(200).json(talkers);
  
    return res.status(400).json({
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
    });
  }
  
  module.exports = isDateparamValid;
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

async function isQ1paramValid(req, res, next) {
const { q, rate } = req.query;
const talkers = await readFile();

if (q === '') return res.status(200).json(talkers);
if (q === undefined && !rate) return res.status(200).json([]);

 return next();
}
module.exports = isQ1paramValid;
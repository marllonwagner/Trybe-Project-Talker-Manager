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

async function isQ2paramValid(req, res, next) {
const { q, rate } = req.query;
const talkers = await readFile();

// if (q === '') return res.status(200).json(talkers);
// if (q === undefined && !rate) return res.status(200).json([]);
if (q && !rate) {
 const searchResult = talkers.filter((t) => t.name.includes(q));
  return res.status(200).json(searchResult);
} 

 return next();
}
module.exports = isQ2paramValid;
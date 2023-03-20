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

async function isDateQparamValid(requisition, response, next) {
const { rate, date, q } = requisition.query;
const talkers = await readFile();
// let searchResult = talkers;

// if (q) searchResult = searchResult.filter((t) => t.name.includes(q));
// if (date) searchResult = searchResult.filter((t) => t.talk.watchedAt.includes(date));
// if (rate) searchResult = searchResult.filter((t) => t.talk.rate === Number(rate));

if ((date && q) && rate === undefined) {
  const searchResult = talkers.filter((t) => t.name.includes(q))
  .filter((t) => t.talk.watchedAt === (date));
return response.status(200).json(searchResult);
}
return next();
}

module.exports = isDateQparamValid;

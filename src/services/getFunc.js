/* eslint-disable complexity */
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

async function getTalkerFunc(requisition, response) {
  const { id } = requisition.params;
  const talkers = await readFile();

  if (id) {
    const talker = talkers.find((t) => t.id === Number(id));

    if (!talker) {
      return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return response.json(talker);
  }

  if (talkers.length === 0) {
    return response.status(200).json([]);
  }

  response.status(200).json(talkers);
}

async function getTalkerSearchFunc(requisition, response) {
const { rate, date, q } = requisition.query;
const talkers = await readFile();
// let searchResult = talkers;

// if (q) searchResult = searchResult.filter((t) => t.name.includes(q));
// if (date) searchResult = searchResult.filter((t) => t.talk.watchedAt.includes(date));
// if (rate) searchResult = searchResult.filter((t) => t.talk.rate === Number(rate));

const searchResult = talkers.filter((t) => t.name
.includes(q)).filter((t) => t.talk.watchedAt
.includes(date)).filter((t) => t.talk.rate === Number(rate));

return response.status(200).json(searchResult);
}

module.exports = { getTalkerFunc,
  getTalkerSearchFunc,
   };

// if (!rate && q && date) {
//   searchResult = searchResult.filter((e) => e.name.includes(q))
// .filter((te) => te.talk.watchedAt === date);

// return response.status(200).json(searchResult);
// }

// searchResult = searchResult.filter((e) => e.name.includes(q))
// .filter((te) => te.talk.watchedAt === date)
// .filter((t) => t.talk.rate === Number(rate));

// if (q) searchResult = searchResult.filter((t) => t.name.includes(q));
// if (rate) searchResult = searchResult.filter((t) => t.talk.rate === Number(rate));
// if (date) searchResult = searchResult.filter((t) => t.talk.watchedAt.includes(date));
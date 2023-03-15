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
    const talker = talkers.find((movie) => movie.id === Number(id));

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
const { q } = requisition.query;
const talkers = await readFile();
const searchResult = talkers.filter((t) => t.name.includes(q));
return response.status(200).json(searchResult);
}

module.exports = { getTalkerFunc,
  getTalkerSearchFunc };
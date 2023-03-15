const crypt = require('crypto');

const fs = require('fs').promises;

const path = require('path');

const talkersPath = path.resolve(__dirname, '../talker.json');

const readFile = async () => {
  try {
    const data = await fs.readFile(talkersPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Arquivo não pôde ser lido: ${error}`);
  }
};

  async function postLoginFunc(_requisition, response) {
await response.status(200).json({ token: crypt.randomBytes(8).toString('hex') });
}

async function postTalkerFunc(requisition, response) {
  try {
    const talkers = await readFile();
    // let lastMovieId = movies.length > 0 ? movies[movies.length - 1].id : 0;
    const newTalker = { ...requisition.body };
    talkers.push(newTalker);

    await fs.writeFile(talkersPath, JSON.stringify(talkers, null, 2));
    response.status(201).json({ newTalker });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Erro ao gravar no arquivo JSON.' });
  }
}

module.exports = { postLoginFunc,
  postTalkerFunc };
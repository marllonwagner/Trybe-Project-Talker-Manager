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

async function patchTalkerFunc(requisition, response) {
    const talkers = await readFile();
    const { id } = requisition.params;
    const { rate } = requisition.body;
    const talkerIndex = talkers.findIndex((t) => t.id === Number(id));
    if (talkerIndex < 0) {
 return response.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
}
    const updatedTalker = { id: Number(id),
name: talkers[talkerIndex]
      .name,
age: talkers[talkerIndex].age,
talk: { watchedAt: talkers[talkerIndex].talk.watchedAt, rate: Number(rate) } };
    talkers[talkerIndex] = updatedTalker;
    await fs.writeFile(talkersPath, JSON.stringify(talkers, null, 2));
    return response.status(204).send();
}

module.exports = patchTalkerFunc;
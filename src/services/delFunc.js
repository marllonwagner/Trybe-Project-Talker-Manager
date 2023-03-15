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

async function delTalkerFunc(requisition, response) {
  try {
    const talkers = await readFile();
    const { id } = requisition.params;
    const talkerIndex = talkers.findIndex((t) => t.id === Number(id));
    if (talkerIndex < 0) {
 return response.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
}
    const newTalkers = talkers.filter((t) => t.id !== Number(id));
    await fs.writeFile(talkersPath, JSON.stringify(newTalkers, null, 2));
    return response.status(204).send();
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = delTalkerFunc;
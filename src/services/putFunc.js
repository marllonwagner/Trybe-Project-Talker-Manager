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

// async function putTalkerFunc(requisition, response) {
//   const talkers = await readFile();
//   const { id } = requisition.params;
//   const talker = talkers.find((t) => t.id === Number(id));
//   try {
//     if (!talker) {
//  return response.status(404).json({ 
//         message: 'Pessoa palestrante não encontrada',
//       }); 
// } 
 
//     const updatedTalker = { id: Number(id), ...requisition.body };
//    await fs.writeFile(talkersPath, JSON.stringify(talkers, null, 2), (err) => {
//       if (err) {
//        return response.status(500).json({ error: 'Error writing to JSON file' });
//       } else {
//       return response.status(200).json(updatedTalker);
//       }
//     });
//   } catch (err) {
//   return  response.status(500).json({ error: 'Internal server error' });
//   }
// }

async function putTalkerFunc(requisition, response) {
  try {
    const talkers = await readFile();
    const { id } = requisition.params;
    const talkerIndex = talkers.findIndex((t) => t.id === Number(id));
    if (talkerIndex < 0) {
 return response.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
}
    const updatedTalker = { id: Number(id), ...requisition.body };
    talkers[talkerIndex] = updatedTalker;
    await fs.writeFile(talkersPath, JSON.stringify(talkers, null, 2));
    return response.status(200).json(updatedTalker);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = putTalkerFunc;
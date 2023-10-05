const fs = require('fs').promises;

const readFiles = async () => {
  const data = await fs.readFile('src/talker.json', 'utf-8');
  return JSON.parse(data); 
};

const getTalkerById = async (id) => {
  const data = await readFiles();
  const newData = data.find((talker) => talker.id === id);
  return newData;
};

module.exports = {
  readFiles,
  getTalkerById,
};

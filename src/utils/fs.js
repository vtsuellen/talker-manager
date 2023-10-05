const fs = require('fs').promises;

const readFiles = async () => {
  const data = await fs.readFile('src/talker.json', 'utf-8');
  return JSON.parse(data); 
};

module.exports = {
  readFiles,
};

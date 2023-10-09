const fs = require('fs').promises;
const crypto = require('crypto');

const readFiles = async () => {
  const data = await fs.readFile('src/talker.json', 'utf-8');
  return JSON.parse(data); 
};

const getTalkerById = async (id) => {
  const data = await readFiles();
  const newData = data.find((talker) => talker.id === id);
  return newData;
};

const generateToken = (length) => {
  const byteLength = Math.ceil(length / 2);
  const buffer = crypto.randomBytes(byteLength);
  const token = buffer.toString('hex').slice(0, length);

  return token;
};

module.exports = {
  readFiles,
  getTalkerById,
  generateToken,
};

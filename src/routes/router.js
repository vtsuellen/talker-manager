const { Router } = require('express');
const { readFiles, getTalkerById, generateToken } = require('../utils/fs');

const router = Router();

router.get('/talker', async (_req, res) => {  
  const talkers = await readFiles();
  return res.status(200).json(talkers);
});

router.get('/talker/:id', async (_req, res) => {
  const { id } = _req.params;
  const talkers = await getTalkerById(Number(id));
  if (!talkers) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talkers); 
});

router.post('/login', async (_req, res) => {
  const token = generateToken(16);
  if (!token) return res.status(401).json({ message: 'Email e senha são obrigatórios' });
  return res.status(200).json({ token });
});

module.exports = router;
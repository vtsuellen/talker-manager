const { Router } = require('express');
const statusCode = require('../utils/statusCode');
const { readFiles,
  getTalkerById,
  generateToken,
  getTalkers, 
  updateTalker } = require('../utils/fs');
const { validateLogin } = require('../middlewares/validateLogin');
const { validateAge } = require('../middlewares/validateAge');
const { validateName } = require('../middlewares/validateName');
const { validateRate } = require('../middlewares/validateRate');
const { validateTalk } = require('../middlewares/validateTalk');
const { validateToken } = require('../middlewares/validateToken');
const { validateWatchedAt } = require('../middlewares/validateWatchedAt');

const router = Router();

router.get('/talker', async (_req, res) => {  
  const talkers = await readFiles();
  return res.status(statusCode.OK).json(talkers);
});

router.get('/talker/:id', async (_req, res) => {
  const { id } = _req.params;
  const talkers = await getTalkerById(Number(id));
  if (!talkers) {
    return res.status(statusCode.NOT_FOUND)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(statusCode.OK).json(talkers); 
});

router.post('/login', validateLogin, async (_req, res) => {
  try {
    const token = generateToken(16);
    return res.status(statusCode.OK).json({ token });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error });
  }
});

router.post('/talker',
  validateToken, 
  validateAge,
  validateName,
  validateTalk,
  validateRate, 
  validateWatchedAt,
  async (_req, res) => {
    try {
      const talkers = await getTalkers();
      const newTalker = { ..._req.body, id: talkers.length + 1 };
      talkers.push(newTalker);
      await updateTalker(talkers);
      console.log(newTalker);
      return res.status(statusCode.CREATED).json(newTalker);
    } catch (error) {
      console.log(error);
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  });

router.put('/talker/:id',
  validateToken, 
  validateAge,
  validateName,
  validateTalk,
  validateRate, 
  validateWatchedAt,
  async (_req, res) => {
    try {
      const talkers = await getTalkers();
      const id = Number(_req.params.id);
      const index = talkers.findIndex((talker) => talker.id === id);
      if (index === -1) {
        return res.status(statusCode.NOT_FOUND)
          .json({ message: 'Pessoa palestrante não encontrada' });
      }
      const newTalker = { ..._req.body, id };
      talkers[index] = newTalker;
      await updateTalker(talkers); 
      
      return res.status(statusCode.OK).json(newTalker);
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  });

router.delete('/talker/:id', 
  validateToken,
  async (_req, res) => {
    try {
      const { id } = _req.params;
      const talkers = await getTalkers();
      const index = talkers.findIndex((talker) => talker.id === Number(id));
      if (index === -1) {
        return res.status(statusCode.NOT_FOUND)
          .json({ message: 'Pessoa palestrante não encontrada' });
      }
      const newTalkers = talkers.filter((talker) => talker.id !== Number(id));
      await updateTalker(newTalkers);
      return res.status(statusCode.NO_CONTENT).json();
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  });

module.exports = router;
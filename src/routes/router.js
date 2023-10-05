const { Router } = require('express');
const { readFiles } = require('../utils/fs');

const router = Router();

router.get('/talker', async (_req, res) => {  
  const talkers = await readFiles();
  return res.status(200).json(talkers);
});

module.exports = router;
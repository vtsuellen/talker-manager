const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;
  const Rate = /^[1-5]$/;

  if (!rate && rate !== 0) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!Rate.test(rate)) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

module.exports = {
  validateRate,
};
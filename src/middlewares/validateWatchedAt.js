const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const WatchedAt = /^\d{2}\/\d{2}\/\d{4}$/.test(watchedAt);

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!WatchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = {
  validateWatchedAt,
};
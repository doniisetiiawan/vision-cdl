const logger = require('../logger');

exports.index = (req, res) => {
  logger.error('Not Found');
  res.status(404).json('Not Found.');
};

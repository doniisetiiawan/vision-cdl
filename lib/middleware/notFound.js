import logger from '../logger';

const index = (req, res) => {
  logger.error('Not Found');
  res.status(404).json('Not Found.');
};

export default index;

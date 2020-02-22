const winston = require('winston');
const config = require('../configuration');

function Logger() {
  return winston.createLogger(
    {
      level: config.get('logger:level'),
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: config.get('logger:filename') }),
      ],
    },
  );
}

module.exports = new Logger();

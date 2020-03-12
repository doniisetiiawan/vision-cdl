import winston from 'winston';
import config from '../configuration';

const Logger = () => winston.createLogger({
  level: config.get('logger:level'),
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: config.get('logger:filename'),
    }),
  ],
});

export default new Logger();

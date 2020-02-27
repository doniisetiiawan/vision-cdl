const helmet = require('helmet');

function Security(app) {
  if (
    process.env.NODE_ENV === 'TEST'
    || process.env.NODE_ENV === 'COVERAGE'
  ) return;

  app.use(helmet.frameguard());
  app.use(helmet.hsts());
  app.use(helmet.xssFilter());
  app.use(helmet.contentSecurityPolicy());
}

module.exports = Security;

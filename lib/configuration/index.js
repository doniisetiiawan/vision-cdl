const nconf = require('nconf');
const path = require('path');
const fs = require('fs');

const environment = process.env.NODE_ENV || 'development';

nconf
  .argv()
  .env()
  .file({
    file: path.resolve(
      __dirname,
      '../../config',
      `${environment}.json`,
    ),
  })
  .defaults({
    store: JSON.parse(
      fs.readFileSync(
        path.resolve(
          __dirname,
          '../../config',
          'default.json',
        ),
        'utf8',
      ),
    ),
  });

module.exports = nconf;
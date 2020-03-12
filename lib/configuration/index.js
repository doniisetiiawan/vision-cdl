import nconf from 'nconf';
import path from 'path';
import fs from 'fs';

const environment = process.env.NODE_ENV || 'development';

nconf
  .argv()
  .env()
  .file({
    file: path.resolve(
      __dirname,
      '../../config',
      `${environment.toLowerCase()}.json`,
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

export default nconf;

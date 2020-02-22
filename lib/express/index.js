const express = require('express');
const logger = require('morgan');
const config = require('../configuration');
const heartbeat = require('../routes/heartbeat');
const notFound = require('../middleware/notFound');

const app = express();
app.set('port', config.get('express:port'));

app.use(logger('dev', { immediate: false }));

app.get('/heartbeat', heartbeat.index);
app.use(notFound.index);

app.listen(app.get('port'), () => console.log(
  `Example app listening on port ${app.get('port')}!`,
));
module.exports = app;

const express = require('express');
const config = require('../configuration');
const heartbeat = require('../routes/heartbeat');

const app = express();
app.set('port', config.get('express:port'));

app.get('/heartbeat', heartbeat.index);

app.listen(app.get('port'), () => console.log(
  `Example app listening on port ${app.get('port')}!`,
));
module.exports = app;

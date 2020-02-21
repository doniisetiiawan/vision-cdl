const express = require('express');
const config = require('../configuration');

const app = express();
app.set('port', config.get('express:port'));

app.get('/heartbeat', (req, res) => {
  res.status(200).json('OK');
});

app.listen(app.get('port'), () => console.log(`Example app listening on port ${app.get('port')}!`));
module.exports = app;

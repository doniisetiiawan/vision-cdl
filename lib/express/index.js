const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('../configuration');
const heartbeat = require('../routes/heartbeat');
const notFound = require('../middleware/notFound');
const project = require('../routes/project');
const id = require('../middleware/id');

require('../db');

const app = express();
app.set('port', config.get('express:port'));

app.use(logger('dev', { immediate: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.param('id', id.validate);

app.get('/heartbeat', heartbeat.index);
app.get('/project/:id', project.get);
app.get('/project', project.all);
app.post('/project', project.post);
app.put('/project/:id', project.put);
app.delete('/project/:id', project.del);
app.use(notFound.index);

app.listen(app.get('port'), () => console.log(
  `Example app listening on port ${app.get('port')}!`,
));
module.exports = app;

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('../configuration');
const notFound = require('../middleware/notFound');
const id = require('../middleware/id');
const routes = require('../routes');

require('../db');

const app = express();
app.set('port', config.get('express:port'));

app.use(logger('dev', { immediate: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.param('id', id.validate);

app.get('/heartbeat', routes.heartbeat.index);
app.get('/project/:id', routes.project.get);
app.get('/project', routes.project.all);
app.post('/project', routes.project.post);
app.put('/project/:id', routes.project.put);
app.delete('/project/:id', routes.project.del);
app.use(notFound.index);

app.listen(app.get('port'), () => console.log(
  `Example app listening on port ${app.get('port')}!`,
));
module.exports = app;

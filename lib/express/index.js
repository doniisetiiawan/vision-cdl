import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import routes from '../routes';
import validate from '../middleware/id';
import notFound from '../middleware/notFound';
import config from '../configuration';

import '../db';

const app = express();
app.set('port', config.get('express:port'));

app.use(logger('dev', { immediate: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet());
app.use(compression());

app.param('id', validate);

app.get('/heartbeat', routes.heartbeat.index);
app.get('/project/:id', routes.project.get);
app.get('/project', routes.project.all);
app.post('/project', routes.project.post);
app.put('/project/:id', routes.project.put);
app.delete('/project/:id', routes.project.del);
app.use(notFound);

app.listen(app.get('port'), () => console.log(
  `Example app listening on port ${app.get('port')}!`,
));

export default app;

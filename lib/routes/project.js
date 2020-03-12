import S from 'string';
import logger from '../logger';
import login from '../../test/login';
import ProjectService from '../project';

const Project = new ProjectService();

const all = (req, res) => {
  logger.info(`Request.${req.url}`);

  const userId = login.user || req.query.user || req.user.id;

  Project.all(userId, (error, projects) => {
    if (error) return res.json(500, 'Internal Server Error');
    if (projects == null) projects = {};
    return res.status(200).json(projects);
  });
};

const get = (req, res) => {
  logger.info(`Request.${req.url}`);

  Project.get(req.params.id, (error, project) => {
    if (error) return res.json(500, 'Internal Server Error');
    if (project == null) return res.json(404, 'Not Found');
    return res.status(201).json(project);
  });
};

const put = (req, res) => {
  logger.info(`Put.${req.params.id}`);

  if (S(req.body.name).isEmpty()) return res.json(400, 'Bad Request');

  req.body.user = login.user;
  req.body.token = login.token;

  Project.put(req.params.id, req.body, (error, project) => {
    if (error) return res.json(500, 'Internal Server Error');
    if (project == null) return res.json(404, 'Not Found');
    return res.status(204).json('No Content');
  });
};

const post = (req, res) => {
  logger.info(`Post.${req.body.name}`);

  if (S(req.body.name).isEmpty()) return res.json(400, 'Bad Request');

  req.body.user = login.user;
  req.body.token = login.token;

  Project.post(
    req.body.name,
    req.body,
    (error, project) => {
      if (error) return res.json(500, 'Internal Server Error');
      if (project == null) return res.json(409, 'Conflict');
      res.location(`/project/${project._id}`);
      return res.status(201).json(project);
    },
  );
};

const del = (req, res) => {
  logger.info(`Delete.${req.params.id}`);

  Project.del(req.params.id, (error, project) => {
    if (error) return res.json(500, 'Internal Server Error');
    if (project == null) return res.json(404, 'Not Found');
    return res.status(204).json('No Content');
  });
};

export {
  all, get, put, post, del,
};

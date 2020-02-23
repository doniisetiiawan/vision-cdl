const S = require('string');
const logger = require('../logger');
const login = require('../../test/login');
const ProjectService = require('../project');

const Project = new ProjectService();

exports.get = (req, res) => {
  logger.info(`Request.${req.url}`);

  Project.get(req.params.id, (error, project) => {
    if (error) return res.json(500, 'Internal Server Error');
    if (project == null) return res.json(404, 'Not Found');
    return res.status(201).json(project);
  });
};

exports.post = (req, res) => {
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

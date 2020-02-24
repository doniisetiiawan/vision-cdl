const ProjectSchema = require('../models').model('Project');

function Project() {}

Project.prototype.get = (id, callback) => {
  const query = { _id: id };

  ProjectSchema.findOne(query, (error, project) => {
    if (error) return callback(error, null);
    return callback(null, project);
  });
};

Project.prototype.put = (id, update, callback) => {
  const query = { _id: id };
  delete update._id;

  ProjectSchema.findOne(query, (error, project) => {
    if (error) return callback(error, null);
    if (project == null) return callback(null, null);

    ProjectSchema.updateOne(
      query,
      update,
      (error, project) => {
        console.log(project);
        if (error) return callback(error, null);
        return callback(null, {});
      },
    );
  });
};

Project.prototype.post = (name, data, callback) => {
  const query = { name };
  const project = new ProjectSchema(data);

  ProjectSchema.findOne(query, (error, proj) => {
    if (error) return callback(error, null);
    if (proj != null) return callback(null, null);

    project.save((error, p) => {
      if (error) return callback(error, null);
      return callback(null, p);
    });
  });
};

module.exports = Project;

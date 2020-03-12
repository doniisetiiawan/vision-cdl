/* eslint-disable class-methods-use-this */
import mongoose from 'mongoose';
import ProjectSchemax from '../models';

const ProjectSchema = mongoose.model(
  'Project',
  ProjectSchemax,
);

class Project {
  all(id, callback) {
    const query = { user: id };

    ProjectSchema.find(query, (error, projects) => {
      if (error) return callback(error, null);
      return callback(null, projects);
    });
  }

  get(id, callback) {
    const query = { _id: id };

    ProjectSchema.findOne(query, (error, project) => {
      if (error) return callback(error, null);
      return callback(null, project);
    });
  }

  put(id, update, callback) {
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
  }

  post(name, data, callback) {
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
  }

  del(id, callback) {
    const query = { _id: id };

    ProjectSchema.findOne(query, (error, project) => {
      if (error) return callback(error, null);
      if (project == null) return callback(null, null);

      project.remove((error) => {
        if (error) return callback(error, null);
        return callback(null, {});
      });
    });
  }
}

export default Project;

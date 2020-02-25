const async = require('async');
const util = require('util');
require('../db');
const Publisher = require('../cache/publisher');
const Project = require('../models').model('Project');

function Populate(...args) {
  Publisher.apply(this, args);
}

util.inherits(Populate, Publisher);

Populate.prototype.run = (callback) => {
  Project.find({}, (error, projects) => {
    if (error) callback();
    if (projects == null) callback();

    async.each(
      projects,
      (project, callback) => {
        callback(error);
      },
      (error) => {
        callback(error);
      },
    );
  });
};

module.exports = Populate;

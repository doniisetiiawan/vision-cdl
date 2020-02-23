/* eslint-disable no-undef */
const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../app');
const login = require('./login');

describe('vision project api', () => {
  beforeEach((done) => {
    mongoose.connection.collections.projects.drop(() => {
      const proj = {
        name: 'test name',
        user: login.user,
        token: login.token,
        repositories: ['node-plates'],
      };

      mongoose.connection.collections.projects.insertOne(
        proj,
        () => {
          // id = docs[0]._id;
          console.log(proj._id);
          done();
        },
      );
    });
  });

  describe('when creating a new resource /project', () => {
    const project = {
      name: 'new project',
      user: login.user,
      token: login.token,
      repositories: ['12345', '9898'],
    };

    it('should respond with 201', (done) => {
      request(app)
        .post('/project')
        .send(project)
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          const proj = JSON.parse(res.text);
          assert.equal(proj.name, project.name);
          assert.equal(proj.user, login.user);
          assert.equal(proj.token, login.token);
          assert.equal(
            proj.repositories[0],
            project.repositories[0],
          );
          assert.equal(
            proj.repositories[1],
            project.repositories[1],
          );
          assert.equal(
            res.header.location,
            `/project/${proj._id}`,
          );
          done();
        });
    });
  });
});

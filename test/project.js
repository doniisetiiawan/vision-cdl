import mocha from 'mocha';
import request from 'supertest';
import assert from 'assert';
import mongoose from 'mongoose';
import _ from 'underscore';
import app from '../app';
import login from './login';

const { describe, it, beforeEach } = mocha;

describe('vision project api', () => {
  let id;

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
          id = proj._id;
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

  describe('when requesting resource get all projects', () => {
    it('should respond with 200', (done) => {
      request(app)
        .get(`/project/?user=${login.user}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          const proj = _.first(JSON.parse(res.text));
          assert(_.has(proj, '_id'));
          assert(_.has(proj, 'name'));
          assert(_.has(proj, 'user'));
          assert(_.has(proj, 'token'));
          assert(_.has(proj, 'created'));
          assert(_.has(proj, 'repositories'));
          done();
        });
    });
  });

  describe('when requesting an available resource /project/:id', () => {
    it('should respond with 200', (done) => {
      request(app)
        .get(`/project/${id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          const proj = JSON.parse(res.text);
          console.log(proj);
          assert.equal(proj._id, id);
          assert(_.has(proj, '_id'));
          assert(_.has(proj, 'name'));
          assert(_.has(proj, 'user'));
          assert(_.has(proj, 'token'));
          assert(_.has(proj, 'created'));
          assert(_.has(proj, 'repositories'));
          done();
        });
    });
  });

  describe('when updating an existing resource /project/:id', () => {
    const project = {
      name: 'new test name',
      user: login.user,
      token: login.token,
      repositories: ['12345', '9898'],
    };

    it('should respond with 204', (done) => {
      request(app)
        .put(`/project/${id}`)
        .send(project)
        .expect(204, done);
    });
  });

  describe('when deleting an existing resource /project/:id', () => {
    it('should respond with 204', (done) => {
      request(app)
        .del(`/project/${id}`)
        .expect(204, done);
    });
  });
});

/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');

describe('vision heartbeat api', () => {
  describe('when requesting resource /heartbeat', () => {
    it('should respond with 200', (done) => {
      request(app)
        .get('/heartbeat')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});

/* eslint-disable no-undef */
import request from 'supertest';

import app from '../app';

describe('vision heartbeat api', () => {
  describe('when requesting resource /heartbeat', () => {
    it('should respond with 200', (done) => {
      request(app)
        .get('/heartbeat')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('when requesting resource /missing', () => {
    it('should respond with 404', (done) => {
      request(app)
        .get('/missing')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
  });
});

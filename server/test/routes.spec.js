process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('./../server.js');

chai.use(chaiHttp);

describe('API Routes', () => {
  describe('GET /api/v1/users', () => {
    it('should return all users', done => {
      chai.request(server).get('/api/v1/users').end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(1);
        done();
      });
    });
  });
});

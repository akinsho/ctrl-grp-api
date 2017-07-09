process.env.NODE_ENV = 'test';

const knex = require('./../database_knex/db.js');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('./../server.js');

chai.use(chaiHttp);

const mochaAsync = fn => async () => {
  try {
    await fn();
  } catch (e) {
    return e;
  }
};

describe('API Routes', () => {
  beforeEach(
    mochaAsync(async () => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      const seedrun = await knex.seed.run();
      return seedrun;
    })
  );

  afterEach(
    mochaAsync(async () => {
      await knex.migrate.rollback();
    })
  );
  describe('GET /api/v1/users', () => {
    it('should return all users', done => {
      chai.request(server).get('/api/v1/users').end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(1);
        res.body[0].should.have.property('firstname');
        res.body[0].should.have.property('surname');
        done();
      });
    });
  });
  describe('GET /api/v1/users/:id', () => {
    it('should return a single user', done => {
      chai.request(server).get('/api/v1/users/1').end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.firstname.should.equal('akin');
        res.body.should.have.property('surname');
        done();
      });
    });
  });
  describe('POST /api/v1/user/new', () => {
    it('should add a new user and their start date on the app', done => {
      chai
        .request(server)
        .post('/api/v1/user/new')
        .send({
          firstname: 'john',
          surname: 'thomas',
          start_date: '2017/07/07'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('surname');
          res.body.should.have.property('start_date');
          res.body.start_date.should.equal('2017/07/07');
          res.body.firstname.should.equal('john');
          done();
        });
    });
  });
});
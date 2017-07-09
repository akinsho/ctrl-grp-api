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
});

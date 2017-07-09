const knex = require('./db.js');

const Shows = () => knex('users');

const getAll = () => Shows().select();

module.exports = {
  getAll
};

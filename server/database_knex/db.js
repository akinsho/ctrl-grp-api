const config = require('./../knexfile.js');
const env = process.env.NODE_ENV || 'development';
const knex = require('knex')(config[env]);

module.exports = knex;

if (process.env.NODE_ENV === 'development') {
  knex.migrate.latest(config[env]);
}

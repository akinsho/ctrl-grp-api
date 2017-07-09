const knex = require('./db.js');

const Shows = () => knex('users');

const getAll = () => Shows().select();

//Ideally a users details will be retrieved by comparing a hashed password to
//the submitted password i.e. using something like bcrypt
const getSingle = firstname => Shows().where('firstname', firstname).first();

module.exports = {
  getAll,
  getSingle
};

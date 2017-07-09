const knex = require('./db.js');

const Users = () => knex('users');

const getAll = () => Users().select();

//Ideally a users details will be retrieved by comparing a hashed password to
//the submitted password i.e. using something like bcrypt
const getSingle = userID => Users().where('id', parseInt(userID)).first();

const addUser = user => {
  console.log('user', user);
  return Users().insert(user, 'id');
};

module.exports = {
  getAll,
  getSingle,
  addUser
};

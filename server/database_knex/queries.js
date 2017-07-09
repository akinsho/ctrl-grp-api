const knex = require('./db.js');

const Users = () => knex('users');

const addUser = user => Users().insert(user, 'id');

const MedicationHistory = () => knex('medication_history');

const getSingleMed = id =>
  MedicationHistory().where('patient_id', parseInt(id)).first();

const getAll = () => Users().select();

//Ideally a users details will be retrieved by comparing a hashed password to
//the submitted password i.e. using something like bcrypt
const getSingleUser = userID => Users().where('id', parseInt(userID)).first();

const updateMedication = (userID, updates) => {
  return MedicationHistory()
    .where('patient_id', parseInt(userID))
    .update(updates);
};

module.exports = {
  getAll,
  getSingleUser,
  getSingleMed,
  addUser,
  updateMedication
};

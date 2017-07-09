const express = require('express');
const router = express.Router();
const queries = require('./../database_knex/queries');

router.get('/users', (req, res, next) =>
  queries
    .getAll()
    .then(shows => res.status(200).json(shows))
    .catch(err => next(err))
);

router.get('/users/:id', ({ params: { id } }, res, next) => {
  queries
    .getSingleUser(id)
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
});

router.post('/user/new', ({ body }, res, next) => {
  queries
    .addUser(body)
    .then(userID => queries.getSingleUser(userID))
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
});

router.get('/users/:id/medication', ({ params: { id }, body }, res, next) => {
  queries
    .getSingleMed(id)
    .then(medication => res.status(200).json(medication))
    .catch(err => next(err));
});

router.put('/users/:id/medication', ({ params: { id }, body }, res, next) => {
  queries
    .updateMedication(id, body)
    .then(() => queries.getSingleMed(id))
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
});

module.exports = router;

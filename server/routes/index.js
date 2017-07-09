const express = require('express');
const router = express.Router();
const queries = require('./../database_knex/queries');

router.get('/users', (req, res, next) =>
  queries
    .getAll()
    .then(shows => res.status(200).json(shows))
    .catch(err => next(err))
);

router.get('/users/:id', (req, res, next) => {
  queries
    .getSingle(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => next(err));
});

router.post('/user/new', (req, res, next) => {
  console.log('req', req.body);
  queries
    .addUser(req.body)
    .then(userID => queries.getSingle(userID))
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
});

module.exports = router;

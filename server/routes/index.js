const express = require('express');
const router = express.Router();
const queries = require('./../database_knex/queries');

router.get('/users', (req, res, next) =>
  queries
    .getAll()
    .then(shows => res.status(200).json(shows))
    .catch(err => next(err))
);

module.exports = router;

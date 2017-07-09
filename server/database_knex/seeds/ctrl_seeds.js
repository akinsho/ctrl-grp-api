exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('users').del(),
    knex('medication_history').del(),
    knex('evening_check').del(),
    knex('two_weekly_check')
  ).then(function() {
    // Inserts seed entries
    return knex('users').insert([
      { firstname: 'akin', surname: 'sowemimo', start_date: '2015/07/20' }
    ]);
  });
};

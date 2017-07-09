exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('users').del(),
    knex('medication_history').del(),
    knex('evening_check').del(),
    knex('two_weekly_check'),
    // Inserts seed entries
    knex('users')
      .insert([
        { firstname: 'akin', surname: 'sowemimo', start_date: '2015/07/20' }
      ])
      .then(() =>
        knex('medication_history').insert({
          patient_id: 1,
          medication: 'sertraline',
          day_started: '2015/10/07',
          dosage_changed: '2016/08/20'
        })
      )
      .then(() =>
        knex('evening_check').insert({
          wellbeing: 100,
          patient_id: 1,
          date_of_check: '2017/07/11',
          medication_taken: true,
          survey_responses: 'Q1:1 Q2:2 Q3:3'
        })
      )
      .then(() =>
        knex('two_weekly_check').insert({
          date_of_survey: '2016/10/07',
          patient_id: 1,
          nine_question_survey: '9 question',
          five_question_survey: '5 question'
        })
      )
  );
};

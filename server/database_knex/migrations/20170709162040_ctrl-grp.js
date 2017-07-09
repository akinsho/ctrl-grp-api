exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('firstname').notNull();
      table.string('surname').notNull();
      table.date('start_date').notNull();
    }),
    knex.schema.createTable('medication_history', table => {
      table.increments('id').primary();
      table.integer('patient_id').references('id').inTable('users');
      table.string('medication').notNull();
      table.date('day_started').notNull();
      table.date('day_changed');
      table.date('dosage_changed');
    }),
    knex.schema.createTable('evening_check', table => {
      table.increments('id').primary();
      table.integer('patient_id').references('id').inTable('users');
      table.date('date_of_check');
      table.integer('wellbeing');
      table.boolean('medication_taken');
      table.string('survey_responses');
    }),
    knex.schema.createTable('two_weekly_check', table => {
      table.increments('id').primary();
      table.integer('patient_id').references('id').inTable('users');
      table.date('date_of_survey').notNull();
      table.string('nine_question_survey');
      table.string('five_question_survey');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('medication_history'),
    knex.schema.dropTable('evening_check'),
    knex.schema.dropTable('two_weekly_check'),
    knex.schema.dropTable('users')
  ]);
};

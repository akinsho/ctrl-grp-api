--Begin by rebuilding database removing potentially corrupt data
--Only to be run on initialisation.
--users table is core, using the user's id each datum i.e. history or evening
--check is related to the specific user
--TODO Ideally build DB with an ORM so that build is not dependent on the type
--of database
BEGIN;

  DROP TABLE IF EXISTS users, medication_history, evening_check, two_weekly_check CASCADE;

  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(40) NOT NULL,
    surname VARCHAR(40) NOT NULL,
    start_date DATE NOT NULL
  );

  CREATE TABLE medication_history (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES users (id),
    medication VARCHAR(100) NOT NULL,
    day_started DATE NOT NULL,
    day_changed DATE,
    dosage_change DATE
  );

  CREATE TABLE evening_check (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES users (id),
    date_of_check DATE NOT NULL,
    wellbeing INT,
    medication_taken BOOLEAN,
    survey_responses VARCHAR(1000)
  );

  CREATE TABLE two_weekly_check (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES users (id),
    date_of_survey DATE NOT NULL,
    nine_question_survey VARCHAR(1000),
    five_question_survey VARCHAR(1000)
  );

  INSERT INTO users (firstname, surname, start_date) VALUES (
    'akin', 'sowemimo', '20/07/2015'
  );

  INSERT INTO medication_history (patient_id, medication, day_started, dosage_change) VALUES (
    '1', 'sertraline', '10/07/2015', '20/08/2016'
  );

  INSERT INTO evening_check (wellbeing, patient_id, date_of_check, medication_taken, survey_responses) VALUES (
    100, '1','11/07/2017', true, 'Q1:1 Q2:2 Q3:3'
  );

  INSERT INTO two_weekly_check (date_of_survey, patient_id, nine_question_survey, five_question_survey) VALUES(
    '10/07/2016','1', '9 question', '5 question'
  );

  COMMIT;

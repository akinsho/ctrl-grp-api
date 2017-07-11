
A NodeJS API for the Ctrl-Group challenge
===

## Run Locally
* `git clone` the repository.
* `cd` into server run `npm install`.
 * run `npm run local` (Make sure you have `nodemon` if not `npm i -S nodemon`).
 * `curl http://localhost4001/api/v1/users` this should return a JSON object with user details.
 * run `npm test` to execute the test suite.

**API Endpoint**: https://ctrl-grp-api.herokuapp.com/

<img src="./demo.gif" alt="Demo of API's use" width="500px" height="400px"/>

The challenge was to create an API for an exisiting project for the CTRL-GRP

My approach to solving this problem involved developing a schema to model the data and their interactions.

## Users - 
|  id | firstname  |  surname |  start_date |
|---|---|---|---|
| 1  | Akin  |  Sowemimo |  2017/07/07 |

This table is core and provides user data to which all other tables relate

## Medication History -
|  patient_id | day_changed  | dosage_changed  |  medication | id  |
|---|---|---|---|---|
|  1 | 12/09/2016  |  null | Sertraline  |   3|

This table relates to each patient on contains data on when their medication changed, when their dose changed and what their medication is.

## Evening Check -
|  patient_id 	|   id	|   	date_of_check |  wellbeing 	|  medication_taken 	| survey_responses |
|---	          |---	  |---	              |---	        |---	                |---
|   1	          |   3	  |       12/07/2017 	|  87 	      |   yes	              |   Q1: 2, Q2: 3, Q3: 1  |

## Two Weekly Check -
|  patient_id 	|   id	|   	date_of_survey |  9 Question survey 	|  5 Question survey 	|
|---	          |---	  |---	              |---	        |---	                |
|   1	          |   1	  |       18/08/2016 	|  9/10 	      |   5//5           |


I use **knex** an ORM(Object relational mapping) to create a database using the `pg/postgresql` client, the advantage of using an ORM
for this project is that the underlying database can be swapped out for another type of relational database if needed. The queries made using
knex are abstracted away from the specific database used. 

Another advantage of an ORM is that knex handles migrations of the database so that any necessary changes can be made to the database schema. Such as for example in the [add_symptoms_migration](https://github.com/Akin909/ctrl-grp-api/blob/master/server/database_knex/migrations/20170710155524_add_symptoms_to_evening_check.js) I update the database with a new field `symptoms` at a later date which allowed me to extend the database with no alteration/loss to the existing data.

The API is a RESTFUL i.e. requests are made to endpoints such as `api/v1/users` to get all user information or more specifically/
more relevant to this particular application which employs a largely one way data flow, the query `api/v1/user/:id` where id represents
the particular user ID provides the specific user data

## Available Queries
* `GET /users` - provides information on all users
* `GET /users/:id` - provides the firstname, surname, date joined fields for a given user
* `POST /user/new` - adds a new user to the database
* `GET /users/:id/medication` - gives information on a users medication history i.e current medication date of dose changed etc.
* `PUT /users/:id/medication` - updates/edits information on a users medication history
* `POST /users/:id/evening` -add a new evening check with the fields `date_of_check`, `patient_id`,
`wellbeing`, `symptoms`, `survey responses`
* `GET /users/:id/evening/:date` - get information for a particular evening check given a particular date.
* `GET /users/:id/two_weekly/:date` - get information a two weekly check on a particular day.

I built this API using TDD, I constructed [tests](./server/test/routes.spec.js) for each endpoint by asserting what the desired results I wanted were supposed to be and proceeded to write the routes for each test.

Test
```js
  describe('PUT /api/v1/users/:id/medication', () => {
    it('should allow a user to update their medication', done => {
      chai
        .request(server)
        .put('/api/v1/users/1/medication')
        .send({
          medication: 'aripiprazole BD'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('medication');
          res.body.medication.should.equal('aripiprazole BD');
          done();
        });
    });
  });
```
Route
```js
router.put('/users/:id/medication', ({ params: { id }, body }, res, next) => {
  queries
    .updateMedication(id, body)
    .then(() => queries.getSingleMed(id))
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
});
```
## Issues
My current DB schema involves taking the data relating to each survey as a string with all the responses which
would then have to be parsed on the front or backend however if specific answers were needed. A potential solution would involve another table for all survey results however that would add a further level of complexity regarding accessing this information.

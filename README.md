# ctrl-grp-api
An NodeJS API for the ctrl-grp challenge

The challenge was to create an API for an exisiting project for the CTRL-GRP

My approach to this challenge was to use the **knex** ORM to create a database using the `pg` client, the advantage of using an ORM
for this project is that the underlying database can be swapped out for another type of relational database if needed. The queries made using
knex are abstracted away from the specific database used. 

Another advantage of an ORM is that knex handles migrations of the database so that any necessary changes can be made to the database schema

The API is a RESTFUL api i.e. requests are made to endpoints such as `api/v1/users` to get all user information or more specifically/
more relevant to this particular application which employs a largely one way data the query `api/v1/user/:id` where id represents
the particular user ID provides the specific user data

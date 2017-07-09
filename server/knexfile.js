module.exports = {
  development: {
    migrations: {
      directory: __dirname + '/database_knex/migrations'
    },
    seeds: {
      directory: __dirname + '/database_knex/seeds/'
    },
    client: 'postgresql',
    connection: 'postgres://A_nonymous@localhost/ctrl-grp'
  }
};

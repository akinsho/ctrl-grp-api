module.exports = {
  development: {
    migrations: {
      directory: __dirname + '/database_knex/migrations'
    },
    seeds: {
      directory: __dirname + '/database_knex/seeds/development'
    },
    client: 'pg',
    connection: {
      database: 'ctrl-grp-dev'
    }
  },
  test: {
    migrations: {
      directory: __dirname + '/database_knex/migrations'
    },
    seeds: {
      directory: __dirname + '/database_knex/seeds/test'
    },
    client: 'pg',
    connection: {
      database: 'ctrl-grp-test'
    }
  }
};

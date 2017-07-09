module.exports = {
  development: {
    migrations: {
      directory: __dirname + '/database_knex/migrations'
    },
    seeds: {
      directory: __dirname + '/database_knex/seeds/'
    },
    client: 'pg',
    connection: {
      database: 'ctrl-grp'
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

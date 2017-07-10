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
    },
    debug: true
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
    },
    debug: true
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: __dirname + '/database_knex/seeds/production'
  }
};

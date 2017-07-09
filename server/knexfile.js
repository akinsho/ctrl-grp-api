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
  }
};

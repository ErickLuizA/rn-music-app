import path from 'path'

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'src', 'infra', 'query-builder', 'knex', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'infra', 'query-builder', 'knex', 'seeds')
    },
  },

  // test: {
  //   client: 'sqlite3',
  //   connection: { filename: './__tests__/database.sqlite' },
  //   migrations: {
  //     directory: path.join(__dirname, 'src', 'infra', 'query-builder', 'knex', 'migrations')
  //   },
  //   seeds: {
  //     directory: path.join(__dirname, 'src', 'infra', 'query-builder', 'knex', 'seeds')
  //   },
  //   useNullAsDefault: true
  // },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'src', 'infra', 'query-builder', 'knex', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'infra', 'query-builder', 'knex', 'seeds')
    }
  }
}

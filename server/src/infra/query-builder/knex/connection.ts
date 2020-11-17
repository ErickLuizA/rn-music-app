import knex from 'knex'
const knexfile = require('../../../../knexfile') // eslint-disable-line @typescript-eslint/no-var-requires

const database = knex(knexfile.development)

export default database

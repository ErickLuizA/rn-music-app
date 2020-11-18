import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()

    table.string('name').notNullable()
    table.string('avatar').defaultTo(null)
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.string('token').defaultTo(null)

    table.timestamps(true, true)
  })
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.dropTable('users')
}

import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema
    .createTable('playlist', (table) => {
      table.increments('playlistId').primary()

      table.string('title').notNullable().unique()

      table.integer('userId').notNullable()
      table
        .foreign('userId')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamps(true, true)
    })
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.dropTable('playlist')
}

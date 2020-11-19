import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('favorites', (table) => {
    table.increments('favoriteId').primary()

    table.string('musicId')
    table.string('title')
    table.string('img')

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
  return await knex.schema.dropTable('favorites')
}

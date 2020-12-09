import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('playlist_music', table => {
    table.increments('playlistMusicId').primary()

    table.string('musicId')
    table.string('title')
    table.string('img')

    table.integer('playlistId').notNullable()
    table
      .foreign('playlistId')
      .references('playlistId')
      .inTable('playlist')
      .onDelete('CASCADE')

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('playlist_music')
}

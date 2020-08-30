exports.up = function (knex) {
  knex.schema
    .createTable("playlist_songs", (table) => {
      table.increments("id").primary();

      table.string("song_id");
      table.string("title");
      table.string("img");

      table.integer("playlist_id").notNullable();
      table
        .foreign("playlist_id")
        .references("id")
        .inTable("playlist")
        .onDelete("CASCADE");

      table.timestamps(true, true);
    })
    .then();
};

exports.down = function (knex) {
  return knex.schema.dropTable("playlist_songs");
};

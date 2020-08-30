exports.up = function (knex) {
  knex.schema
    .createTable("favorites", (table) => {
      table.increments("id").primary();

      table.string("favorite_music_id");
      table.string("title");
      table.string("img");

      table.integer("user_id").notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");

      table.timestamps(true, true);
    })
    .then();
};

exports.down = function (knex) {
  return knex.schema.dropTable("favorites");
};

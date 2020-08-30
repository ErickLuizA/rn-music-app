exports.up = function (knex) {
  knex.schema
    .createTable("playlist", (table) => {
      table.increments("id").primary();

      table.string("title").notNullable().unique();

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
  return knex.schema.dropTable("playlist");
};

exports.up = function (knex) {
  knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();

      table.string("name").notNullable();
      table.string("avatar");
      table.string("email").notNullable().unique();
      table.string("password").notNullable();

      table.string("refreshToken");

      table.timestamps(true, true);
    })
    .then();
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};

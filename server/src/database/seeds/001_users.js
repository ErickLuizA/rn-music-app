const bcrypt = require("bcrypt");

const hash = bcrypt.hashSync(process.env.SEED_PASSWORD, 10);

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          id: 1,
          name: "Erick",
          avatar:
            "https://avatars1.githubusercontent.com/u/60409749?s=460&u=8e75580a6a89150c530a77d987f13227e06be2e4&v=4",
          email: "erick@email.com",
          password: hash,
        },
      ]);
    });
};

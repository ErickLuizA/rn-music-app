exports.seed = function (knex) {
  return knex("playlist")
    .del()
    .then(function () {
      return knex("playlist").insert([
        { id: 1, title: "Best songs", user_id: 1 },
      ]);
    });
};

exports.seed = function (knex) {
  return knex("favorites")
    .del()
    .then(function () {
      return knex("favorites").insert([
        { id: 1, favorite_music_id: "TJ4INx5lfe4", user_id: 1 },
      ]);
    });
};

// this seed does not work, I change the db migrations :)

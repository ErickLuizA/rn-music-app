exports.seed = function (knex) {
  return knex("playlist_songs")
    .del()
    .then(function () {
      return knex("playlist_songs").insert([
        { id: 1, song_id: "TJ4INx5lfe4", playlist_id: 1 },
      ]);
    });
};

// this seed does not work, I change the db migrations :)

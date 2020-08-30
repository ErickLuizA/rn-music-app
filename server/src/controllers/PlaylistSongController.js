const db = require("../database/connection");

module.exports = {
  get_songs: async (req, res, next) => {
    const { id } = req.params;

    try {
      const response = await db("playlist_songs")
        .join("playlist", "playlist.id", "playlist_songs.playlist_id")
        .select("playlist_songs.*")
        .where("playlist_songs.song_id", id);

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  get_song: async (req, res, next) => {
    const { id } = req.params;

    try {
      const response = await db("playlist_songs")
        .join("playlist", "playlist.id", "playlist_songs.playlist_id")
        .select("playlist_songs.*")
        .where("playlist_songs.playlist_id", id);

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  add_song: async (req, res, next) => {
    const { song_id, playlist_id, title, img } = req.body;

    console.log(req.body);

    try {
      await db("playlist_songs").insert({
        song_id,
        playlist_id,
        title,
        img,
      });

      return res.status(201).send();
    } catch (err) {
      next(err);
    }
  },

  remove_song: async (req, res, next) => {
    const { destroyId } = req.query;

    try {
      await db("playlist_songs").del().where({
        song_id: destroyId,
      });

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

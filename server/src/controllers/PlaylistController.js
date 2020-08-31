const db = require("../database/connection");

module.exports = {
  get_playlists: async (req, res, next) => {
    const id = req.userId;

    try {
      const response = await db("playlist")
        .join("users", "playlist.user_id", "users.id")
        .select("playlist.*")
        .where("playlist.user_id", id);

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  add_playlist: async (req, res, next) => {
    const id = req.userId;
    const { title } = req.body;

    try {
      await db("playlist").insert({
        title,
        user_id: id,
      });

      return res.status(201).send();
    } catch (err) {
      next(err);
    }
  },

  update_playlist: async (req, res, next) => {
    const id = req.userId;
    const { title } = req.body;

    try {
      await db("playlist").update({ title }).where({ user_id: id });

      return res.status(200).send();
    } catch (err) {
      next(err);
    }
  },

  remove_playlist: async (req, res, next) => {
    const id = req.userId;
    const { destroyId } = req.query;

    try {
      await db("playlist").del().where({
        user_id: id,
        id: destroyId,
      });

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

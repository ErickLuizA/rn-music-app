const db = require("../database/connection");

module.exports = {
  get_favorites: async (req, res, next) => {
    const id = req.userId;

    try {
      const response = await db("favorites")
        .join("users", "users.id", "favorites.user_id")
        .select("favorites.*")
        .where("favorites.user_id", id);

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  add_favorite: async (req, res, next) => {
    const id = req.userId;
    const { favorite_music_id, title, img } = req.body;

    try {
      await db("favorites").insert({
        favorite_music_id,
        title,
        img,
        user_id: id,
      });

      return res.status(201).send();
    } catch (err) {
      next(err);
    }
  },

  remove_favorite: async (req, res, next) => {
    const id = req.userId;
    const { destroyId } = req.query;

    try {
      await db("favorites").del().where({
        user_id: id,
        favorite_music_id: destroyId,
      });

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

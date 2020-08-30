const db = require("../database/connection");

module.exports = {
  get_user: async (req, res, next) => {
    const id = req.userId;

    try {
      const [response] = await db
        .select("name", "email", "avatar", "created_at", "updated_at")
        .from("users")
        .where({ id });

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};

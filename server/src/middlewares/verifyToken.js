const jwt = require("jsonwebtoken");
const db = require("../database/connection");

module.exports = async function (req, res, next) {
  const { authorization } = req.headers;

  const { refreshToken } = req.cookies;

  if (!authorization && !refreshToken) {
    return res.status(401);
  }

  if (authorization && refreshToken) {
    const token = authorization.replace("Bearer", "").trim();

    try {
      const [user] = await db("users").where({ refreshToken });

      jwt.verify(token, process.env.LOGIN_TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
          if (err instanceof jwt.TokenExpiredError) {
            try {
              jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
              const newToken = jwt.sign(
                user.id,
                process.env.LOGIN_TOKEN_SECRET
              );

              return res.json(newToken);
            } catch (err) {
              return next(err);
            }
          } else {
            return next(err);
          }
        } else {
          req.userId = user.id;
          return next();
        }
      });
    } catch (err) {
      next(err);
    }
  }
};

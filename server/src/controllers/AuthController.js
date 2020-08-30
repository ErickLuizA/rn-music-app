const db = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isEmail } = require("validator");

module.exports = {
  register: async (req, res, next) => {
    const { name, avatar, email } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);

    if (!isEmail(email)) {
      const error = new Error("Email not valid");
      error.status = 401;
      next(error);
    }

    const userExists = await db("users").where({ email });

    if (userExists.length > 0) {
      return res.status(409).send();
    }

    try {
      const user = await db("users").insert({
        name,
        avatar,
        email,
        password,
      });

      const token = jwt.sign({ id: user.id }, process.env.LOGIN_TOKEN_SECRET, {
        expiresIn: "15m",
      });

      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );

      await db("users").update({ refreshToken }).where({ email });

      res.setHeader("Set-Cookie", [`refreshToken=${refreshToken}; httpOnly;`]);

      return res.status(201).json(token);
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const [user] = await db("users").where({ email });

      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { id: user.id },
          process.env.LOGIN_TOKEN_SECRET,
          {
            expiresIn: "15m",
          }
        );

        const refreshToken = jwt.sign(
          { id: user.id },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        );

        await db("users").update({ refreshToken }).where({ email: user.email });

        res.setHeader("Set-Cookie", [
          `refreshToken=${refreshToken}; httpOnly;`,
        ]);

        return res.status(200).json(token);
      }
    } catch (error) {
      error.status = 401;
      error.message = "Email or password incorrect";
      next(error);
    }
  },

  logout: async (req, res, next) => {
    const { refreshToken } = req.cookies;

    try {
      await db("users").update({ refreshToken: null }).where({ refreshToken });

      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
};

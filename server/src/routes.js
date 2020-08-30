const { Router } = require("express");
const routes = Router();

const YtController = require("./controllers/YtController");
const AuthController = require("./controllers/AuthController");
const FavoriteController = require("./controllers/FavoriteController");
const PlaylistController = require("./controllers/PlaylistController");
const PlaylistSongController = require("./controllers/PlaylistSongController");
const UserController = require("./controllers/UserController");

const verifyToken = require("./middlewares/verifyToken");

routes.get("/song", verifyToken, YtController.get_audio);

routes.post("/login", AuthController.login);
routes.post("/register", AuthController.register);
routes.post("/logout", AuthController.logout);

routes.get("/favorites", verifyToken, FavoriteController.get_favorites);
routes.post("/favorite", verifyToken, FavoriteController.add_favorite);
routes.delete("/favorite", verifyToken, FavoriteController.remove_favorite);

routes.get("/playlists", verifyToken, PlaylistController.get_playlists);
routes.post("/playlist", verifyToken, PlaylistController.add_playlist);
routes.patch("/playlist", verifyToken, PlaylistController.update_playlist);
routes.delete("/playlist", verifyToken, PlaylistController.remove_playlist);

routes.get(
  "/playlist_songs/:id",
  verifyToken,
  PlaylistSongController.get_songs
);
routes.get("/playlist_song/:id", verifyToken, PlaylistSongController.get_song);
routes.post("/playlist_song", verifyToken, PlaylistSongController.add_song);
routes.delete(
  "/playlist_song",
  verifyToken,
  PlaylistSongController.remove_song
);

routes.get("/user", verifyToken, UserController.get_user);

module.exports = routes;

const ytdl = require("ytdl-core");

module.exports = {
  get_audio: async (req, res, next) => {
    const { id } = req.query;

    try {
      const info = await ytdl.getInfo(id);

      const audioFormat = ytdl.filterFormats(info.formats, "audioonly");

      return res.status(200).json(audioFormat[0]);
    } catch (error) {
      next(error);
    }
  },
};

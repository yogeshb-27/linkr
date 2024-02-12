const urlModel = require("../models/urlModel");

const createShortUrl = async (req, res) => {
  try {
    const { fullUrl } = req.body;
    const existingURL = await urlModel.findOne({ fullUrl });
    if (existingURL) {
      return res.status(200).json({ shortUrl: existingURL.shortUrl });
    }
    const newURL = await urlModel.create({ fullUrl });
    res.status(201).json({ shortUrl: newURL.shortUrl });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createShortUrl };

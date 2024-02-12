const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const shortUrlSchema = new mongoose.Schema({
  fullUrl: { type: String, required: true },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid().substring(0, 10),
  },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now, required: true },
});
const urlModel = mongoose.model("url", shortUrlSchema);
module.exports = urlModel;

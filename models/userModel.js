const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  urls: [{ type: mongoose.Schema.Types.ObjectId, ref: "url" }],
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;

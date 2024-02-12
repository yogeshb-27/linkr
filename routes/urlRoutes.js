const express = require("express");
const {
  createShortUrl,
  getUrl,
  getAllUrl,
  deleteUrl,
} = require("../controllers/urlController");

const router = express.Router();
router
  .get("/", getAllUrl)
  .get("/:url", getUrl)
  .post("/", createShortUrl)
  .delete("/:url", deleteUrl);

module.exports = router;

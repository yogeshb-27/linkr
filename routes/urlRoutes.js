const express = require("express");
const {
  createShortUrl,
  getUrl,
  getAllUrl,
  deleteUrl,
  createCustomUrl,
} = require("../controllers/urlController");

const router = express.Router();
router
  .get("/", getAllUrl)
  .get("/:url", getUrl)
  .post("/", createShortUrl)
  .post("/custom", createCustomUrl)
  .delete("/:url", deleteUrl);

module.exports = router;

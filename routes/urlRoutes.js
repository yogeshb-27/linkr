const express = require("express");
const {
  createShortUrl,
  getUrl,
  getAllUrl,
} = require("../controllers/urlController");

const router = express.Router();
router.get("/", getAllUrl).get("/:url", getUrl).post("/", createShortUrl);

module.exports = router;

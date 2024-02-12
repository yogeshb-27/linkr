const express = require("express");
const { createShortUrl, getUrl } = require("../controllers/urlController");

const router = express.Router();
router.get("/:url", getUrl).post("/", createShortUrl);

module.exports = router;

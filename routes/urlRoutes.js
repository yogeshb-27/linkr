const express = require("express");
const { createShortUrl } = require("../controllers/urlController");

const router = express.Router();
router.post("/", createShortUrl);

module.exports = router;

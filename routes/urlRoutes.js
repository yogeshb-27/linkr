const express = require("express");
const authUser = require("../middlewares/authUser");
const {
  createShortUrl,
  getUrl,
  getAllUrl,
  deleteUrl,
  createCustomUrl,
  generateQrCode,
} = require("../controllers/urlController");

const router = express.Router();
router
  .get("/:url", getUrl)
  .get("/", authUser, getAllUrl)
  .post("/", authUser, createShortUrl)
  .post("/custom", authUser, createCustomUrl)
  .post("/qrcode", authUser, generateQrCode)
  .delete("/:url", authUser, deleteUrl);

module.exports = router;

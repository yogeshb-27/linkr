const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.render("index");
  })
  .get("/custom", (req, res) => {
    res.render("custom");
  })
  .get("/qrcode", (req, res) => {
    res.render("qrcode");
  });

module.exports = router;

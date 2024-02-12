const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.render("index");
  })
  .get("/custom", (req, res) => {
    res.render("custom");
  });

module.exports = router;

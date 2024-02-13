const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
router
  .get("/", (req, res) => {
    res.render("index");
  })
  .get("/custom", authUser, (req, res) => res.render("custom"))
  .get("/qrcode", authUser, (req, res) => res.render("qrcode"))
  .get("/register", (req, res) => res.render("register"));

module.exports = router;

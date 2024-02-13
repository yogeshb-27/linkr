const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
router
  .get("/", (req, res) => {
    const authenticated = req.cookies.token ? true : false;
    res.render("index", { authenticated });
  })
  .get("/custom", authUser, (req, res) => res.render("custom"))
  .get("/qrcode", authUser, (req, res) => res.render("qrcode"))
  .get("/register", (req, res) => res.render("register"))
  .get("/login", (req, res) => res.render("login"));

module.exports = router;

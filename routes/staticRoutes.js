const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
const { getUrl } = require("../controllers/urlController");
router
  .get("/", (req, res) => {
    const authenticated = req.cookies.token ? true : false;
    res.render("index", { authenticated });
  })
  .get("/custom", authUser, (req, res) => res.render("custom"))
  .get("/qrcode", authUser, (req, res) => res.render("qrcode"))
  .get("/dashboard", authUser, (req, res) => {
    res.render("dashboard", { user: req.user });
  })
  .get("/register", (req, res) => res.render("register"))
  .get("/login", (req, res) => res.render("login"))
  .get("/404", (req, res) => {
    const authenticated = req.cookies.token ? true : false;
    res.render("404", { authenticated });
  })
  .get("/:url", getUrl);

module.exports = router;

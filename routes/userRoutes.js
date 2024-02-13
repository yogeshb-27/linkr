const express = require("express");
const { registerUser } = require("../controllers/userController");
const router = express.Router();

router
  .post("/register", registerUser)
  .post("/login")
  .post("/logout")
  .get("/dashboard");

module.exports = router;

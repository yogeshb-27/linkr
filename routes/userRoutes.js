const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/logout")
  .get("/dashboard");

module.exports = router;

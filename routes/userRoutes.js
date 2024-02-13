const express = require("express");
const authUser = require("../middlewares/authUser");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");
const router = express.Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/logout", logoutUser)
  .get("/dashboard", authUser);

module.exports = router;

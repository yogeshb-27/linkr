const userModel = require("../models/userModel");
const jwtService = require("../config/jwtconfig");
const validator = require("validator");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "all details are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "invalid email format" });
    }
    if (!validator.isLength(password, { min: 8 })) {
      return res
        .status(400)
        .json({ error: "password length must be at least 8" });
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.status(400).json({ error: "password is not strong enough" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    // console.log(newUser);
    const token = jwtService.generateToken(newUser);
    res.cookie("token", token);
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({ error: "all details are  required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "invalid email format" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Account Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    res.status(200).json({ message: "Log in successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { registerUser, loginUser, logoutUser };

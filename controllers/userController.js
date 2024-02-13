const userModel = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(500).json({ error: "all details required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).json({ error: "email is already registered" });
    }
    const newUser = await userModel.create({ username, email, password });
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerUser };

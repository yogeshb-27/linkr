const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "1d" });
  return token;
};

module.exports = { generateToken };

const jwt = require("jsonwebtoken");
const authenticateUser = (req, res, next) => {
  // Extract the token from the cookie
  const token = req.cookies.token;
  if (!token) {
    // No token found, user is not authenticated
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticateUser;

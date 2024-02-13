require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");
const publicPath = path.join(__dirname, "public");
const connectDB = require("./config/dbconfig");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));

const urlRoutes = require("./routes/urlRoutes");
const staticRoutes = require("./routes/staticRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/api", urlRoutes);
app.use("/user", userRoutes);
app.use("/", staticRoutes);
app.listen(port, () => {
  console.log(`server up at port: ${port} !`);
  connectDB;
});

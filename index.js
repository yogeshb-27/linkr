require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const connectDB = require("./config/dbconfig");

const urlRoutes = require("./routes/urlRoutes");

app.use(express.json());
app.use("/api", urlRoutes);
app.listen(port, () => {
  console.log(`server up at port: ${port} !`);
  connectDB;
});

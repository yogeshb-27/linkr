require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3001;
const connectDB = require("./config/dbconfig");

const app = express();

app.get("/", (req, res) => res.end("HOME"));

app.listen(port, () => {
  console.log(`server up at port: ${port} !`);
  connectDB;
});

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.DBURL}`);
    console.log("DB connected !", connect.connection.name);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB();

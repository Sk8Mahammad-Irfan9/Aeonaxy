const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo db connected");
  } catch (err) {
    console.log("DB disconnected", err);
  }
};

module.exports = connectDB;

const mongoose = require("mongoose");
//access to golbal var
const config = require("config");
//
const db = config.get("mongoURI");
//add these to avoid getting warnings
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

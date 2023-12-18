const mongoose = require("mongoose");

const connectToMongoDB = () => {
  mongoose.connect("mongodb://localhost:27017/survey_db");
  const connection = mongoose.connection;

  connection.on("error", (error) => {
    console.log("Error connecting to MongoDB", error);
  });

  connection.once("open", () => {
    console.log("Connected to MongoDB");
  });
};

module.exports = { connectToMongoDB };

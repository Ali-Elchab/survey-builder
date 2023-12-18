const express = require("express");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const app = express();
app.use(express.json());
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const surveyRoutes = require("./routes/survey.routes");
const { authMiddleware } = require("./middlewares/auth.middleware");
app.use("/surveys", authMiddleware, surveyRoutes);

app.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);
  connectToMongoDB();
});

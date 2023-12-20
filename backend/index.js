const express = require("express");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(express.json());
require("dotenv").config();
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Include if using cookies, sessions, or authentication
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const surveyRoutes = require("./routes/survey.routes");
const { authMiddleware } = require("./middlewares/auth.middleware");
app.use("/surveys", authMiddleware, surveyRoutes);

const answerRoutes = require("./routes/answer.routes");
app.use("/answers", authMiddleware, answerRoutes);

app.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);
  connectToMongoDB();
});

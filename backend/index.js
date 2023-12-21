const express = require("express");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(express.json());
require("dotenv").config();
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors());

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

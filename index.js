const express = require("express");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const app = express();
const multer = require("multer"); // Import multer
app.use(express.json());
require("dotenv").config();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});
const upload = multer({ storage: storage });

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

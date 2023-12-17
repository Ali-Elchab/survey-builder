const express = require("express");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const app = express();
jsonParser = express.json();

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

app.listen(8000, () => {
  console.log("Server started on port 3000");
  connectToMongoDB();
});

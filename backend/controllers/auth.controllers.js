const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send({ message: "Invalid username/password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).send({ message: "Invalid username/password" });
    }

    const { password: hashedPassword, ...userDetails } = user.toJSON();

    const token = jwt.sign({ ...userDetails }, process.env.JWT_SECRET, { expiresIn: "2 days" });

    res.status(200).send({
      user: userDetails,
      token,
    });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  const { username, password, name, type } = req.body;
  const image = req.file;
  try {
    if (!username || !password || !name) {
      throw new Error("All fields are required");
    }

    const alreadyExists = await User.findOne({ username });
    if (alreadyExists) {
      return res.status(401).send({
        message: "Username not available",
      });
    }

    const imagePath = image ? image.path : "";
    const user = new User({ username, password, name, type, image: imagePath });
    await user.save();

    const { password: hashedPassword, ...userDetails } = user.toJSON();
    const token = jwt.sign({ ...userDetails }, process.env.JWT_SECRET, { expiresIn: "2 days" });

    return res.status(200).send({
      user: userDetails,
      token,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(400).send({ error: err.message || "Failed to create user" });
  }
};

module.exports = {
  login,
  register,
};

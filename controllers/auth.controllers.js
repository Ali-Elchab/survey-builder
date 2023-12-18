const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) res.status(400).send({ message: "Invalid username/password" });

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) res.status(400).send({ message: "Invalid username/password" });

  const { password: hashedPassword, _id, ...userDetails } = user.toJSON();

  const token = jwt.sign({ ...userDetails }, process.env.JWT_SECRET, { expiresIn: "2 days" });

  res.status(200).send({
    user: userDetails,
    token,
  });
};

const register = async (req, res) => {
  const { username, password, name, type } = req.body;

  try {
    if (!username || !password || !name) {
      throw new Error("All fields are required");
    }

    const alreadyExists = await User.findOne({ username });
    if (alreadyExists) throw new Error("Username already exists");

    const user = new User({ username, password, name, type });
    await user.save();
    res.status(200).send({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).send({ error: err.message || "Failed to create user" });
  }
};

const uploadImage = (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      throw new Error("File or buffer is undefined");
    }

    const imgBuffer = Buffer.from(req.file.buffer);
    const imageData = new Image({ img: { data: imgBuffer, contentType: req.file.mimetype } });

    imageData.save((err, result) => {
      if (err) return res.status(500).send(err);

      res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  login,
  register,
  uploadImage,
};

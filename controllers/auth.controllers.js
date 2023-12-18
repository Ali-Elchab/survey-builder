const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

module.exports = {
  login,
  register,
};

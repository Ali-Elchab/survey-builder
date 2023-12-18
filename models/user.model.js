const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "You can't add a user without a username",
    unique: true,
    minlenght: 3,
    maxlength: 20,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlenght: 6,
  },

  name: {
    type: String,
    required: true,
    minlenght: 3,
  },
  type: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

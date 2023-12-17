const mongoose = require("mongoose");

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
  email: {
    type: String,
    required: "You can't add a user without an email",
    unique: true,
    minlenght: 3,
    maxlength: 20,
  },
  firstName: {
    type: String,
    required: true,
    minlenght: 3,
  },
  lastName: {
    type: String,
    required: true,
    minlenght: 3,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

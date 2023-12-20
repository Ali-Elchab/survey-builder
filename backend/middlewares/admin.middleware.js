const User = require("../models/user.model");

const adminMiddleware = async (req, res, next) => {
  if (req.user.type !== "admin") {
    return res.status(403).send("Forbidden");
  }
  next();
};

module.exports = {
  adminMiddleware,
};

const User = require("../models/user.model");

const adminMiddleware = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Forbidden");
  }
};

module.exports = {
  adminMiddleware,
};

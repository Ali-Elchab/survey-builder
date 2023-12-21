const express = require("express");
const { login, register, uploadImage } = require("../controllers/auth.controllers");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

const upload = multer({ storage: storage });

router.post("/login", login);
router.post("/register", upload.single("image"), register);
module.exports = router;

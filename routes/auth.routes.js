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

console.log("Auth routes loaded");
router.post("/login", login);
router.post("/register", register);
router.post("/upload-image", upload.single("image"), uploadImage);
module.exports = router;

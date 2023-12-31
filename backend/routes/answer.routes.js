const express = require("express");
const { resetUserAnswers, addAnswer } = require("../controllers/answer.controllers");

const router = express.Router();

router.post("/", addAnswer);
router.get("/", resetUserAnswers);

module.exports = router;

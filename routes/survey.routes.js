const express = require("express");
const { getAllSurveys, addSurvey } = require("../controllers/survey.controllers");
const router = express.Router();

router.get("/all", getAllSurveys);
router.post("/", addSurvey);

module.exports = router;

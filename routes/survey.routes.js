const express = require("express");
const {
  deleteSurveyById,
  addSurvey,
  updateSurveyById,
  getAllSurveys,
  getSurveyById,
} = require("../controllers/survey.controllers");
const router = express.Router();

const { adminMiddleware } = require("../middlewares/admin.middleware");
router.post("/", adminMiddleware, addSurvey);
router.delete("/:id", deleteSurveyById);
router.put("/:id", updateSurveyById);
router.get("/", getAllSurveys);
router.get("/:id", getSurveyById);

module.exports = router;

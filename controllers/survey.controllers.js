const Survey = require("../models/survey.model");

const addSurvey = async (req, res) => {
  try {
    const { title, questions } = req.body;

    if (!title || !Array.isArray(questions)) {
      return res.status(400).json({ error: "Invalid data format" });
    }
    const alreadyExists = Survey.findOne({ title });
    if (alreadyExists) {
      return res.status(400).json({ error: "Survey with this title already exists" });
    }
    const newSurvey = new Survey({ title });

    questions.forEach((question) => {
      newSurvey.questions.push({
        questionText: question.questionText,
        type: question.type,
        options: question.options,
      });
    });

    const savedSurvey = await newSurvey.save();

    res.status(201).json({ message: "Survey created successfully", survey: savedSurvey });
  } catch (err) {
    res.status(400).send({ error: err.message || "Failed to create survey" });
  }
};

const deleteSurveyById = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedSurvey = await Survey.findByIdAndDelete(id);
    if (!deletedSurvey) {
      return res.status(404).send({ error: "Survey not found" });
    }
    res.status(200).send({
      message: "Survey deleted successfully",
      deletedSurvey,
    });
  } catch (err) {
    res.status(400).send({ error: err.message || "Failed to delete survey" });
  }
};

const updateSurveyById = async (req, res) => {
  try {
    const surveyId = req.params.id;
    const { title, questions } = req.body;

    if (!surveyId || !title || !Array.isArray(questions)) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const existingSurvey = await Survey.findById(surveyId);

    if (!existingSurvey) {
      return res.status(404).json({ error: "Survey not found" });
    }

    existingSurvey.title = title;
    existingSurvey.questions = questions;

    const updatedSurvey = await existingSurvey.save();

    res.status(200).json({ message: "Survey updated successfully", updatedSurvey });
  } catch (error) {
    console.error("Error updating survey:", error);
    res.status(500).json({ error: "Failed to update survey" });
  }
};

const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).send({ surveys });
  } catch (err) {
    res.status(400).send({ error: err.message || "Failed to get all surveys" });
  }
};

const getSurveyById = async (req, res) => {
  try {
    const id = req.params.id;
    const survey = await Survey.findById(id);
    if (!survey) {
      res.status(404).send("Survey not found");
    }
    res.status(200).json({ survey });
  } catch (err) {
    res.status(400).send({ error: err.message || "Failed to get survey" });
  }
};

module.exports = {
  deleteSurveyById,
  addSurvey,
  updateSurveyById,
  getAllSurveys,
  getSurveyById,
};

const Survey = require("../models/survey.model");

const addSurvey = async (req, res) => {
  const { title, questions } = req.body;

  const newSurvey = new Survey({
    title: title,
  });

  questions.forEach((question) => {
    newSurvey.questions.push({
      questionText: question.questionText,
      type: question.type,
      options: question.options,
    });
  });
  newSurvey
    .save()
    .then((savedSurvey) => {
      console.log("Survey created:", savedSurvey);
    })
    .catch((err) => {
      console.error("Error creating survey:", err);
    });

  res.status(200).send(newSurvey);
};

const getAllSurveys = async (req, res) => {
  res.status(200).send({
    user: "aasdddd",
  });
};

module.exports = {
  getAllSurveys,
  addSurvey,
};

const Answer = require("../models/answer.model");
const Survey = require("../models/survey.model");
const addAnswer = async (req, res) => {
  try {
    const { userId, surveyId, responses } = req.body;
    const existingAnswer = await Answer.findOne({ user: userId, survey: surveyId });

    if (existingAnswer) {
      return res.status(400).json({ error: "Answer already exists for this survey and user" });
    }

    const newAnswer = new Answer({
      user: userId,
      survey: surveyId,
      responses: responses,
    });
    await newAnswer.save();

    const survey = await Survey.findById(surveyId);

    await Answer.findOneAndUpdate({ user: userId, survey: surveyId }, { completed: true }, { new: true });

    res.status(201).json({ message: "User responses added for the survey", newAnswer });
  } catch (error) {
    res.status(500).json({ error: "Failed to add user responses", details: error.message });
  }
};

const resetUserAnswers = async (req, res) => {
  try {
    const { userId, surveyId } = req.body;

    await Answer.findOneAndDelete({ user: userId, survey: surveyId });

    res.status(200).json({ message: "User answers reset for the survey" });
  } catch (error) {
    res.status(500).json({ error: "Failed to reset user answers", details: error.message });
  }
};

module.exports = {
  addAnswer,
  resetUserAnswers,
};

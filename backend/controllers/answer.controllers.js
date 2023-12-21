const Answer = require("../models/answer.model");
const Survey = require("../models/survey.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const addAnswer = async (req, res) => {
  console.log(req.body);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;
    const { id, responses } = req.body;
    const existingAnswer = await Answer.findOne({ user: userId, survey: id });

    if (existingAnswer) {
      return res.status(400).json({ error: "Answer already exists for this survey and user" });
    }
    console.log(req.body);
    const newAnswer = new Answer({
      user: userId,
      survey: id,
      responses: responses,
    });
    await newAnswer.save();

    const survey = await Survey.findById(id);

    await Answer.findOneAndUpdate({ user: userId, survey: id }, { completed: true }, { new: true });

    res.status(201).json({ message: "User responses added for the survey", newAnswer });
  } catch (error) {
    res.status(500).json({ error: "Failed to add user responses", details: error.message });
  }
};

const resetUserAnswers = async (req, res) => {
  try {
    console.log("IN RESET USER ANSWERS");
    const { surveyId } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;
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

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["radio", "checkbox", "text", "dropdown", "scale", "email"],
    required: true,
  },
  options: {
    type: mongoose.Schema.Types.Mixed,
    default: undefined,
  },
});

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 20,
  },
  questions: [questionSchema],
});

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;

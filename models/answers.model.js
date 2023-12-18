const mongoose = require("mongoose");

const answersSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
    required: true,
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Survey.questions",
        required: true,
      },
      answer: {
        type: mongoose.Schema.Types.Mixed,
      },
    },
  ],
  completed: {
    type: Boolean,
    default: false,
  },
});

const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;

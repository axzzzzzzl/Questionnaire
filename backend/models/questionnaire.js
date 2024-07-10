const mongoose = require('mongoose')

const questionnaireSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    questions: {
        type: Array,
        required: true,
    }
  }
)

const questionnaire = mongoose.model('questionnaire', questionnaireSchema)
module.exports = questionnaire
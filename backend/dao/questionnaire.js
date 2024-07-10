const questionnaireModel = require('../models/questionnaire')

const createQuestionnaire = async (qusetionnaireInfo) => {
    return await questionnaireModel.create({ ...qusetionnaireInfo })
}

const findQuestionnaireById = async (id) => {
  return await questionnaireModel.findOne({ id })
}

const updateQuestionnaire = async ({ id, title, description, questions }) => {
  return await questionnaireModel.findOneAndUpdate(
    { id },
    {
      title,
      description,
      questions
    }
  )
}

const findAllQuestionnaires = async () => {
  return await questionnaireModel.find()
}

module.exports = {
  createQuestionnaire,
  findQuestionnaireById,
  updateQuestionnaire,
  findAllQuestionnaires
}

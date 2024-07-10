const questionnaireDao = require('../dao/questionnaire')

const createQuestionnaire = async (questionnaire) => {
    return await questionnaireDao.createQuestionnaire(questionnaire)
}

const findQuestionnaireById = async (id) => {
    return await questionnaireDao.findQuestionnaireById(id)
}

const updateQuestionnaire = async (questionnaire) => {
    console.log("questionnaire: ", questionnaire)
    const { id, title, description, questions } = questionnaire
    return await questionnaireDao.updateQuestionnaire({ id, title, description, questions })
}

const findAllQuestionnaires = async () => {
    return await questionnaireDao.findAllQuestionnaires()
}

module.exports = {
    createQuestionnaire,
    findQuestionnaireById,
    updateQuestionnaire,
    findAllQuestionnaires
}
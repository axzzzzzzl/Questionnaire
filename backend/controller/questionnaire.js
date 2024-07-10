const questionnaireService = require('../services/questionnaire')

const createQuestionnaire = async (req, res) => {
    const { ...questionnaire } = req.body;
    const result = await questionnaireService.createQuestionnaire(questionnaire)
    return {
        result
    }
}
const findQuestionnaireById = async (req, res) => {
    const { id } = req.query;
    const result = await questionnaireService.findQuestionnaireById(id)
    return {
        result
    }
}

const updateQuestionnaire = async (req, res) => {
    console.log(req.body)
    const { questionnaire } = req.body;
    const result = await questionnaireService.updateQuestionnaire(questionnaire)
    return {
        result
    }
}

const findAllQuestionnaires = async (req, res) => {
    const result = await questionnaireService.findAllQuestionnaires()
    return {
        result
    }
}

module.exports = {
    createQuestionnaire,
    findQuestionnaireById,
    updateQuestionnaire,
    findAllQuestionnaires
}
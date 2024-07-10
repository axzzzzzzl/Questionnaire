const express = require('express')
const questionnaireController = require('../controller/questionnaire')
const wrapper = require('../utils/wrapper')

const router = express.Router()

router.post('/questionnaire/create', wrapper(questionnaireController.createQuestionnaire))
router.get('/questionnaire/find', wrapper(questionnaireController.findQuestionnaireById))
router.post('/questionnaire/update', wrapper(questionnaireController.updateQuestionnaire))
router.get('/questionnaire/list', wrapper(questionnaireController.findAllQuestionnaires))

module.exports = router
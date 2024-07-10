const express = require('express')
const loginController = require('../controller/login')
const wrapper = require('../utils/wrapper')

const router = express.Router()

router.post('/login', wrapper(loginController.login))

router.post('/updateAccessToken', wrapper(loginController.updateAccessToken))

module.exports = router
const express = require('express')
const userController = require('../controller/user')
const wrapper = require('../utils/wrapper')

const router = express.Router()

router.get('/user', wrapper(userController.getUserInfo));

module.exports = router
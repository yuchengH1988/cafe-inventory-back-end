const express = require('express')
const router = express.Router()
const userController = require('../controllers/apis/userController.js')
router.post('/signin', userController.signIn)

module.exports = router
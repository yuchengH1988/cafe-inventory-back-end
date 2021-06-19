const express = require('express')
const router = express.Router()
const userController = require('../controllers/apis/userController.js')
const { authenticated } = require('../middleware/auth')
//登入功能
router.post('/signin', userController.signIn)
//獲取使用者相關資訊
router.get('/users/:id', userController.getUser)

module.exports = router
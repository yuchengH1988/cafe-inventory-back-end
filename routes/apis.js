const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'temp/' })
const uploadProfile = upload.fields([{ name: 'avatar', maxCount: 1 }])

const userController = require('../controllers/apis/userController.js')
const { authenticated } = require('../middleware/auth')
//登入功能
router.post('/signin', userController.signIn)
router.put('/users', authenticated, uploadProfile, userController.updateUser)

module.exports = router
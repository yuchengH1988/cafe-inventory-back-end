const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'temp/' })
const uploadProfile = upload.fields([{ name: 'avatar', maxCount: 1 }])

const userController = require('../controllers/apis/userController.js')
const recordController = require('../controllers/apis/recordController')
const { authenticated } = require('../middleware/auth')
//登入功能
router.post('/signin', userController.signIn)
router.put('/users', authenticated, uploadProfile, userController.updateUser)
router.post('/calculator', authenticated, recordController.recordCalculator)
router.post('/records', authenticated, recordController.createRecord)
router.put('/records/:dateId', authenticated, recordController.updateRecord)

module.exports = router
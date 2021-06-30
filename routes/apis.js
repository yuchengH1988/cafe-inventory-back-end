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

router.get('/users/current', authenticated, userController.getCurrentUser)
router.get('/users/:id', authenticated, userController.getUser)
router.put('/users', authenticated, uploadProfile, userController.updateUser)

router.get('/products', authenticated, recordController.getProducts)
router.get('/ingredients', authenticated, recordController.getIngredients)

router.post('/calculator', authenticated, upload.array(), recordController.recordCalculator)
router.post('/records', authenticated, recordController.createRecord)
router.put('/records/:dateId', authenticated, recordController.updateRecord)
router.delete('/records/:dateId', authenticated, recordController.deleteRecord)
router.get('/records/:dateId', authenticated, recordController.getRecordsByDate)
router.get('/records', authenticated, recordController.getRecords)

module.exports = router
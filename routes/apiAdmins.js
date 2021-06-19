const express = require('express')
const router = express.Router()
const User = require('../models/user')

const adminController = require('../controllers/apis/adminController')

const { authenticated, authenticatedAdmin } = require('../middleware/auth')

router.post('/users', authenticated, authenticatedAdmin, adminController.createUser)
router.put('/users/:id', authenticated, authenticatedAdmin, adminController.toggelAdmin)

module.exports = router
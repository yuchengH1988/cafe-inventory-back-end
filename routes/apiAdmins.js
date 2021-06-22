const express = require('express')
const router = express.Router()

const adminController = require('../controllers/apis/adminController')

const { authenticated, authenticatedAdmin } = require('../middleware/auth')

router.get('/users/', authenticated, authenticatedAdmin, adminController.getUsers)
router.post('/users', authenticated, authenticatedAdmin, adminController.createUser)
router.put('/users/:id', authenticated, authenticatedAdmin, adminController.toggelAdmin)
router.delete('/users/:id', authenticated, authenticatedAdmin, adminController.deleteUser)

router.get('/products/:id', authenticated, authenticatedAdmin, adminController.getProduct)

router.post('/products/', authenticated, authenticatedAdmin, adminController.createProduct)

module.exports = router
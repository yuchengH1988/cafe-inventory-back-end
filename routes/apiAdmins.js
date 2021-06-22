const express = require('express')
const router = express.Router()

const adminController = require('../controllers/apis/adminController')

const { authenticated, authenticatedAdmin } = require('../middleware/auth')

router.get('/users', authenticated, authenticatedAdmin, adminController.getUsers)
router.post('/users', authenticated, authenticatedAdmin, adminController.createUser)
router.put('/users/:id', authenticated, authenticatedAdmin, adminController.toggelAdmin)
router.delete('/users/:id', authenticated, authenticatedAdmin, adminController.deleteUser)

router.get('/products/', authenticated, authenticatedAdmin, adminController.getProducts)
router.get('/products/:id', authenticated, authenticatedAdmin, adminController.getProduct)
router.put('/products/:id', authenticated, authenticatedAdmin, adminController.updateProduct)
router.post('/products/', authenticated, authenticatedAdmin, adminController.createProduct)
router.delete('/products/:id', authenticated, authenticatedAdmin, adminController.deleteProduct)

router.get('/ingredients/', authenticated, authenticatedAdmin, adminController.getIngredients)
router.get('/ingredients/:id', authenticated, authenticatedAdmin, adminController.getIngredient)




module.exports = router
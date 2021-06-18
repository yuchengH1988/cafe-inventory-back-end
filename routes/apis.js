const express = require('express')
const router = express.Router()
const userController = require('../controllers/apis/userController.js')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')

router.post('/signin', userController.signIn)

router.get('/test', authenticated, async (req, res, next) => {
  try {
    return res.status(200).json({
      status: 'success',
      message: 'yes did it',
    })
  } catch (error) {
    console.log(error)
    next(error)
  }

})

module.exports = router
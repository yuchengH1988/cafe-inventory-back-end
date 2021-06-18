const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
//載入假數據
let users = require('./users')
const ingredients = require('./ingredients')
//載入model
const Ingredient = require('../ingredient')
const User = require('../user')
db.once('open', async () => {
  try {
    users = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
    }))
    await User.insertMany(users)
    console.log('users created !!')
    await Ingredient.insertMany(ingredients)
    console.log('ingredients created !!')
    db.close()
  } catch (error) {
    console.log(error)
    db.close()
  }
})
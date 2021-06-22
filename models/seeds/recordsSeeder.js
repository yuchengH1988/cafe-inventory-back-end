const moment = require('moment')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

//載入model
const Ingredient = require('../ingredient')
const Record = require('../record')
const User = require('../user')
db.once('open', async () => {
  try {

    const users = await User.find()
    const ingredients = await Ingredient.find()
    let businessDay = new Date("2021/04/01")

    for (i = 0; i < 65; i++) {
      let dateId = moment(businessDay).add(i, 'days').format('YYYYMMDD')
      await Record.create({
        dateId,
        authorId: users[1]._id,
        actualUsed: Math.floor(Math.random() * 100 + 1000),
        estimateUsed: Math.floor(Math.random() * 150 + 1000),
        ingredientId: ingredients[0]._id

      })
      await Record.create({
        dateId,
        authorId: users[1]._id,
        actualUsed: Math.floor(Math.random() * 400 + 4000),
        estimateUsed: Math.floor(Math.random() * 600 + 4000),
        ingredientId: ingredients[1]._id

      })
    }

    db.close()

  } catch (error) {
    console.log(error)
    db.close()
  }
})
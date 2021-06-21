const Product = require('../../models/product')
const Ingredient = require('../../models/ingredient')
const Composition = require('../../models/composition')
const Record = require('../../models/record')
const moment = require('moment')

const dummyData = {
  黑咖啡: 20,
  拿鐵: 25,
  卡布奇諾: 15,
}

const recordController = {
  recordCalculator: async (req, res, next) => {
    try {
      // const data = req.body
      const ingredients = await Ingredient.find({})
      const products = await Product.find({})
      const compositions = await Composition.find().populate('productId').populate('ingredientId')
      //將body的值分開，辨識key值取用value值
      let keys = Object.keys(dummyData)
      let values = Object.values(dummyData)
      let results = []
      ingredients.forEach(ingredient => {
        results.push({
          name: ingredient.name,
          unit: ingredient.unit,
          unitName: ingredient.unitName,
          unit2: ingredient.unit2,
          unit2Name: ingredient.unit2Name,
          estimateValue: 0
        })
      })

      for (i = 0; i < keys.length; i++) {
        let compostion = compositions.filter(compostion => compostion.productId.name === keys[i])
        compostion.forEach(item => {
          results.map(result => {
            if (result.name === item.ingredientId.name) {
              result.estimateValue += values[i] * item.quantity
              return result
            }
            return result
          })
        })
      }

      return res.status(200).json({ status: 'success', results })
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  createRecord: async (req, res, next) => {
    try {
      const { actualUsed, estimateUsed, ingredientName, businessDay } = req.body
      const authorId = req.user._id
      const dateId = moment(businessDay).format('YYYYMMDD')

      const record = await Record.findOne({ dateId, ingredientName })
      if (record) {
        return res.status(401).json({ status: 'error', message: 'this record is existed!' })
      }
      let result = await Record.create({
        dateId, authorId, actualUsed, estimateUsed, ingredientName
      })

      return res.status(200).json({ status: 'success', message: ' New record has been built.' })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }



}
module.exports = recordController
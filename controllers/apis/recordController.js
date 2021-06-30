const Product = require('../../models/product')
const Ingredient = require('../../models/ingredient')
const Composition = require('../../models/composition')
const Record = require('../../models/record')
const moment = require('moment')

const recordController = {
  recordCalculator: async (req, res, next) => {
    try {
      const data = req.body
      const ingredients = await Ingredient.find({})
      const compositions = await Composition.find().populate('productId').populate('ingredientId')
      //將body的值分開，辨識key值取用value值
      let keys = Object.keys(data)
      let values = Object.values(data)
      let results = []
      ingredients.forEach(ingredient => {
        results.push({
          _id: ingredient._id,
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
      const { actualUsed, estimateUsed, ingredientId, dateId } = req.body
      const authorId = req.user._id

      const record = await Record.findOne({ dateId, ingredientId })
      if (record) {
        return res.status(401).json({ status: 'error', message: 'this record is existed!' })
      }
      let result = await Record.create({
        dateId, authorId, actualUsed, estimateUsed, ingredientId
      })

      return res.status(200).json({ status: 'success', message: ' New record has been built.' })
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  updateRecord: async (req, res, next) => {
    try {
      const { dateId } = req.params
      const { ingredientId, actualUsed, estimateUsed, newDate } = req.body
      const authorId = req.user._id
      const newDateId = newDate ? moment(newDate).format('YYYYMMDD') : dateId
      let record = await Record.findOneAndUpdate({ dateId, ingredientId, authorId }, { dateId: newDateId, actualUsed, estimateUsed }, { useFindAndModify: false, new: true }
      )
      return res.status(200).json({ status: 'success', message: ' Record has been updated.' })
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  deleteRecord: async (req, res, next) => {
    try {
      const { dateId } = req.params
      const authorId = req.user._id
      await Record.deleteMany({ dateId, authorId }, (err) => {
        if (err) {
          return res.status(404).json({ status: 'error', message: "Can't delete this record." })
        } else {
          return res.status(200).json({ status: 'success', message: 'The record has removed successfully!' })
        }
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  getRecordsByDate: async (req, res, next) => {
    try {
      const { dateId } = req.params
      const authorId = req.user._id
      const records = await Record.find({ dateId, authorId }).lean()
      return res.status(200).json({ status: 'success', records })
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  getRecords: async (req, res, next) => {
    try {
      const filter = { authorId: req.user._id }
      const { year, month, ingredientId } = req.query
      //月份判斷
      let timeSet = '^'
      if (ingredientId) {
        filter.ingredientId = ingredientId
      }
      if (year && month) {
        timeSet += year + month
      } else {
        timeSet += moment().format('YYYYMM')
      }
      filter.dateId = { $regex: timeSet }
      const records = await Record.find(filter).sort({ dateId: 1 })

      return res.status(200).json({ status: 'success', records })
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  getProducts: async (req, res, next) => {
    try {
      await Product.find({}, (err, products) => {
        if (err) {
          return res.status(400).json({ status: 'error', message: 'Can\'t find this product' })
        } else {
          return res.status(200).json({ status: 'success', products })
        }
      })
    } catch (error) {
      console.log(error)
      return next(error)
    }
  },
  getIngredients: async (req, res, next) => {
    try {
      await Ingredient.find({}, (err, ingredients) => {
        if (err) {
          return res.status(400).json({ status: 'error', message: 'Can\'t find ingredients' })
        } else {
          return res.status(200).json({ status: 'success', ingredients })
        }
      })
    } catch (error) {
      console.log(error)
      return next(error)
    }
  },

}
module.exports = recordController
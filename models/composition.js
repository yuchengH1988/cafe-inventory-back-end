const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  ingredientId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Ingredient'
  },
  quantity: {
    type: Number,
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  }
})
module.exports = mongoose.model('Composition', userSchema)
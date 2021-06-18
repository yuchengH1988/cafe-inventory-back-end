const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  ingredientId: {
    type: Schema.Types.ObjectId,
    ref: 'Ingredient'
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
})
module.exports = mongoose.model('Composition', userSchema)
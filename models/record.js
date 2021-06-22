const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  ingredientId: {
    type: Schema.Types.ObjectId,
    ref: 'Ingredient'
  },
  dateId: {
    type: String,
    require: true
  }
  ,
  actualUsed: {
    type: Number,
    required: true,
    default: 0
  },
  estimateUsed: {
    type: Number,
    required: true,
    default: 0
  }
})
module.exports = mongoose.model('Record', userSchema)
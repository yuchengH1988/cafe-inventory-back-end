const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  date: {
    type: time,
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  ingredientId: {
    type: String,
    required: true
  },
  estimate: {
    type: Number,
    required: true,
    default: 0
  },
  actual: {
    type: Number,
    required: true,
    default: 0
  },
  error: {
    type: Number,
    required: true,
    default: 0
  }
})
module.exports = mongoose.model('Record', userSchema)
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
  businessDay: {
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
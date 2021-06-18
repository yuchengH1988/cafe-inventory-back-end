const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    default: 0
  }
})
module.exports = mongoose.model('Product', userSchema)
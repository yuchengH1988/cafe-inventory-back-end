const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  unit: {
    type: Number,
    require: true
  },
  unitName: {
    type: String,
    require: true
  },
  unit2:
    { type: Number }
  ,
  unit2Name: {
    type: String,
  },
})
module.exports = mongoose.model('Ingredient', userSchema)
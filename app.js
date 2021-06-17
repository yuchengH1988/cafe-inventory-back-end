const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
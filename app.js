const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ message: String(err) })
    return next()
  }
})

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

require('./routes')(app)

module.exports = app
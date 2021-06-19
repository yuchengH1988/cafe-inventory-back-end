const apis = require('./apis')
const apiAdmins = require('./apiAdmins')

module.exports = (app) => {
  app.use('/api', apis)
  app.use('/api/admin', apiAdmins)
}
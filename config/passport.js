const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

// JWT
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.JWT_SECRET

const strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  User.findById(jwt_payload._id)
    .then(user => {
      if (!user) return next(null, false)
      return next(null, user)
    }).catch(error => {
      return next(error, false)
    })
})

passport.use(strategy)

module.exports = passport
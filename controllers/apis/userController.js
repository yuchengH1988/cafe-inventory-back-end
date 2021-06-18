const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
  signIn: async (req, res, next) => {
    try {
      const { account, password } = req.body
      // 確認 account & password必填
      if (!account || !password) {
        return res.status(400).json({ status: 'error', message: 'account and password are required!' })
      }
      // 確認 account 是否已存在資料庫
      const user = await User.findOne({ account })
      if (!user) {
        return res.status(401).json({ status: 'error', message: 'this account has not been registered!' })
      }
      // 確認 password 是否正確
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ status: 'error', message: 'password incorrect!' })
      }
      // 回傳使用者資訊和 token
      const payload = { _id: user._id }
      const token = jwt.sign(payload, process.env.JWT_SECRET)

      return res.status(200).json({
        status: 'success',
        message: 'ok',
        token: token,
        user
      })
    } catch (error) {
      console.log(error)
      return next(error)
    }
  }
}

module.exports = userController
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

const adminController = {
  createUser: async (req, res, next) => {
    try {
      const { account, name, email, password, checkPassword, isAdmin } = req.body
      // 確認 account & name & email & password & checkPassword 必填
      if (!account || !name || !email || !password || !checkPassword) {
        return res.status(400).json({ status: 'error', message: 'account, name, email, password, checkPassword are required!' })
      }
      // 確認 password & checkPassword 相同
      if (password !== checkPassword) {
        return res.status(400).json({ status: 'error', message: 'password & checkPassword must be same!' })
      }
      // 確認 email 格式正確
      const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
      if (!emailRule.test(email)) {
        return res.status(400).json({ status: 'error', message: 'email format is incorrect!' })
      }
      //判斷帳號、名稱是否存在
      const user = await User.find({ $or: [{ account }, { name }] })
      if (user.length) { return res.status(409).json({ status: 'error', message: 'this account or name has been used!' }) }
      //新增User
      await User.create({
        account, name, email, isAdmin,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
      })

      return res.status(200).json({ status: 'success', message: 'register success!' })
    } catch (error) {
      console.log(error)
      return next(error)
    }
  },
  toggelAdmin: async (req, res, next) => {
    try {
      const _id = req.params.id
      let user = await User.findById(_id)
      user.isAdmin = user.isAdmin ? false : true
      await user.save()
      return res.status(200).json({ status: 'success', message: `user ${user.name} ${user.account} have changed to ${user.isAdmin ? 'Admin' : 'User'}` })

    } catch (error) {
      console.log(error)
      return next(error)
    }
  }
}
module.exports = adminController
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const uploadImg = path => {
  return new Promise((resolve, reject) => {
    imgur.upload(path, (err, img) => {
      if (err) {
        return reject(err)
      }
      return resolve(img)
    })
  })
}

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
  },
  updateUser: async (req, res, next) => {
    try {
      let user = req.user
      const { file } = req
      console.log('file', file)
      const { name, email, password, checkPassword } = req.body
      if (!name || !email || !password || !checkPassword) {
        return res.status(400).json({ status: 'error', message: 'name, email, password, checkPassword are required!' })
      }
      // 確認 password & checkPassword 相同
      if (password !== checkPassword) {
        return res.status(400).json({ status: 'error', message: 'password & checkPassword must be same!' })
      }
      //判斷名稱是否存在
      const repeatUser = await User.find({ name })
      if (repeatUser.length) { return res.status(409).json({ status: 'error', message: 'this name has been used!' }) }

      //圖片處理
      imgur.setClientID(IMGUR_CLIENT_ID)
      const imgAvatar = files.avatar ? await uploadImg(files.avatar[0].path) : null
      const avatar = imgAvatar ? imgAvatar.data.link : user.avatar

      user = await User.findByIdAndUpdate(user._id, { name, email, password, avatar }, { useFindAndModify: false, new: true })

      return res.status(200).json({ status: 'success', message: `user ${user.name} ${user.account} have been updated`, user })


    } catch (error) {
      console.log(error)
      return next(error)
    }
  }
  ,
  // getUser: async (req, res, next) => {
  //   try {
  //     const _id = req.params.id
  //     const user = await User.findById(_id)
  //     return res.status(200).json(user)
  //   } catch (error) {
  //     console.log(error)
  //     return next(error)
  //   }
  // }
}

module.exports = userController
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    //用户名字
    username: {
      type: String,
      required: true,
    },
    //用户密码
    password: {
      type: String,
      required: true,
    },
  }
)

const user = mongoose.model('user', userSchema)
module.exports = user

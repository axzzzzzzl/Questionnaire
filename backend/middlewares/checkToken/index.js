const { verifyJwt } = require('../../utils/jwt')

const checkToken = (req, res, next) => {
    const token = req?.headers?.authorization
    if (!token) {
      next()
      return
    }
    try {
      const { username: user } = verifyJwt(token)
      req.body = { ...req.body, user }
      req.query = { ...req.query, user }
      next()
    } catch (error) {
      res.send({ msg: 'token已经过期，请重新登录！', code: 401 })
    }
  }
  
  module.exports = checkToken
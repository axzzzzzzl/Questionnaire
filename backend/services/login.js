const { createJwt, createAccessToken } = require('../utils/jwt')
const userDao = require('../dao/user')
const { verifyJwt } = require('../utils/jwt')

const login = async ({ username, password }) => {
    const result = await userDao.findUser({ username, password })
    if (!result){
        throw new Error('请检查账号、密码是否出错。')
    }
    const [refresh_token, access_token] = createJwt({ username })
    return {
        refresh_token, 
        access_token,
    }
}
const updateAccessToken = async ({ refresh_token }) => {
    
    const { username } = verifyJwt(refresh_token)
    const new_access_token = createAccessToken({ username })
    return { access_token: new_access_token }
}
module.exports = {
    login,
    updateAccessToken
}
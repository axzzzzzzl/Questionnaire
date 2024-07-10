const jwt = require('jsonwebtoken')

const jwt_secret = 'mySecretKey'
const jwt_access_expiration = 60 * 10
const jwt_refresh_expiration = jwt_access_expiration * 6 * 3

const createJwt = ({ username }) => {
    const refresh_token = createRefreshToken({ username })
    const access_token = createAccessToken({ username })
  
    return [refresh_token, access_token]
}

const createAccessToken = (params) => {
    return jwt.sign(params, jwt_secret, {
      expiresIn: jwt_access_expiration,
    })
}

const createRefreshToken = (params) => {
    return jwt.sign(params, jwt_secret, {
      expiresIn: jwt_refresh_expiration,
    })
}

const verifyJwt = (token) => {
    if (!token) return undefined
    const result = jwt.verify(token, jwt_secret)
    return result
}

module.exports = {
    createJwt,
    createAccessToken,
    verifyJwt,
}
  
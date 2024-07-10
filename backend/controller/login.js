const loginService = require('../services/login')
const { verifyJwt } = require('../utils/jwt')

const login = async (req, res) => {
    const { username, password } = req.body;
    const { access_token, refresh_token } = await loginService.login({ username, password })
    return {
        user: username,
        refresh_token, 
        access_token,
    }
}
const updateAccessToken = async (req, res) => {
    const { refresh_token } = req.body
    const { access_token } = await loginService.updateAccessToken({ refresh_token })
    return { access_token }
}

module.exports = {
    login,
    updateAccessToken
}
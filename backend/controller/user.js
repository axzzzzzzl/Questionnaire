const getUserInfo = async (req, res) => {
    const { user } = req.query;
    return {
        username: user,
    }
}
module.exports = {
    getUserInfo
}
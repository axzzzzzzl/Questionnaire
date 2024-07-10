const httpHeader = (_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, Cache-Control, Content-Security-Policy, Access-Control-Allow-Origin')
    res.header('Access-Control-Allow-Methods', 'POST, GET, TRACE, OPTIONS, PATCH, PUT, DELETE')
    next()
  }
  
  module.exports = httpHeader
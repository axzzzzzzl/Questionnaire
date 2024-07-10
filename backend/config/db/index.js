const { connectMongoDB } = require('./mongodb')

const connectDB = () => {
  // mongodb连接
  connectMongoDB()
}

module.exports = connectDB
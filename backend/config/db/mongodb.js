const _ = require('mongoose')

const connectMongoDB = (mongoose = _) => {
  mongoose.connect("mongodb://127.0.0.1:27017/questionnaire_backend", {
    
  })

  mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected')
  })

  mongoose.connection.on('error', () => {
    console.log('Error')
  })
}

module.exports = { connectMongoDB }
const mongoose = require('mongoose')

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to db')
  } catch(err) {
    console.error(err)
  }
}

module.exports = {
  connectDb
}

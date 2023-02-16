require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDb } = require('./db/config')
const usersRoute = require('./routes/users')

const app = express()
const PORT = process.env.PORT || 3000

// CORS implementation
app.use(cors())

// DB connection
connectDb()

// Routes
app.use('/api/users', usersRoute)
// app.get('/', (req,res) => {
//   res.json({
//     msg: 'Testing route'
//   })
// })

// Port setup and app startup
app.listen(PORT, () => {
  console.log('Server listening')
})

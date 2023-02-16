require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDb } = require('./db/config')
const usersRoute = require('./routes/users')

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
// CORS implementation
app.use(cors())
app.use(express.json())

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

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDb } = require('./db/config')
const usersRoute = require('./routes/users')
const authRoute = require('./routes/auth')

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
app.use('/api/login', authRoute)

// Port setup and app startup
app.listen(PORT, () => {
  console.log('Server listening')
})

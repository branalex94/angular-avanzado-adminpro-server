require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { connectDb } = require('./db/config')
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
const hospitalsRoute = require('./routes/hospitals')
const medicsRoute = require('./routes/medics')
const searchRoute = require('./routes/search')
const uploadRoute = require('./routes/upload')

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
// CORS implementation
app.use(cors())
// Public directory

app.use(express.static('public'))

// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));

app.use(express.json())
app.use(fileUpload())


// DB connection
connectDb()

// Routes
app.use('/api/login', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hospitals', hospitalsRoute)
app.use('/api/medics', medicsRoute)
app.use('/api/all', searchRoute)
app.use('/api/upload', uploadRoute)

// Port setup and app startup
app.listen(PORT, () => {
  console.log('Server listening')
})

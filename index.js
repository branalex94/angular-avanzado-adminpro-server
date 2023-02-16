require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDb } = require('./db/config')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

connectDb()

app.get('/', (req,res) => {
  res.json({
    msg: 'Testing route'
  })
})

app.listen(PORT, () => {
  console.log('Server listening')
})

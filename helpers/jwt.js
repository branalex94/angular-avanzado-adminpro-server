const jwt = require('jsonwebtoken')

const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id
    }
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '24h'

      },
      (err, token) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          resolve(token)
        }
      })
  })
}

module.exports = {
  generateJWT
}

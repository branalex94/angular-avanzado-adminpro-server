const jwt = require('jsonwebtoken')

const validateJWT = (req, res, next) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la peticion'
    })
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    req.id = id
    next()
  } catch (err) {
    // console.error(err)
    return res.status(401).json({
      msg: 'Token invalido'
    })
  }
}

module.exports = {
  validateJWT
}

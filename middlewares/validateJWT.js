const jwt = require('jsonwebtoken')
const User = require('../models/User')

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

const validateAdmin = async (req, res, next) => {
  try {
    const id = req.id
    const dbUser = await User.findById(id)

    if (!dbUser) {
      return res.status(404).json({
        msg: 'No existe este usuario'
      })
    }

    if (dbUser.role !== 'ADMIN_ROLE') {
      return res.status(403).json({
        msg: 'No tiene permisos'
      })
    }

    next()
  } catch (err) {
    console.error(err)
    res.status(500).json({
      msg: 'Hubo un error en el servidor',
      err
    })
  }
}

const validateAdminOrSameUser = async (req, res, next) => {
  try {
    const id = req.id
    const mId = req.params.id
    const dbUser = await User.findById(id)

    if (!dbUser) {
      return res.status(404).json({
        msg: 'No existe este usuario'
      })
    }

    if (dbUser.role === 'ADMIN_ROLE' || id === mId) {
      next()
    } else {
      return res.status(403).json({
        msg: 'No tiene permisos'
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({
      msg: 'Hubo un error en el servidor',
      err
    })
  }
}

module.exports = {
  validateJWT,
  validateAdmin,
  validateAdminOrSameUser
}

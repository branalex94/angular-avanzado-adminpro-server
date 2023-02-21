const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generateJWT } = require('../helpers/jwt')

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    // Verificar email
    const userExists = await User.findOne({ email })

    if (!userExists) {
      return res.status(404).json({
        msg: 'Email invalido'
      })
    }

    // Verificar contraseña

    const validPassword = bcrypt.compareSync(password, userExists.password)

    if (!validPassword) {
      return res.status(404).json({
        msg: 'Password invalido'
      })
    }

    // Generar el JWT
    const token = await generateJWT(userExists._id)

    res.status(200).json({
      msg: 'todo bien',
      token
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      msg: 'Hubo un error en el servidor!'
    })
  }
}

const  googleLogin = async (req, res) => {
  const { token } = req.body
  res.json({
    msg: 'Google login!',
    token
  })
}

module.exports = {
  login,
  googleLogin
}

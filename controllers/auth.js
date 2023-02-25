const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generateJWT } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/googleVerify')

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
  try {
    const { email, name, picture } = await googleVerify(token)

    const dbUser = await User.findOne({ email })
    let user

    if (!dbUser) {
      user = new User({
        email,
        nombre: name,
        img: picture,
        password: '@@@',
        google: true
      })
    } else {
      user = dbUser
      user.google = true
    }

    // Guardar usuario autenticado con google
    await user.save()

    const jwtToken = await generateJWT(user._id)

    res.json({
      msg: 'Google login!',
      user,
      jwtToken
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      msg: 'Token de google invalido'
    })
  }
}

const renewJWTToken = async (req, res) => {
  const { id } = req

  const token = await generateJWT(id)
  const user = await User.findById(id)
  
  res.json({
    msg: 'Renovar token!',
    token,
    user
  })
}

module.exports = {
  login,
  googleLogin,
  renewJWTToken
}

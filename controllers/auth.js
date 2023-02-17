const bcrypt = require('bcryptjs')
const User = require('../models/User')

const login = async (req, res) => {
	const { email, password } = req.body
	try {
		// Verificar email
		const userExists = await User.findOne({ email })

		if(!userExists) {
			return res.status(404).json({
				msg: 'Email invalido'
			})
		}

		// Verificar contraseña

		const validPassword = bcrypt.compareSync(password, userExists.password)

		if(!validPassword) {
			return res.status(404).json({
				msg: 'Password invalido'
			})
		}

		// Generar el JWT

		res.status(200).json({
			msg: 'todo bien'
		})
	} catch(err) {
		console.error(err)
		res.status(500).json({
			msg: 'Hubo un error en el servidor!'
		})
	}
}

module.exports = {
	login
}
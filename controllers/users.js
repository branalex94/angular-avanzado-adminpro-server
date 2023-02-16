const { validationResult } = require('express-validator')
const User = require('../models/User')

// TODO: solo usuarios validados deberian poder ver la lista de usuarios
const getUsers = async(req, res) => {
	const users = await User.find()
	res.json({
		msg: 'Lista de usuarios',
		users
	})
}

const createUser = async(req, res) => {
	const errors = validationResult(req)

	if(!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.mapped()
		})
	}

	try {
		const { nombre, email, password } = req.body
		const emailExists = await User.findOne({ email })

		if(emailExists) {
			return res.status(400).json({
				msg: 'Ya existe el email ingresado!'
			})
		}

		const user = new User(req.body)
		await user.save()

		res.json({
			msg: 'Usuario creado!',
			user
		})
	} catch(err) {
		console.error(err)
		res.status(500).json({
			msg: 'Hubo un error con la creacion de tu usuario'
		})
	}
}

module.exports = {
	getUsers,
	createUser
}
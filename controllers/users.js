const User = require('../models/User')

const getUsers = (req, res) => {
	res.json({
		msg: 'Ruta de usuarios',
		users: []
	})
}

const createUser = async(req, res) => {
	// const { nombre, email, password } = req.body
	const user = new User(req.body)
	await user.save()

	res.json({
		msg: 'Usuario creado!',
		user
	})
}

module.exports = {
	getUsers,
	createUser
}
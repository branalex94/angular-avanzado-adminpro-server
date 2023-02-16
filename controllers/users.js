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
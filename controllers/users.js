const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generateJWT } = require('../helpers/jwt')

// TODO: solo usuarios validados deberian poder ver la lista de usuarios
const getUsers = async (req, res) => {
	const users = await User.find()
	res.json({
		msg: 'Lista de usuarios',
		users
	})
}

const createUser = async (req, res) => {
	try {
		const { email, password } = req.body
		const emailExists = await User.findOne({ email })

		if (emailExists) {
			return res.status(400).json({
				msg: 'Ya existe el email ingresado!'
			})
		}

		const user = new User(req.body)

		const salt = bcrypt.genSaltSync()
		user.password = bcrypt.hashSync(password, salt)

		const token = await generateJWT(user._id)

		await user.save()

		res.json({
			msg: 'Usuario creado!',
			user,
			token
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({
			msg: 'Hubo un error con la creacion de tu usuario'
		})
	}
}


const updateUser = async (req, res) => {
	const { id } = req.params
	try {
		const user = await User.findById(id)

		if (!user) {
			return res.status(404).json({
				msg: `User with id: ${id} not found!`
			})
		}

		const emailExists = await User.findOne({ email: req.body.email })

		if (emailExists) {
			return res.status(400).json({
				msg: `El email ${req.body.email} ya existe!`
			})
		}

		// TODO: Validar token y comprobar si es el usuario correcto
		// ...

		// Actualizar registro
		const fields = req.body
		delete fields.password
		delete fields.google

		const updatedUser = await User.findByIdAndUpdate(id, fields, { new: true })

		res.json({
			msg: 'Updated user!',
			updatedUser
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({
			msg: 'Hubo un error actualizando!'
		})
	}
}

const deleteUser = async (req, res) => {
	const { id } = req.params
	try {
		const user = await User.findById(id)
		if (!user) {
			res.status(404).json({
				msg: `El usuario con el id: ${id} no existe`
			})
		}
		await User.findByIdAndDelete(id)
		res.status(200).json({
			msg: 'El usuario con el id: ${id} ha sido eliminado con exito!'
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({
			msg: 'Hubo un error eliminando!'
		})
	}
}

module.exports = {
	getUsers,
	createUser,
	updateUser,
	deleteUser
}
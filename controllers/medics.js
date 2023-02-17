const Medic = require('../models/Medic')

const getMedics = async(req, res) => {
	res.status(200).json({
		msg: 'Lista de medicos!'
	})
}

const createMedic = async(req, res) => {
	const id = req.id
	const medic = new Medic({
		...req.body,
		usuario: id,
	})

	try {
		const newMedic = await medic.save()
		res.status(200).json({
		msg: 'Crear Medico!',
		newMedic
	})	
	} catch(err) {
		console.error(err)
		res.status(500).json({
			msg: 'Hubo un error en el servidor!'
		})
	}
}

const updateMedic = async(req, res) => {
	res.status(200).json({
		msg: 'Actualizar medico!'
	})
}

const deleteMedic = async(req, res) => {
	res.status(200).json({
		msg: 'Eliminar medico!'
	})
}

module.exports = {
	getMedics,
	createMedic,
	updateMedic,
	deleteMedic
}

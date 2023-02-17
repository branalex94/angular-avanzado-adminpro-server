const getMedics = async(req, res) => {
	res.status(200).json({
		msg: 'Lista de medicos!'
	})
}

const createMedic = async(req, res) => {
	res.status(200).json({
		msg: 'Crear medico!'
	})
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

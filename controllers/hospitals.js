const getHospitals = async(req, res) => {
	res.status(200).json({
		msg: 'Lista de hospitales!'
	})
}

const createHospital = async(req, res) => {
	res.status(200).json({
		msg: 'Crear hospital!'
	})
}

const updateHospital = async(req, res) => {
	res.status(200).json({
		msg: 'Actualizar hospital!'
	})
}

const deleteHospital = async(req, res) => {
	res.status(200).json({
		msg: 'Eliminar hospital!'
	})
}

module.exports = {
	getHospitals,
	createHospital,
	updateHospital,
	deleteHospital
}

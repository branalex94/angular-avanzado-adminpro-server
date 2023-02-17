const Hospital = require('../models/Hospital')

const getHospitals = async(req, res) => {
	res.status(200).json({
		msg: 'Lista de hospitales!'
	})
}

const createHospital = async(req, res) => {

	const id = req.id
	const hospital = new Hospital({
		...req.body,
		usuario: id
	})

	try {
		const newHospital = await hospital.save()
		res.status(200).json({
		msg: 'Crear hospital!',
		newHospital
	})	
	} catch(err) {
		console.error(err)
		res.status(500).json({
			msg: 'Hubo un error en el servidor!'
		})
	}

	
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

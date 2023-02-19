const User = require('../models/User')
const Medic = require('../models/Medic')
const Hospital = require('../models/Hospital')

const MODELS = [User, Medic, Hospital]

const getSearch = async (req, res) => {
	const { search } = req.params
	try {
	  const regEx = new RegExp(search, 'i')

		// const results = await Promise.all(
		// 	MODELS.map(model => model.find({ nombre: regEx }))
		// )
		const [users, medics, hospitals] = await Promise.all(
			User.find({ nombre: regEx }),
			Medic.find({ nombre: regEx }),
			Hospital.find({ nombre: regEx })
		)

	  res.status(200).json({
		  msg: 'Ruta de busqueda',
		  users,
		  medics,
		  hospitals
	  })
	} catch (err) {
		res.status(500).json({
			msg: 'Hubo un error en el servidor!'
		})
	}
}

module.exports = {
	getSearch
}
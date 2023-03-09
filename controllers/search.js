const User = require('../models/User')
const Medic = require('../models/Medic')
const Hospital = require('../models/Hospital')

// const MODELS = [User, Medic, Hospital]

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

const getCollectionSearch = async (req, res) => {
  const { search, table } = req.params
  try {
	  const regEx = new RegExp(search, 'i')
	  let result

    switch (table) {
      case 'users':
        result = await User.find({ nombre: regEx })
        break
      case 'hospitals':
      	result = await Hospital.find({ nombre: regEx })
        break
      case 'medics':
      	result = await Medic.find({ nombre: regEx })
        break
      default:
        return res.status(400).json({
        	msg: 'Coleccion invalida'
        })
       	break
   	}

   	res.status(200).json({
      msg: 'Ruta de busqueda por modelo',
      result
    })
  } catch (err) {
    res.status(500).json({
      msg: 'Hubo un error en el servidor!'
    })
  }
}

module.exports = {
  getSearch,
  getCollectionSearch
}

const Hospital = require('../models/Hospital')

const getHospitals = async (req, res) => {
  const hospitals = await Hospital.find().populate('usuario', 'nombre img')
  res.status(200).json({
    msg: 'Lista de hospitales!',
    hospitals
  })
}

const createHospital = async (req, res) => {
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
  } catch (err) {
    console.error(err)
    res.status(500).json({
      msg: 'Hubo un error en el servidor!'
    })
  }
}

const updateHospital = async (req, res) => {
  try {
    const { id } = req.params
    const { id: userId } = req
    const dbHospital = await Hospital.findById(id)

    if (!dbHospital) {
      return res.status(404).json({
        msg: 'El hospital no existe en nuestra base de datos'
      })
    }

    const hospitalChanges = {
    	...req.body,
    	userId
    }

    const updatedHospital = await Hospital.findByIdAndUpdate(id, hospitalChanges, { new: true })

    res.status(200).json({
      msg: 'Actualizar hospital!',
      updatedHospital
    })
  } catch (err) {
    res.status(500).json({
      msg: 'Hubo un error en el servidor'
    })
  }
}

const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params
    const dbHospital = await Hospital.findById(id)

    if (!dbHospital) {
    	return res.status(404).json({
    		msg: 'El hospital no existe'
    	})
    }

    await Hospital.findByIdAndDelete(id)

    res.json({
    	msg: 'Hospital eliminado!',
    	dbHospital
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: 'Hubo un error en el servidor'
    })
  }
}

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
}

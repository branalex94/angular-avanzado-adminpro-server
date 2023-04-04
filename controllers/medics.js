const Medic = require('../models/Medic')
const Hospital = require('../models/Hospital')

const getMedics = async (req, res) => {
  const medics = await Medic.find()
    .populate('usuario', 'nombre img')
    .populate('hospital', 'nombre')

  res.status(200).json({
    msg: 'Lista de medicos!',
    medics
  })
}

const getMedic = async (req, res) => {
  const { id } = req.params
  try {
    const medic = await Medic.findById(id)
      .populate('usuario', 'nombre img')
      .populate('hospital', 'nombre')

    if (!medic) {
      return res.status(404).json({
        msg: 'Numero de ID incorrecto'
      })
    }

    res.json({
      msg: 'todo bien!',
      medic
    })
  } catch (err) {
    res.status(500).json({
      msg: 'Hubo un error en el servidor'
    })
  }
}

const createMedic = async (req, res) => {
  const id = req.id
  const medic = new Medic({
    ...req.body,
    usuario: id
  })

  try {
    const newMedic = await medic.save()
    res.status(200).json({
      msg: 'Crear Medico!',
      newMedic
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      msg: 'Hubo un error en el servidor!'
    })
  }
}

const updateMedic = async (req, res) => {
  try {
    const { id } = req.params
    const hospitalExists = await Hospital.findById(req.body.hospital)
    const medicDb = await Medic.findById(id)
    if (!medicDb) {
      return res.status(404).json({
        msg: 'El medico no existe'
      })
    }

    if (!hospitalExists) {
      return res.status(400).json({
        msg: 'El hospital proveido no existe'
      })
    }

    const medicChanges = {
      ...req.body,
      usuario: req.id
    }

    const newMedicInfo = await Medic.findByIdAndUpdate(id, medicChanges, { new: true })

    res.json({
      msg: 'Medico actualizado!',
      newMedicInfo
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: 'Hubo un error en el servidor!'
    })
  }
}

const deleteMedic = async (req, res) => {
  try {
    const { id } = req.params
    const medicDb = await Medic.findById(id)
    if (!medicDb) {
      return res.status(404).json({
        msg: 'El medico no existe'
      })
    }
    await Medic.findByIdAndDelete(id)
    res.json({
      msg: 'El medico ha sido eliminado con exito'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: 'Hubo un error en el servidor!'
    })
  }
}

module.exports = {
  getMedic,
  getMedics,
  createMedic,
  updateMedic,
  deleteMedic
}

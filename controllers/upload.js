const path = require('path')
const fs = require('fs')

const { v4: uuidv4 } = require('uuid')
const { updateImg } = require('../helpers/updateImg')

const fileUpload = async (req, res) => {
	const { table, id } = req.params

	const allowedTables = ['users', 'hospitals', 'medics']
	// Validar si la tabla solicitada existe
	if(!allowedTables.includes(table)) {
		return res.status(400).json({
			msg: 'Tabla invalida'
		})
	}

	// Validar si algun archivo fue enviado
	if(!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({
			msg: 'No hay imagenes enviadas'
		})
	}

	const { image } = req.files
	const splitFilename = image.name.split('.')
	const fileExt = splitFilename[splitFilename.length - 1]

	const validFileExtensions = ['png', 'jpg', 'jpeg', 'gif']

	if(!validFileExtensions.includes(fileExt)) {
		return res.status(400).json({
				msg: 'Tipo de archivo no valido'
			})
	}

  // Generar nombre del archivo
  const newFilename = `${uuidv4()}.${fileExt}`

  // Ruta para guardar img
  const path = `./uploads/${table}/${newFilename}`

  image.mv(path, (err) => {
  	if(err) {
  		return res.status(500).json({
  			msg: 'Hubo un error subiendo tu archivo'
  		})
  	}

  	// Actualizar base de datos
  	updateImg(table, id, newFilename)

		res.json({
			msg: 'Ruta de subir archivos!',
			newFilename
		})
  })
}

const getFile = (req, res) => {
  const { table, file } = req.params
  const filePath = path.join(__dirname, `../uploads/${table}/${file}`)
  const defaultImg = path.join(__dirname, '../public/assets/no-img.jpg')

  // Imagen por defecto si no existe una imagen
  if(!fs.existsSync(filePath)) {
  	return res.sendFile(defaultImg)
  }

  res.sendFile(filePath)
}

module.exports = {
	fileUpload,
	getFile
}

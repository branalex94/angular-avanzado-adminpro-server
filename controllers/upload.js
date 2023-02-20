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
	if(!req.files || Object.keys(req.files).length  === 0) {
		return res.status(400).json({
			msg: 'No hay imagenes enviadas'
		})
	}

	res.json({
		msg: 'Ruta de subir archivos!'
	})
}

module.exports = {
	fileUpload
}

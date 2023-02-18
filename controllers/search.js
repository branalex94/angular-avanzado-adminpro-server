const getSearch = async (req, res) => {
	const { search } = req.params
	try {
		if(!search) {
			return res.status(400).json({
				msg: 'Por favor ingrese un valor'
			})
		}


	  res.status(200).json({
		  msg: 'Ruta de busqueda',
		  searchVal: search
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
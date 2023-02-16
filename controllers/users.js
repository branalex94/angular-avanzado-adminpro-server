const getUsers = (req, res) => {
	res.json({
		msg: 'Ruta de usuarios',
		users: []
	})
}

module.exports = {
	getUsers
}
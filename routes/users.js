/**
 * Route: /api/users
 */
const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const { getUsers, createUser } = require('../controllers/users')

router.get('/', getUsers)
router.post('/', [
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('password', 'La contraseña es obligatorio').not().isEmpty(),
		check('email', 'El email es invalido').isEmail()
	], 
	createUser
)

module.exports = router

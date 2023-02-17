/**
 * Route: /api/users
 */
const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validateJWT')

router.get('/', validateJWT, getUsers)
router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña es obligatorio').not().isEmpty(),
  check('email', 'El email es invalido').isEmail(),
  validateFields
], createUser)
router.put('/:id', [
  validateJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es invalido').isEmail(),
  check('role', 'El role es obligatorio').not().isEmpty(),
  validateFields
], updateUser)
router.delete('/:id', validateJWT, deleteUser)

module.exports = router

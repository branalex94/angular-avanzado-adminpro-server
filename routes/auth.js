/**
 * Route: /api/login
 */
const { Router } = require('express')
const router = Router()
const { login } = require('../controllers/auth')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields')

router.post('/', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El email es obligatorio').not().isEmpty(),
  validateFields
],
login
)

module.exports = router

/**
 * Route: /api/login
 */
const { Router } = require('express')
const router = Router()
const { login, googleLogin, renewJWTToken } = require('../controllers/auth')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validateJWT')

router.get('/renew', validateJWT, renewJWTToken)

router.post('/', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El email es obligatorio').not().isEmpty(),
  validateFields
],
login
)

router.post('/google', [
    check('token', 'El token de Google debe ser obligatorio').not().isEmpty(),
    validateFields
  ], 
  googleLogin
)

module.exports = router

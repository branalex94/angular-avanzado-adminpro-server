/**
	* Route: /api/medics
	*/
const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const { validateJWT } = require('../middlewares/validateJWT')
const { validateFields } = require('../middlewares/validateFields')

const {
  getMedics,
  createMedic,
  updateMedic,
  deleteMedic,
  getMedic
} = require('../controllers/medics')

router.get('/', validateJWT, getMedics)
router.post('/', [
  validateJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('hospital', 'El hospital id debe ser valido').isMongoId(),
  validateFields
],
createMedic
)
router.put('/:id', [
  validateJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('hospital', 'El id del hospital es obligatorio').isMongoId(),
  validateFields
],
updateMedic
)
router.delete('/:id', validateJWT, deleteMedic)
router.get('/:id', validateJWT, getMedic)

module.exports = router

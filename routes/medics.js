/**
	* Route: /api/medics
	*/
const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const {
	getMedics,
	createMedic,
	updateMedic,
	deleteMedic
} = require('../controllers/medics')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validateJWT')

router.get('/', getMedics)
router.post('/', [
		validateJWT,
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('hospital', 'El hospital id debe ser valido').isMongoId(),
		validateFields
	], createMedic)
router.put('/:id', updateMedic)
router.delete('/:id',  deleteMedic)

module.exports = router

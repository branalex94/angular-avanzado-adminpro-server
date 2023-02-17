/**
	* Route: /api/hospitals
	*/
const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const {
	getHospitals,
	createHospital,
	updateHospital,
	deleteHospital
} = require('../controllers/hospitals')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validateJWT')

router.get('/', getHospitals)
router.post('/', [
		validateJWT,
		check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
		validateFields
	], createHospital)
router.put('/:id', updateHospital)
router.delete('/:id',  deleteHospital)

module.exports = router

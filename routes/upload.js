/**
 * Route: /api/upload
 */
const { Router } = require('express')
const router = Router()
const { validateJWT } = require('../middlewares/validateJWT')
const { fileUpload } = require('../controllers/upload')

router.put('/:table/:id', validateJWT, fileUpload)

module.exports = router
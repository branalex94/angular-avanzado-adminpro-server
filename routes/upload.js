/**
 * Route: /api/upload
 */
const { Router } = require('express')
const router = Router()
const { validateJWT } = require('../middlewares/validateJWT')
const { fileUpload, getFile } = require('../controllers/upload')

router.put('/:table/:id', validateJWT, fileUpload)
router.get('/:table/:file', getFile)

module.exports = router

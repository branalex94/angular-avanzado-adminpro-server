/**
 * Route: /api/all/
 */

const { Router } = require('express')
const router = Router()
const { validateJWT } = require('../middlewares/validateJWT')
const { getSearch } = require('../controllers/search')

router.get('/:search', validateJWT, getSearch)

module.exports = router
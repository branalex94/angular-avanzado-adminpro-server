/**
 * Route: /api/all/
 */

const { Router } = require('express')
const router = Router()
const { validateJWT } = require('../middlewares/validateJWT')
const { getSearch, getCollectionSearch } = require('../controllers/search')

router.get('/:search', validateJWT, getSearch)
router.get('/collection/:table/:search', validateJWT, getCollectionSearch)

module.exports = router

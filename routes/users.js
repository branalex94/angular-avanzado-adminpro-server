/**
 * Route: /api/users
 */
const { Router } = require('express')
const router = Router()
const { getUsers, createUser } = require('../controllers/users')

router.get('/', getUsers)
router.post('/', createUser)

module.exports = router

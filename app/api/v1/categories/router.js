const router = require('express').Router()
const { create, index, find, update, destroy } = require('./controller')
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

router.get('/categories', authenticateUser, authorizeRoles('organizer'), index)
router.post('/categories', authenticateUser, authorizeRoles('organizer'), create)
router.get('/categories/:id', authenticateUser, authorizeRoles('organizer'), find)
router.put('/categories/:id', authenticateUser, authorizeRoles('organizer'), update)
router.delete('/categories/:id', authenticateUser, authorizeRoles('organizer'), destroy)

module.exports = router
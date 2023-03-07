const router = require('express').Router()
const { create, destroy, find, index, update } = require('./controller')
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

router.get('/payments', authenticateUser, authorizeRoles('organizer'), index)
router.post('/payments', authenticateUser, authorizeRoles('organizer'), create)
router.get('/payments/:id', authenticateUser, authorizeRoles('organizer'), find)
router.put('/payments/:id', authenticateUser, authorizeRoles('organizer'), update)
router.delete('/payments/:id', authenticateUser, authorizeRoles('organizer'), destroy)

module.exports = router
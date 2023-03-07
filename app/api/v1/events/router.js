const router = require('express').Router()
const { create, destroy, find, index, update, changeStatus } = require('./controller')
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

router.get('/events', authenticateUser, authorizeRoles('organizer'), index)
router.post('/events', authenticateUser, authorizeRoles('organizer'), create)
router.get('/events/:id', authenticateUser, authorizeRoles('organizer'), find)
router.put('/events/:id', authenticateUser, authorizeRoles('organizer'), update)
router.put('/events/:id/status', authenticateUser, authorizeRoles('organizer'), changeStatus)
router.delete('/events/:id', authenticateUser, authorizeRoles('organizer'), destroy)

module.exports = router
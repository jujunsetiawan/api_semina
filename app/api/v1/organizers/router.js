const router = require('express').Router()
const { createCMSOrganizer, createCMSUser, index } = require('./controller')
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

router.post('/organizers', authenticateUser, authorizeRoles('owner'), createCMSOrganizer)
router.post('/users', authenticateUser, authorizeRoles('organizer'), createCMSUser)
router.get('/users', authenticateUser, authorizeRoles('owner'), index)

module.exports = router
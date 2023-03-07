const router = require('express').Router()
const { index, create, destroy, find, update } = require('./controler')
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

router.get('/talents', authenticateUser, authorizeRoles('organizer'), index)
router.post('/talents', authenticateUser, authorizeRoles('organizer'), create)
router.get('/talents/:id', authenticateUser, authorizeRoles('organizer'), find)
router.put('/talents/:id', authenticateUser, authorizeRoles('organizer'), update)
router.delete('/talents/:id', authenticateUser, authorizeRoles('organizer'), destroy)

module.exports = router
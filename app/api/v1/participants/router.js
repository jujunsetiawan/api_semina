const router = require('express').Router()
const { authenticateParticipant } = require('../../../middlewares/auth')
const { signup, activeParticipant, signin, getAllLandingPage, getOneLandingPage, getDashboard, checkout, googleAuth } = require('./controller')

router.post('/auth/signup', signup)
router.post('/auth/signin', signin)
router.post('/auth/google', googleAuth)
router.put('/active', activeParticipant)
router.get('/events', getAllLandingPage)
router.get('/events/:id', getOneLandingPage)
router.get('/orders', authenticateParticipant, getDashboard)
router.post('/checkout', authenticateParticipant, checkout)

module.exports = router
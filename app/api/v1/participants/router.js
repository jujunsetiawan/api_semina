const router = require('express').Router()
const { authenticateParticipant, googleAuthenticateParticipan } = require('../../../middlewares/auth')
const { signup, activeParticipant, signin, getAllLandingPage, getOneLandingPage, getDashboard, checkout } = require('./controller')

router.post('/auth/signup', signup)
router.post('/auth/signin', signin)
router.put('/active', activeParticipant)
router.get('/events', getAllLandingPage)
router.get('/events/:id', getOneLandingPage)
router.get('/orders', authenticateParticipant, getDashboard)
router.post('/checkout', authenticateParticipant, checkout)

module.exports = router
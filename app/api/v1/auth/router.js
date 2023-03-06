const router = require('express').Router()
const { signinCms } = require('./controller')

router.post('/auth/signin', signinCms)

module.exports = router
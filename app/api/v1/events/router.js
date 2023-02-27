const router = require('express').Router()
const { create, destroy, find, index, update } = require('./controller')

router.get('/events', index)
router.post('/events', create)
router.get('/events/:id', find)
router.put('/events/:id', update)
router.delete('/events/:id', destroy)

module.exports = router
const router = require('express').Router()
const { index, create, destroy, find, update } = require('./controler')

router.get('/talents', index)
router.post('/talents', create)
router.get('/talents/:id', find)
router.put('/talents/:id', update)
router.delete('/talents/:id', destroy)

module.exports = router
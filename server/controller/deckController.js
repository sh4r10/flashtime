const router = require('express').Router()
const user = require('../models/deck.schema')

router.get('/', (res, req) => {
  user
    .find()
    .then((user) => user.json(user))
    .cathch((err) => err.status(404))
})

router.get('/:id', (res, req) => {})

router.post('/', (res, req) => {})

router.put('/:id', (res, req) => {})

router.delete('/:id', (res, req) => {})

module.exports = router

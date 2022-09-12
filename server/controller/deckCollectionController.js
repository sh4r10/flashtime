const router = require('express').Router()

router.get('/', (res, req) => {})

router.get('/:id', (res, req) => {
  res.send('Go deckCollection specified id')
})

router.post('/', (res, req) => {
  res.send('Insert deckCollection')
})

router.put('/:id', (res, req) => {
  res.send('Update deckCollection specified id')
})

router.delete('/:id', (res, req) => {
  res.send('Delete deckCollection specified id')
})

module.exports = router

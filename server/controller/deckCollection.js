const router = require('express').Router()
const DeckCollection = require('../models/deckCollection.schema')

router.get('/', (req, res) => {})

router.get('/:id', (req, res) => {
  res.send('Go deckCollection specified id')
})

router.post('/', (req, res) => {
  const deckCollectionName = req.body.DeckCollection
})

router.put('/:id', (req, res) => {
  res.send('Update deckCollection specified id')
})

router.delete('/:id', (req, res) => {
  res.send('Delete deckCollection specified id')
})

module.exports = router

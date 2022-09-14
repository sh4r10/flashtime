const router = require('express').Router()
const Deck = require('../models/deck.schema')

router.get('/', (req, res) => {
  Deck.find()
    .then((decks) => {
      if (decks.length === 0) res.json('No desks here')
      if (decks) res.json(decks)
    })
    .catch((err) => {
      console.log(err)
      console.log('No decks here')
      res.sendStatus(404)
    })
})

router.get('/:id', (req, res) => {
  const deckID = req.params.id
  Deck.findById(deckID)
    .then((deck) => res.json(deck))
    .catch((err) => {
      console.log('no deck here')
      console.log(err)
      res.sendStatus(404)
    })
})

router.post('/', (req, res) => {
  const deckName = req.body.deck_name
  const newDeck = new Deck({ deck_name: deckName })
  newDeck
    .save()
    .then(() => {
      console.log('Created new deck')
      res.json('Created new deck')
      //redirect ?
    })
    .catch((err) => {
      console.log(err)
      console.log('big mistake hahah')
      err.status(404)
    })
})

router.put('/:id', (req, res) => {
  const deckID = req.params.id
  const updateDeckName = req.body.deck_name
  Deck.findById(deckID)
    .then((deck) => {
      deck.deck_name = updateDeckName
      return deck.save()
    })
    .then((result) => {
      console.log(result)
      console.log('deck updated')
      res.json('Decks name has been updated')
      //res.redirect('')
    })
    .catch((err) => {
      console.log(err)
      //err.sendStatus(401)
    })
})

router.delete('/:id', (req, res) => {
  const deckID = req.params.id
  Deck.findByIdAndDelete(deckID).then(() =>
    res.josn(`Deck  has been deleted`).catch((err) => res.sendStatus(404))
  )
})

module.exports = router

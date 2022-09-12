const router = require('express').Router()
const user = require('../models/deck.schema')

router.get('/', (res, req) => {
  user
    .find()
    .then((decks) => res.json(decks))
    .catch((err) => {
      console.log(err)
      console.log('No decks here')
      res.sendStatus(404)
    })
})

router.get('/:id', (res, req) => {
  const deckID = req.params.id
  user
    .findById(deckID)
    .then((deck) => res.json(deck))
    .catch((err) => {
      console.log('no deck here')
      console.log(err)
      res.sendStatus(404)
    })
})

router.post('/', (res, req) => {
  const deckName = req.body.deck_name
  const newDeck = new Deck({ deck: deckName })
  newDeck
    .save()
    .then((result) => {
      console.log('Created new deck')
      //redirect ?
    })
    .catch((err) => {
      console.log(err)
      err.status(404)
    })
})

router.put('/:id', (res, req) => {
  const deckID = req.params.id
  const updateDeckName = req.body.deck_name
  user
    .findById(deckID)
    .then((deck) => {
      deck.deck_name = updateDeckName
      return deck.save()
    })
    .then((result) => {
      console.log('deck updated')
      //res.redirect('')
    })
    .catch((err) => {
      console.log('deck updated')
      err.sendStatus(401)
    })
})

router.delete('/:id', (res, req) => {
  const deckID = req.params.id
  user
    .findByIdAndDelete(deckID)
    .then((deck) => res.josn(deck).catch((err) => res.sendStatus(400)))
})

module.exports = router

const router = require('express').Router()
const Deck = require('../models/deck.schema')
const User = require('../models/user.schema')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', verifyToken, (req, res) => {
  res.json(req.user.decks)
})

router.get('/:id', verifyToken, (req, res) => {
  const deckID = req.params.id
  Deck.findById(deckID)
    .then((deck) => res.json(deck))
    .catch((err) => {
      console.log('no deck here')
      console.log(err)
      res.sendStatus(404)
    })
})

router.post('/', verifyToken, (req, res) => {
  const deckName = req.body.deck_name
  const newDeck = new Deck({ deck_name: deckName })
  newDeck
    .save()
    .then((deck) => {
      User.findById(req.user._id, (err, user) => {
        if (err) res.sendStatus(403)
        user.decks.push(deck._id)
        user.save().then(() => {
          console.log('Created new deck')
          res.status(201).json(deck)
        })
      })
    })
    .catch((err) => {
      console.log(err)
      console.log('big mistake hahah')
      err.status(404)
    })
})

router.put('/:id', verifyToken, (req, res) => {
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

router.delete('/:id', verifyToken, (req, res) => {
  const deckID = req.params.id
  Deck.findByIdAndDelete(deckID).then(() =>
    res.josn(`Deck  has been deleted`).catch((err) => res.sendStatus(404))
  )
})

module.exports = router

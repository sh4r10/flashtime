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
    .then((deck) => {
      if (req.user.decks.some((d) => d._id == deckID)) {
        res.json(deck)
      } else {
        res.sendStatus(403)
      }
    })
    .catch((err) => {
      res.json({ message: err })

      res.sendStatus(403)
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
          res.json({ message: 'New deck has been created' })
          res.status(201).json(deck)
        })
      })
    })
    .catch((err) => {
      res.json({ message: err })
    })
})

router.put('/:id', verifyToken, (req, res) => {
  const deckID = req.params.id
  const updateDeckName = req.body.deck_name
  Deck.findById(deckID)
    .then((deck) => {
      if (req.user.decks.some((d) => d._id == deckID)) {
        deck.deck_name = updateDeckName
        return deck.save()
      } else {
        res.sendStatus(403)
      }
    })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json({ message: err })
    })
})

router.delete('/:id', verifyToken, (req, res) => {
  const deckID = req.params.id
  Deck.findById(deckID)
    .then((deck) => {
      if (req.user.decks.some((d) => d._id == deckID)) {
        deck.delete().then(() => {
          res.status(204).json(`Deck  has been deleted`)
        })
      } else {
        res.json('you are not allowd to delete this deck')
      }
    })
    .catch((err) => {
      res.json({ message: err })
    })
})

module.exports = router

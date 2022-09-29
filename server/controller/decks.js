const router = require('express').Router()
const Deck = require('../models/deck.schema')
const User = require('../models/user.schema')
const Card = require('../models/card.schema')

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

router.get('/:id/cards', verifyToken, async (req, res) => {
  try {
    const deckId = req.params.id
    await Deck.findById(deckId)
    if (req.user.decks.some((currentDeck) => currentDeck._id == deckId)) {
      const cards = await Card.find({ deck: deckId })
      res.json(cards)
    }
  } catch (err) {
    res.sendStatus(403)
  }
})

router.get('/:id/cards/due', verifyToken, async (req, res) => {
  try {
    const deckId = req.params.id
    await Deck.findById(deckId)
    if (req.user.decks.some((currentDeck) => currentDeck._id == deckId)) {
      const cards = await Card.find({
        deck: deckId,
        nextRevision: { $lte: Date.now() },
      })
      res.json(cards)
    }
  } catch (err) {
    res.sendStatus(403)
  }
})

router.post('/', verifyToken, (req, res) => {
  const deckName = req.body.name
  const newDeck = new Deck({ name: deckName })
  newDeck
    .save()
    .then((deck) => {
      User.findById(req.user._id, (err, user) => {
        if (err) res.sendStatus(403)
        user.decks.push(deck._id)
        user.save().then(() => {
          res.status(201).json(deck)
        })
      })
    })
    .catch((err) => {
      res.json({ message: err })
    })
})

router.post('/:id/cards', verifyToken, async (req, res) => {
  try {
    const front = req.body.front
    const back = req.body.back
    if (
      req.user.decks.some((currentDeck) => currentDeck._id == req.params.id)
    ) {
      const newCard = new Card({
        user: req.user._id,
        deck: req.params.id,
        front: front,
        back: back,
      })
      await newCard.save()
      res.json(newCard)
    } else {
      res.status(403).json('ID is not valid')
    }
  } catch (err) {
    res.status(500).json({ message: err })
  }
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

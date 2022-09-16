const router = require('express').Router()
const Card = require('../models/card.schema')
const Deck = require('../models/deck.schema')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', verifyToken, (req, res) => {
  Card.find({ user: req.user._id })
    .then((cards) => {
      if (cards.length === 0) res.json('You do not have any card yet')
      res.json(cards)
    })
    .catch((err) => {
      res.sendStatus(404)
    })
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const card = await Card.find({ card: req.params.id, user: req.user._id })
    res.json(card)
  } catch (err) {
    res.status(400).json({ message: 'Wrong ID' })
  }
})

router.get('/:id/cards', verifyToken, async (req, res) => {
  try {
    const deckId = req.params.id
    await Deck.findById(deckId)
    if (req.user.decks.some((currentDeck) => currentDeck._id == deckId)) {
      const cards = await Card.find({ deckID: deckId })
      res.json(cards)
    }
  } catch (err) {
    res.sendStatus(403)
  }
})

router.put('/:id', verifyToken, async (req, res) => {
  if (req.body.hasOwnProperty('deckID'))
    res.status(400).json({ message: 'ID cannot be change' })
  Card.find({ user: req.user._id })
    .then((err, card) => {
      if (!card) res.status(403).json({ message: 'No card found.' })
      Card.findByIdAndUpdate(req.params.id, req.body)
        .then((err, updatedCard) => {
          if (err) res.sendStatus(404)
          res.json(updatedCard)
        })
        .catch((err) => res.sendStatus(500))
      res.json('your card have been updated')
    })
    .catch((err) => res.sendStatus(500))
})

router.delete('/:id', verifyToken, async (req, res) => {
  Card.find({ user: req.user._id })
    .then((err, card) => {
      if (!card) res.status(403).json({ message: 'No card found' })
      const cardId = req.params.id
      Card.findByIdAndDelete(cardId)
        .then(() => res.status(204).json('Deleted successfully.'))
        .catch((err) => res.status(500))
    })
    .catch((err) => res.sendStatus(500))
})

module.exports = router

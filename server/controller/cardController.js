const router = require('express').Router()
const Card = require('../models/card.schema')
const Deck = require('../models/deck.schema')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', verifyToken, (req, res) => {
  Card.find()
    .then((cards) => {
      if (cards.length === 0) res.json('You do not have any card yet')
      res.json(cards)
    })
    .catch((err) => {
      console.log(err)
      console.log('You do not have any cards yet')
      res.sendStatus(404)
    })
})

router.get('/:id', verifyToken, (req, res) => {
  Card.findById(req.params.id)
    .populate('deckID')
    .then((card) => res.json(card))
    .catch((err) => {
      res.sendStatus(404)
    })
})

router.put('/:id', verifyToken, async (req, res) => {
  try {
    if (req.body.hasOwnProperty('deckID'))
      res.status(400).json({ message: 'ID cannot be change' })
    await Card.findByIdAndUpdate(req.params.id, req.body)
    res.json('your card have been updated')
  } catch (err) {
    res.sendStatus(400)
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const cardId = req.params.id
    await Card.findByIdAndDelete(cardId)
    res.json('your card have been deleted')
  } catch (err) {
    res.sendStatus(404)
  }
})

module.exports = router

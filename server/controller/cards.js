const router = require('express').Router()
const Card = require('../models/card.schema')
const Deck = require('../models/deck.schema')
const { supermemo } = require('supermemo')
const dayjs = require('dayjs')
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

router.get('/due', verifyToken, async (req, res) => {
  try {
    const card = await Card.find({
      user: req.user._id,
      nextRevision: { $lte: Date.now() },
    })
    res.json(card)
  } catch (err) {
    res.sendStatus(500)
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const card = await Card.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('deck')
    res.json(card)
  } catch (err) {
    res.status(400).json({ message: 'Wrong ID' })
  }
})

router.put('/:id', verifyToken, async (req, res) => {
  if (req.body.hasOwnProperty('deckID'))
    res.status(400).json({ message: 'ID cannot be change' })
  Card.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedCard, err) => {
      if (err) res.sendStatus(404)
      res.json(updatedCard)
    })
    .catch((err) => res.sendStatus(500))
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
    if (!card) return res.status(403).json({ message: 'Wrong ID' })
    await Card.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    res.sendStatus(500)
  }
})

router.patch('/:id/revise', verifyToken, async (req, res) => {
  try {
    const card = await Card.findOne({ _id: req.params.id, user: req.user._id })
    const { interval, repetition, efactor } = supermemo(card, req.body.grade)
    const nextRevision = dayjs().add(interval, 'day').toISOString()
    const lastRevision = dayjs().toISOString()
    const updated = await Card.findByIdAndUpdate(
      req.params.id,
      {
        interval,
        repetition,
        efactor,
        nextRevision,
        lastRevision,
      },
      { new: true }
    )
    res.json(updated)
  } catch (err) {
    res.sendStatus(500)
  }
})

module.exports = router

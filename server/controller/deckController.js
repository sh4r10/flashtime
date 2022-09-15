const router = require('express').Router()
const Deck = require('../models/deck.schema')
const Card = require('../models/card.schema')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', (res, req) => {})

router.get('/:id', (res, req) => {})

router.post('/', (res, req) => {})

router.put('/:id', (res, req) => {})

router.delete('/:id', (res, req) => {})

router.post('/:id/cards', verifyToken, async (req, res) => {
  try {
    const front = req.body.front
    const back = req.body.back
    if (
      req.user.decks.some((currentDeck) => currentDeck._id == req.params.id)
    ) {
      const newCard = new Card({
        deckID: req.params._id,
        front: front,
        back: back,
      })
      await newCard.save()
      res.json(newCard)
    } else {
      res.json('ID is not valid')
    }
  } catch (err) {
    res.sendStatus(400)
  }
})

module.exports = router

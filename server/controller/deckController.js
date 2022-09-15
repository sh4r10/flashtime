const router = require('express').Router()
const Deck = require('../models/deck.schema')
const Card = require('../models/card.schema')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', verifyToken, (req, res) => {
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
router.get('/:id/cards', verifyToken, async (req, res) => {
  try {
    const deckId = req.params.id
    await Deck.findById(deckId)
    const cards = await Card.find({ deckID: deckId })
    res.json(cards)
  } catch (err) {
    res.sendStatus(404)
  }
})

router.post('/:id/cards', verifyToken, async (req, res) => {
  try {
    const deckId = req.body.deckId
    const currentDeck = await Deck.findById(deckId)
    if (currentDeck) {
      const front = req.body.front
      const back = req.body.back
      const newCard = new Card({
        deckID: currentDeck,
        front: front,
        back: back,
      })
      await newCard.save()
      res.json('new card have been created')
    }
  } catch (err) {
    res.sendStatus(404)
  }
})

module.exports = router
